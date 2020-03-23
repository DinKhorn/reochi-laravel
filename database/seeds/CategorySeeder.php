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

        foreach(range(1 , 3) as $i) {
            Category::create([
                'category' => $faker->randomElement(['Fruit', 'Beer', 'Milk']),
                'description' => $faker->text,
            ]);
        }
    }
}
