<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('order');
        Schema::dropIfExists('orders');
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('reference_no')->nullable();
            $table->unsignedBigInteger('outlet_id')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->enum('order_status',["Received","Pending","Ordered"])->default("Pending");
            $table->enum('payment_status',["Paid","Due"])->default("Due");
            $table->text('note')->nullable();
            $table->decimal('sub_total')->nullable();
            $table->decimal('total')->nullable();
            $table->decimal('due_amount')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
        });
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
