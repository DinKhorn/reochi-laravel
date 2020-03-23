<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'category' =>  $faker->randomElement(['Fruit', 'Beer', 'Milk']),
        'description' =>  $faker->text,
    ];
});
