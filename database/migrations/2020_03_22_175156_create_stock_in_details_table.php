<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockInDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_in_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger("stock_in_id")->nullable();
            $table->unsignedBigInteger("product_id")->nullable();
            $table->integer("quantity")->nullable();
            $table->float("unit_price")->nullable();
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
        Schema::dropIfExists('stock_in_details');
    }
}
