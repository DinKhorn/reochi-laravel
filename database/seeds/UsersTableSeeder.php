<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $users      = [
            // SuperAdmin
            [
                'name'      => "superadmin",
                "email"     => "superAdmin@mail.com",
                "password"  => 'secret',
            ],
            // Admin
            [
                'name'      => "administrator",
                "email"     => "administrator@mail.com",
                "password"  => 'secret',
            ],
            [
                'name'      => "finance",
                "email"     => "finance@mail.com",
                "password"  => 'secret',
            ],
            [
                'name'      => "stockmanager",
                "email"     => "stockManager@mail.com",
                "password"  => 'secret',
            ],
            [
                'name'      => "saleman",
                "email"     => "saleman@mail.com",
                "password"  => 'secret',
            ],

            [
                'name'      => "salemanager",
                "email"     => "salemanager@mail.com",
                "password"  => 'secret',
            ],

            // [
            //     'name'      => "webAdmin",
            //     "email"     => "webAdmin@mail.com",
            //     "password"  => 'secret',
            // ],

            [
                'name'      => "salesupervisor",
                "email"     => "salesupervisor@mail.com",
                "password"  => 'secret',
            ],
            // Member
            [
                'name'      => "outlet",
                "email"     => "outLet@mail.com",
                "password"  => 'secret',
            ],
        ];

        foreach ($users as $user) :
            User::create([
                'name'      => $user['name'],
                'email'     =>  $user['email'],
                'password'  => bcrypt($user['password'])
            ]);
        endforeach;
    }
}
