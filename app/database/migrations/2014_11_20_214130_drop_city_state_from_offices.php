<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class DropCityStateFromOffices extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::drop('offices');

        Schema::create('offices', function($table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->string('description');
            $table->string('image');
            $table->integer('manager_id');
            $table->foreign('manager_id')->references('id')->on('managers');
            $table->float('lat');
            $table->float('lng');
            $table->integer('city_id');
            $table->foreign('city_id')->references('id')->on('cities');
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
        Schema::drop('offices');
	}

}
