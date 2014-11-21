<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder {

	public function run()
	{
        DB::table('users')->delete();

        User::create([
            'username'   => 'admin',
            'email'      => 'admin@youwinatone.com',
            'password'   => Hash::make('ywao2014*'),
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ]);
	}

}