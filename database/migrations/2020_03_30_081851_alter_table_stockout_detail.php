<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableStockoutDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stock_out_details', function (Blueprint $table) {
            $table->dropColumn('stock_in_id');

        });
        Schema::table('stock_out_details', function (Blueprint $table) {
            $table->unsignedBigInteger('stock_out_id');

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
