<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Perfume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    private const PURCHASE_OPTION_PRICING = [
        'single_50ml' => ['type' => 'fixed', 'value' => 79.0, 'size' => '50ml', 'quantity' => 1],
        'pack_50ml_x3' => ['type' => 'fixed', 'value' => 199.0, 'size' => '50ml', 'quantity' => 1],
    ];

    private function getPurchaseOptionMeta(string $purchaseOption): array
    {
        return self::PURCHASE_OPTION_PRICING[$purchaseOption] ?? self::PURCHASE_OPTION_PRICING['single_50ml'];
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
            'purchase_option' => 'required|string|in:single_50ml,pack_50ml_x3',
            'selected_perfume_ids' => 'nullable|array',
            'selected_perfume_ids.*' => 'integer|distinct|exists:perfumes,id',
        ]);

        $perfume = Perfume::findOrFail($data['perfume_id']);

        if (!$perfume->is_active) {
            return response()->json([
                'message' => 'This perfume is currently unavailable.',
            ], 422);
        }

        $selectedPerfumeIds = $data['selected_perfume_ids'] ?? [$perfume->id];
        if ($data['purchase_option'] === 'pack_50ml_x3' && count($selectedPerfumeIds) !== 3) {
            return response()->json([
                'message' => 'A pack must contain exactly three different perfumes.',
            ], 422);
        }

        $optionMeta = $this->getPurchaseOptionMeta($data['purchase_option']);
        $size = $optionMeta['size'];
        $optionQuantity = $optionMeta['quantity'];
        $requiredStock = (int) $data['quantity'] * $optionQuantity;

        try {
            $order = DB::transaction(function () use ($data, $selectedPerfumeIds, $optionMeta, $size, $requiredStock) {
                $lockedPerfumes = Perfume::query()
                    ->whereIn('id', $selectedPerfumeIds)
                    ->orderBy('id')
                    ->lockForUpdate()
                    ->get()
                    ->keyBy('id');

                if ($lockedPerfumes->count() !== count($selectedPerfumeIds)) {
                    throw new \Exception('One or more selected perfumes are unavailable.', 422);
                }

                foreach ($selectedPerfumeIds as $selectedPerfumeId) {
                    $selectedPerfume = $lockedPerfumes->get($selectedPerfumeId);
                    $currentStock = (int) ($selectedPerfume->stock[$size] ?? 0);
                    if (!$selectedPerfume->is_active || $currentStock < $requiredStock) {
                        throw new \Exception("Insufficient stock for {$selectedPerfume->name}.", 422);
                    }
                }

                $unitPrice = (float) $optionMeta['value'];
                $primaryPerfume = $lockedPerfumes->get($data['perfume_id']) ?? $lockedPerfumes->first();

                $order = Order::create([
                    'perfume_id' => $primaryPerfume->id,
                    'customer_name' => $data['customer_name'],
                    'customer_address' => $data['customer_address'],
                    'customer_phone' => $data['customer_phone'],
                    'purchase_option' => $data['purchase_option'],
                    'selected_perfume_ids' => $selectedPerfumeIds,
                    'quantity' => $data['quantity'],
                    'total_price' => round($unitPrice * $data['quantity'], 2),
                    'status' => 'pending',
                ]);

                foreach ($selectedPerfumeIds as $selectedPerfumeId) {
                    $selectedPerfume = $lockedPerfumes->get($selectedPerfumeId);
                    $currentStock = (int) ($selectedPerfume->stock[$size] ?? 0);
                    $selectedPerfume->stock = array_merge($selectedPerfume->stock ?? [], [$size => $currentStock - $requiredStock]);
                    $selectedPerfume->stock_status = ($currentStock - $requiredStock) > 0
                        ? 'En stock || متوفر'
                        : 'Rupture de stock || غير متوفر';
                    $selectedPerfume->save();
                }

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

    public function markAsRefused(Request $request, Order $order)
    {
        if ($request->user()?->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($order->status === 'refused') {
            return response()->json([
                'message' => 'Order already refused.',
                'order' => $this->serializeOrder($order->loadMissing('perfume')),
            ]);
        }

        if ($order->status === 'validated') {
            return response()->json([
                'message' => 'Cannot refuse a validated order.',
            ], 422);
        }

        try {
            DB::transaction(function () use ($order) {
                $optionMeta = $this->getPurchaseOptionMeta($order->purchase_option);
                $size = $optionMeta['size'];
                $optionQuantity = $optionMeta['quantity'];
                $restockQuantity = (int) $order->quantity * $optionQuantity;

                $perfume = Perfume::query()->whereKey($order->perfume_id)->lockForUpdate()->first();
                if ($perfume) {
                    $currentStock = (int) ($perfume->stock[$size] ?? 0);
                    $perfume->stock = array_merge($perfume->stock ?? [], [$size => $currentStock + $restockQuantity]);
                    $perfume->stock_status = ($currentStock + $restockQuantity) > 0
                        ? 'En stock || متوفر'
                        : 'Rupture de stock || غير متوفر';
                    $perfume->save();
                }

                $order->status = 'refused';
                $order->save();
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }

        return response()->json([
            'message' => 'Order refused successfully.',
            'order' => $this->serializeOrder($order->loadMissing('perfume')),
        ]);
    }

    private function serializeOrder(Order $order): array
    {
        $perfumeNames = [];
        if ($order->selected_perfume_ids && is_array($order->selected_perfume_ids)) {
            $perfumes = Perfume::whereIn('id', $order->selected_perfume_ids)->get()->keyBy('id');
            $perfumeNames = $order->selected_perfume_ids
                ? array_map(fn ($id) => $perfumes[$id]?->name, $order->selected_perfume_ids)
                : [];
        } elseif ($order->perfume) {
            $perfumeNames = [$order->perfume->name];
        }

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
            'contents' => $perfumeNames,
        ];
    }

    private function resolveUnitPrice(float $basePrice, string $purchaseOption): float
    {
        $pricing = self::PURCHASE_OPTION_PRICING[$purchaseOption] ?? self::PURCHASE_OPTION_PRICING['single_50ml'];

        if ($pricing['type'] === 'fixed') {
            return (float) $pricing['value'];
        }

        return $basePrice * (float) $pricing['value'];
    }
}
