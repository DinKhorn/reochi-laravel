<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableStockIn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stock_in', function (Blueprint $table) {
            $table->dropColumn('product_id');
            $table->dropColumn("quantity");
            $table->dropColumn("unit_price");
            $table->dropColumn("discount");
            $table->dropColumn("sub_amount");
            $table->dropColumn("amount");
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
