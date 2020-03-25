<?php

use Illuminate\Database\Seeder;
use App\Category;
use Faker\Factory;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // factory(\AppCategory::class, 2)->create();
        $faker = Factory::create();

        foreach(range(1 , 5) as $i) {
            Category::create([
                'cat_name' => $faker->randomElement(['Fruit', 'Beer', 'Milk']),
                'description' => $faker->sentence,
            ]);
        }
    }
}
