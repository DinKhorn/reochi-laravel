<?php

use Illuminate\Database\Seeder;

use App\Product;
use App\Category;
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

        foreach (range(1,3) as $i) {
            Product::create([
                'user_id' => \App\User::all()->random()->id,
                // 'category_id' =>\App\Category::all()->random()->id,
                'name' => $faker->randomElement(['CaCo', 'DayDay', 'Pepsi']),
                'active' => $faker->randomElement(['1', '0']),
                'code' => $faker->randomNumber($nbDigits = NULL, $strict = false),
                'unit' => $faker->numberBetween($min=1, $max=1000),
                'price' => $faker->numberBetween($min=10, $max=10000),
            ]);
        }
    }
}
