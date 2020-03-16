<?php

use Illuminate\Database\Seeder;

use App\Product;

use Faker\Factory;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        // Product::truncate();

        foreach (range(1,3) as $i) {
            Product::create([
                'user_id' => \App\User::all()->random()->id,
                // 'brand_id' => \App\Brand::all()->random()->id,
                'name' => $faker->randomElement(['CaCo', 'DayDay', 'Pepsi']),
                'active' => $faker->randomElement(['1', '0']),
                'code' => $faker->randomNumber($nbDigits = NULL, $strict = false),
                'unit' => $faker->numberBetween($min=1, $max=1000),
                'price' => $faker->numberBetween($min=10, $max=10000),
            ]);
        }
    }
}
