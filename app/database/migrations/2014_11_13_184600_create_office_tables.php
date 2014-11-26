<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOfficeTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('managers', function($table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('license');
            $table->string('description');
            $table->string('image');
            $table->string('title');
            $table->string('email')->unique()->nullable();
            $table->timestamps();
        });

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
            $table->string('state');
            $table->string('city');
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
        Schema::drop('managers');
	}

}
