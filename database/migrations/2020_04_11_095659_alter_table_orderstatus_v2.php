<?php

use App\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableOrderstatusV2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('order_status_v2',['Pending','Accepted','Cancel'])->default('Pending')->after('order_status')->nullable();
        });
        $orders = Order::get();

        foreach($orders  as $order){
            if($order->order_status == "New"){
                Order::find($order->id)->update(["order_status_v2" => "Pending"]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
