<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Perfume extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'brand',
        'gender',
        'short_description',
        'description',
        'price',
        'image_url',
        'country_of_origin',
        'size_options',
        'stock_status',
        'stock',
        'fragrance_family',
        'recipe',
        'top_notes',
        'heart_notes',
        'base_notes',
        'longevity',
        'sillage',
        'persistence',
        'vibe',
        'when_to_wear',
        'feeling',
        'average_rating',
        'reviews_count',
        'reviews',
        'bottle_images',
        'packaging_images',
        'lifestyle_images',
        'ingredients',
        'delivery_info',
        'return_policy',
        'authenticity_guarantee',
        'is_best_seller',
        'is_trending',
        'discount_percentage',
        'similar_slugs',
        'seasons',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'size_options' => 'array',
            'stock' => 'array',
            'top_notes' => 'array',
            'heart_notes' => 'array',
            'base_notes' => 'array',
            'average_rating' => 'decimal:2',
            'reviews_count' => 'integer',
            'reviews' => 'array',
            'bottle_images' => 'array',
            'packaging_images' => 'array',
            'lifestyle_images' => 'array',
            'ingredients' => 'array',
            'is_best_seller' => 'boolean',
            'is_trending' => 'boolean',
            'discount_percentage' => 'integer',
            'similar_slugs' => 'array',
            'seasons' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
