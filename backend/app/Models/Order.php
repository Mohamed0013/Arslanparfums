<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'perfume_id',
        'customer_name',
        'customer_address',
        'customer_phone',
        'purchase_option',
        'selected_perfume_ids',
        'quantity',
        'total_price',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'total_price' => 'decimal:2',
            'selected_perfume_ids' => 'array',
        ];
    }

    public function perfume(): BelongsTo
    {
        return $this->belongsTo(Perfume::class);
    }
}
