<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class StateTableSeeder extends Seeder {

	public function run()
	{
        DB::table('states')->delete();

        State::create(array('id' => 1, 'name' => "Arizona"));
        State::create(array('id' => 2, 'name' => "California"));
        State::create(array('id' => 3, 'name' => "Colorado"));
        State::create(array('id' => 4, 'name' => "Nevada"));
        State::create(array('id' => 5, 'name' => "Oregon"));
        State::create(array('id' => 6, 'name' => "Texas"));
	}

}