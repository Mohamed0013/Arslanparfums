<?php

namespace App\Http\Controllers;

use App\Models\Perfume;

class PerfumeController extends Controller
{
    public function index()
    {
        $inStockOrder = [
            'xerjoff-naxos',
            'tom-ford-oud-wood',
            'bianco-latte',
            'le-male-elixir',
            'ombre-leather',
            'spicebomb',
            'boss-bottled',
            'stronger-with-you',
            'stronger-with-you-intensely',
            'tom-ford-noir',
            'le-male-le-parfum',
            'dior-homme-intense',
            'gentleman-reserve',
            'sauvage-elixir-new',
            'the-most-wanted-new',
            'layton-new',
            'l-instant-de-guerlain',
        ];

        $perfumes = Perfume::query()
            ->select('*')
            ->orderByRaw('CASE WHEN stock_status = ? THEN 0 ELSE 1 END', ['En stock || متوفر'])
            ->orderByRaw(
                'CASE slug ' . collect($inStockOrder)
                    ->map(fn (string $slug, int $index) => "WHEN '{$slug}' THEN " . ($index + 1))
                    ->implode(' ') . ' ELSE 100 END'
            )
            ->get()
            ->map(fn (Perfume $perfume) => $this->serializePerfume($perfume));

        return response()->json($perfumes);
    }

    public function show(string $slug)
    {
        $perfume = Perfume::query()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($this->serializePerfume($perfume));
    }

    private function serializePerfume(Perfume $perfume): array
    {
        return [
            'id' => $perfume->id,
            'name' => $perfume->name,
            'slug' => $perfume->slug,
            'brand' => $perfume->brand ?? 'Perfume House Signature',
            'gender' => $perfume->gender ?? 'Unisex',
            'short_description' => $perfume->short_description,
            'description' => $perfume->description,
            'price' => (float) $perfume->price,
            'image_url' => $perfume->image_url,
            'country_of_origin' => $perfume->country_of_origin ?? 'Unknown',
            'size_options' => $perfume->size_options ?? ['50ml'],
            'stock_status' => $perfume->stock_status ?? 'In stock',
            'stock' => $perfume->stock ?? ['50ml' => 0],
            'seasons' => $perfume->seasons ?? [],
            'fragrance_family' => $perfume->fragrance_family ?? 'Fresh Aromatic',
            'recipe' => $perfume->recipe ?? 'Classic fragrance composition with layered top, heart, and base notes.',
            'top_notes' => $perfume->top_notes ?? ['Citrus'],
            'heart_notes' => $perfume->heart_notes ?? ['Floral'],
            'base_notes' => $perfume->base_notes ?? ['Musk'],
            'longevity' => $perfume->longevity ?? '4 heures',
            'sillage' => $perfume->sillage ?? 'Moderate',
            'persistence' => $perfume->persistence ?? '4 hours',
            'vibe' => $perfume->vibe ?? 'Elegant and confident',
            'when_to_wear' => $perfume->when_to_wear ?? 'Day and night, all year round',
            'feeling' => $perfume->feeling ?? 'Confidence and attraction',
            'average_rating' => (float) ($perfume->average_rating ?? 4.5),
            'reviews_count' => (int) ($perfume->reviews_count ?? 0),
            'reviews' => $perfume->reviews ?? [],
            'bottle_images' => $perfume->bottle_images ?? array_filter([$perfume->image_url]),
            'packaging_images' => $perfume->packaging_images ?? array_filter([$perfume->image_url]),
            'lifestyle_images' => $perfume->lifestyle_images ?? array_filter([$perfume->image_url]),
            'ingredients' => $perfume->ingredients ?? ['Alcohol Denat.', 'Parfum'],
            'delivery_info' => $perfume->delivery_info ?? 'Delivery in 2-4 business days',
            'return_policy' => $perfume->return_policy ?? '30-day return policy on unopened products',
            'authenticity_guarantee' => $perfume->authenticity_guarantee ?? '100% authentic fragrance guaranteed',
            'is_best_seller' => (bool) ($perfume->is_best_seller ?? false),
            'is_trending' => (bool) ($perfume->is_trending ?? false),
            'similar_slugs' => $perfume->similar_slugs ?? [],
        ];
    }
}
