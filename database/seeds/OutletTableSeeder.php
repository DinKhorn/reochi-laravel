<?php

use Illuminate\Database\Seeder;

use App\Outlet;
use Faker\Factory;

class OutletTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        foreach(range(1, 3) as $i) {
            Outlet::create([
                'name'  => $faker->name,
                'location' => $faker->city,
                'phone' => $faker->phone,
                'status' => $faker->randomElement(['Enable', 'Disable']),
            ]);
        }
    }
}
