<?php
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
use App\Models\Order;
use App\Models\Perfume;
$p = Perfume::first();
$p2 = Perfume::skip(1)->first();
$p3 = Perfume::skip(2)->first();
$order = Order::create([
    "perfume_id" => $p->id,
    "customer_name" => "Test Pack",
    "customer_address" => "Test",
    "customer_phone" => "0600000000",
    "purchase_option" => "pack_50ml_x3",
    "selected_perfume_ids" => [$p->id, $p2->id, $p3->id],
    "quantity" => 1,
    "total_price" => 199,
    "status" => "pending",
]);
$order->load("perfume");
echo "selected_perfume_ids: " . json_encode($order->selected_perfume_ids) . PHP_EOL;
$perfumes = Perfume::whereIn("id", $order->selected_perfume_ids)->get()->keyBy("id");
$names = [];
foreach($order->selected_perfume_ids as $id) {
    $names[] = $perfumes[$id]?->name;
}
echo "contents: " . implode(" ? ", $names) . PHP_EOL;

