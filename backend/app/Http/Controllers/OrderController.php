<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Perfume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    private const PURCHASE_OPTION_PRICING = [
        'pack_30ml_x4' => ['type' => 'fixed', 'value' => 149.0, 'size' => '30ml', 'quantity' => 4],
        'single_50ml' => ['type' => 'fixed', 'value' => 79.0, 'size' => '50ml', 'quantity' => 1],
        'pack_50ml_x3' => ['type' => 'fixed', 'value' => 179.0, 'size' => '50ml', 'quantity' => 3],
        'same_30ml_x4' => ['type' => 'fixed', 'value' => 149.0, 'size' => '30ml', 'quantity' => 4],
        'same_50ml_x3' => ['type' => 'fixed', 'value' => 179.0, 'size' => '50ml', 'quantity' => 3],
        'single_30ml' => ['type' => 'fixed', 'value' => 49.0, 'size' => '30ml', 'quantity' => 1],
    ];

    private function getPurchaseOptionMeta(string $purchaseOption): array
    {
        return self::PURCHASE_OPTION_PRICING[$purchaseOption] ?? ['type' => 'fixed', 'value' => 79.0, 'size' => '50ml', 'quantity' => 1];
    }

    public function index(Request $request)
    {
        if ($request->user()?->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $orders = Order::query()
            ->with('perfume:id,name,slug')
            ->latest()
            ->get()
            ->map(fn (Order $order) => $this->serializeOrder($order));

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'perfume_id' => 'required|integer|exists:perfumes,id',
            'customer_name' => 'required|string|max:255',
            'customer_address' => 'required|string|max:500',
            'customer_phone' => ['required', 'string', 'max:30', 'regex:/^(0[0-9]{9}|\+212[0-9]{9})$/'],
            'quantity' => 'required|integer|min:1|max:100',
            'purchase_option' => 'required|string|in:pack_30ml_x4,single_50ml,pack_50ml_x3,same_30ml_x4,same_50ml_x3,single_30ml',
        ]);

        $perfume = Perfume::findOrFail($data['perfume_id']);

        if (!$perfume->is_active) {
            return response()->json([
                'message' => 'This perfume is currently unavailable.',
            ], 422);
        }

        $optionMeta = $this->getPurchaseOptionMeta($data['purchase_option']);
        $size = $optionMeta['size'];
        $optionQuantity = $optionMeta['quantity'];
        $requiredStock = (int) $data['quantity'] * $optionQuantity;

        try {
            $order = DB::transaction(function () use ($perfume, $data, $optionMeta, $size, $optionQuantity, $requiredStock) {
                $lockedPerfume = Perfume::lockForUpdate()->findOrFail($perfume->id);
                $currentStock = (int) ($lockedPerfume->stock[$size] ?? 0);

                if ($currentStock < $requiredStock) {
                    throw new \Exception("Insufficient stock for {$size}. Only {$currentStock} available.", 422);
                }

                $unitPrice = (float) $optionMeta['value'];

                $order = Order::create([
                    'perfume_id' => $lockedPerfume->id,
                    'customer_name' => $data['customer_name'],
                    'customer_address' => $data['customer_address'],
                    'customer_phone' => $data['customer_phone'],
                    'purchase_option' => $data['purchase_option'],
                    'quantity' => $data['quantity'],
                    'total_price' => round($unitPrice * $data['quantity'], 2),
                    'status' => 'pending',
                ]);

                $lockedPerfume->stock = array_merge($lockedPerfume->stock ?? [], [$size => $currentStock - $requiredStock]);
                $lockedPerfume->save();

                return $order;
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 422);
        }

        return response()->json([
            'message' => 'Your order has been placed successfully.',
            'order' => $this->serializeOrder($order->loadMissing('perfume')),
        ], 201);
    }

    public function markAsValidated(Request $request, Order $order)
    {
        if ($request->user()?->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($order->status !== 'validated') {
            $order->status = 'validated';
            $order->save();
        }

        return response()->json([
            'message' => 'Order validated successfully.',
            'order' => $this->serializeOrder($order->loadMissing('perfume')),
        ]);
    }

    private function serializeOrder(Order $order): array
    {
        return [
            'id' => $order->id,
            'perfume' => $order->perfume?->name,
            'perfume_slug' => $order->perfume?->slug,
            'customer_name' => $order->customer_name,
            'customer_address' => $order->customer_address,
            'customer_phone' => $order->customer_phone,
            'purchase_option' => $order->purchase_option,
            'quantity' => $order->quantity,
            'total_price' => (float) $order->total_price,
            'status' => $order->status,
            'created_at' => optional($order->created_at)->toISOString(),
        ];
    }

    private function resolveUnitPrice(float $basePrice, string $purchaseOption): float
    {
        $pricing = self::PURCHASE_OPTION_PRICING[$purchaseOption] ?? self::PURCHASE_OPTION_PRICING['single_60ml'];

        if ($pricing['type'] === 'fixed') {
            return (float) $pricing['value'];
        }

        return $basePrice * (float) $pricing['value'];
    }
}
