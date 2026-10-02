<?php

namespace App\Http\Controllers\Admin;

use App\Models\Perfume;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PerfumeController extends Controller
{
    public function index(Request $request)
    {
        $perfumes = Perfume::query()
            ->select(['id', 'name', 'slug', 'price', 'image_url', 'is_active', 'size_options', 'stock', 'stock_status'])
            ->orderBy('name')
            ->get();

        return response()->json($perfumes);
    }

    public function updateStock(Request $request, Perfume $perfume)
    {
        $data = $request->validate([
            'stock' => 'required|array',
            'stock.30ml' => 'nullable|integer|min:0',
            'stock.50ml' => 'nullable|integer|min:0',
        ]);

        $stock = [
            '30ml' => (int) ($data['stock']['30ml'] ?? 0),
            '50ml' => (int) ($data['stock']['50ml'] ?? 0),
        ];

        $perfume->stock = $stock;
        $perfume->size_options = ['30ml', '50ml'];
        $perfume->stock_status = ($stock['30ml'] > 0 || $stock['50ml'] > 0) ? 'In stock' : 'Out of stock';
        $perfume->save();

        return response()->json([
            'message' => 'Stock updated successfully.',
            'stock' => $perfume->stock,
        ]);
    }

    public function update(Request $request, Perfume $perfume)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:perfumes,slug,' . $perfume->id,
            'brand' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'short_description' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|string|max:500',
            'country_of_origin' => 'nullable|string|max:255',
            'size_options' => 'required|array|min:1',
            'size_options.*' => 'string|in:30ml,50ml',
            'stock' => 'required|array',
            'stock.30ml' => 'nullable|integer|min:0',
            'stock.50ml' => 'nullable|integer|min:0',
            'stock_status' => 'required|string|max:255',
            'fragrance_family' => 'nullable|string|max:255',
            'recipe' => 'nullable|string',
            'top_notes' => 'nullable|array',
            'heart_notes' => 'nullable|array',
            'base_notes' => 'nullable|array',
            'longevity' => 'nullable|string|max:255',
            'sillage' => 'nullable|string|max:255',
            'vibe' => 'nullable|string|max:255',
            'when_to_wear' => 'nullable|string|max:255',
            'feeling' => 'nullable|string|max:255',
            'average_rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'reviews' => 'nullable|array',
            'bottle_images' => 'nullable|array',
            'packaging_images' => 'nullable|array',
            'lifestyle_images' => 'nullable|array',
            'ingredients' => 'nullable|array',
            'delivery_info' => 'nullable|string',
            'return_policy' => 'nullable|string',
            'authenticity_guarantee' => 'nullable|string',
            'is_best_seller' => 'boolean',
            'is_trending' => 'boolean',
            'similar_slugs' => 'nullable|array',
            'seasons' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $perfume->fill($data);
        $perfume->save();

        return response()->json([
            'message' => 'Perfume updated successfully.',
            'perfume' => $perfume,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:perfumes,slug',
            'brand' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'short_description' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|string|max:500',
            'country_of_origin' => 'nullable|string|max:255',
            'size_options' => 'required|array|min:1',
            'size_options.*' => 'string|in:30ml,50ml',
            'stock' => 'required|array',
            'stock.30ml' => 'nullable|integer|min:0',
            'stock.50ml' => 'nullable|integer|min:0',
            'stock_status' => 'required|string|max:255',
            'fragrance_family' => 'nullable|string|max:255',
            'recipe' => 'nullable|string',
            'top_notes' => 'nullable|array',
            'heart_notes' => 'nullable|array',
            'base_notes' => 'nullable|array',
            'longevity' => 'nullable|string|max:255',
            'sillage' => 'nullable|string|max:255',
            'vibe' => 'nullable|string|max:255',
            'when_to_wear' => 'nullable|string|max:255',
            'feeling' => 'nullable|string|max:255',
            'average_rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'reviews' => 'nullable|array',
            'bottle_images' => 'nullable|array',
            'packaging_images' => 'nullable|array',
            'lifestyle_images' => 'nullable|array',
            'ingredients' => 'nullable|array',
            'delivery_info' => 'nullable|string',
            'return_policy' => 'nullable|string',
            'authenticity_guarantee' => 'nullable|string',
            'is_best_seller' => 'boolean',
            'is_trending' => 'boolean',
            'similar_slugs' => 'nullable|array',
            'seasons' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $perfume = Perfume::create($data);

        return response()->json([
            'message' => 'Perfume created successfully.',
            'perfume' => $perfume,
        ], 201);
    }

    public function destroy(Perfume $perfume)
    {
        $perfume->delete();

        return response()->json([
            'message' => 'Perfume deleted successfully.',
        ]);
    }
}
