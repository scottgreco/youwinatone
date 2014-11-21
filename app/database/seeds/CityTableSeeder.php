<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CityTableSeeder extends Seeder {

	public function run()
	{
        DB::table('cities')->delete();

        City::create(array('id' => 1, 'name' => 'Gilbert', 'state_id' => 1));
        City::create(array('id' => 2, 'name' => 'Glendale', 'state_id' => 1));
        City::create(array('id' => 3, 'name' => 'Goodyear', 'state_id' => 1));
        City::create(array('id' => 4, 'name' => 'Paradise Valley', 'state_id' => 1));
        City::create(array('id' => 5, 'name' => 'Scottsdale', 'state_id' => 1));
        City::create(array('id' => 6, 'name' => 'Tempe', 'state_id' => 1));
        City::create(array('id' => 7, 'name' => 'Tucson', 'state_id' => 1));
        City::create(array('id' => 8, 'name' => 'Anaheim', 'state_id' => 2));
        City::create(array('id' => 9, 'name' => 'Antioch', 'state_id' => 2));
        City::create(array('id' => 10, 'name' => 'Campbell', 'state_id' => 2));
        City::create(array('id' => 11, 'name' => 'Carlsbad', 'state_id' => 2));
        City::create(array('id' => 12, 'name' => 'Corona', 'state_id' => 2));
        City::create(array('id' => 13, 'name' => 'Cupertino', 'state_id' => 2));
        City::create(array('id' => 14, 'name' => 'Emeryville', 'state_id' => 2));
        City::create(array('id' => 15, 'name' => 'Fremont', 'state_id' => 2));
        City::create(array('id' => 16, 'name' => 'Glendora', 'state_id' => 2));
        City::create(array('id' => 34, 'name' => 'Huntington Beach', 'state_id' => 2));
        City::create(array('id' => 17, 'name' => 'Irvine', 'state_id' => 2));
        City::create(array('id' => 18, 'name' => 'Laguna Niguel', 'state_id' => 2));
        City::create(array('id' => 35, 'name' => 'Mision Viejo', 'state_id' => 2));
        City::create(array('id' => 19, 'name' => 'Rancho Bernardo', 'state_id' => 2));
        City::create(array('id' => 20, 'name' => 'Rancho Cucamonga', 'state_id' => 2));
        City::create(array('id' => 21, 'name' => 'Riverside', 'state_id' => 2));
        City::create(array('id' => 22, 'name' => 'San Mateo', 'state_id' => 2));
        City::create(array('id' => 23, 'name' => 'San Ramon', 'state_id' => 2));
        City::create(array('id' => 24, 'name' => 'Santa Clarita', 'state_id' => 2));
        City::create(array('id' => 25, 'name' => 'Seacliff', 'state_id' => 2));
        City::create(array('id' => 26, 'name' => 'Temecula', 'state_id' => 2));
        City::create(array('id' => 27, 'name' => 'Ventura', 'state_id' => 2));
        City::create(array('id' => 28, 'name' => 'Centennial', 'state_id' => 3));
        City::create(array('id' => 29, 'name' => 'Henderson', 'state_id' => 4));
        City::create(array('id' => 30, 'name' => 'Las Vegas', 'state_id' => 4));
        City::create(array('id' => 31, 'name' => 'Eugene', 'state_id' => 5));
        City::create(array('id' => 32, 'name' => 'Dallas', 'state_id' => 6));
        City::create(array('id' => 33, 'name' => 'Houston', 'state_id' => 6));


	}

}