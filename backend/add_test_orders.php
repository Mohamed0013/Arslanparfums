<?php
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$p = App\Models\Perfume::first();
for($i=0;$i<50;$i++){
  App\Models\Order::create(["perfume_id"=>$p->id,"customer_name"=>"V".$i,"customer_address"=>"A","customer_phone"=>"060000000".($i%10),"purchase_option"=>"single_50ml","quantity"=>1,"total_price"=>79,"status"=>"validated"]);
}
for($i=0;$i<50;$i++){
  App\Models\Order::create(["perfume_id"=>$p->id,"customer_name"=>"R".$i,"customer_address"=>"A","customer_phone"=>"061000000".($i%10),"purchase_option"=>"single_50ml","quantity"=>1,"total_price"=>79,"status"=>"refused"]);
}
echo App\Models\Order::count();

