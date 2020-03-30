<?php

use App\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles  = [
            'administrator','stockmanager', 'saleman','outlet',
        ];

        foreach ($roles as $role) :
            Role::create(
                [
                    'name'          => $role,
                    'guard_name'    => 'api'
                ]
            );
        endforeach;

        $permissions        = [
            'view dashboard',
            'view admin', 'add admin', 'edit admin', 'delete admin', 
            'view users', 'add users', 'edit users', 'delete users', 
            'view sales', 'add sales', 'import sales', 'edit sales', 'delete sales',
            'view website', 'add website', 'edit website', 'delete website',
            'view product', 'add product', 'edit product', 'delete product', 'import product',
            'view transfer', 'add transfer', 'edit transfer',
            'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            'view saleman','add saleman','import saleman','edit saleman','delete saleman',
			'view stock','add stock','edit stock','delete stock',
			'view order','add order','edit order','delete order',
			'view location','add location','edit location','delete location','import location',
            'view role','add role','edit role','delete role','import role',
            'view setting','add setting','edit setting','delete setting',
			'view outlet','add outlet','edit outlet','delete outlet','import outlet',
            // 'summary report', 'product report', 'daily sale report', 'monthly sale report',
            // 'daily purchase report', 'monthly purchase report', 'sale report', 'payment report',
            // 'purchase report', 'warehouse report', 'product qty alert', 'user report', 
            // 'customer report', 'supplier report', 'due report',
            // 'support', 'payment log',
            // 'add withdraw method', 'view withdraw method', 'edit withdraw method', 
            // 'delete withdraw method', 
            // 'charge commission',
            // 'view employee', 'add employee', 'edit employee', 'delete employee',
            // 'view account', 'add account', 'edit account', 'delete account', 'import account',
            // 'view customer', 'add customer', 'edit customer', 'delete customer', 'import customer',
            // 'view biller', 'add biller', 'edit biller', 'delete biller', 'import biller',
            // 'return sales', 'return purchases', 'pos',
            // 'view purchase', 'add purchase', 'edit purchase', 'delete purchase', 'import purchase',
            // 'view expense', 'add expense', 'edit expense', 'import expense', 'delete expense',
            // 'view quotation', 'add quotation', 'edit quotation',
           
			
        ];

        foreach ($permissions as $permission) :
            Permission::create(
                [
                    'name'          => $permission,
                    'guard_name'    => 'api'
                ]
            );
        endforeach;

    //    Super Admin
        $superAdmin = Role::where('name', 'superAdmin')->first();
        $superAdmin->syncPermissions([
            'view admin', 'add admin', 'edit admin', 'delete admin', 
            'view dashboard',
            'view users', 'add users', 'edit users', 'delete users', 
            'view saleman', 'add saleman', 'import saleman', 'edit saleman', 'delete saleman',
            'view website', 'add website', 'edit website', 'delete website',
            'view product', 'add product', 'edit product', 'delete product', 'import product',
            'view location', 'add location', 'edit location', 'delete location', 'import location',
            'view outlet', 'add outlet', 'edit outlet', 'delete outlet', 'import outlet',
            'view order', 'add order', 'edit order', 'delete order',
            'view transfer', 'add transfer', 'edit transfer',
            'view role', 'add role', 'edit role', 'delete role',
            'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            // 'view users', 'add users', 'edit users', 'delete users', 
            // 'view sales', 'add sales', 'import sales', 'edit sales', 'delete sales',
            // 'view website', 'add website', 'edit website', 'delete website',
            // 'view product', 'add product', 'edit product', 'delete product', 'import product',
            // 'view purchase', 'add purchase', 'edit purchase', 'delete purchase', 'import purchase',
            // 'view expense', 'add expense', 'edit expense', 'import expense', 'delete expense',
            // 'view quotation', 'add quotation', 'edit quotation',
            // 'view transfer', 'add transfer', 'edit transfer',
            // 'view employee', 'add employee', 'edit employee', 'delete employee',
            // 'view account', 'add account', 'edit account', 'delete account', 'import account',
            // 'view customer', 'add customer', 'edit customer', 'delete customer', 'import customer',
            // 'view biller', 'add biller', 'edit biller', 'delete biller', 'import biller',
            // 'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            // 'summary report', 'product report', 'daily sale report', 'monthly sale report',
            // 'daily purchase report', 'monthly purchase report', 'sale report', 'payment report',
            // 'purchase report', 'warehouse report', 'product qty alert', 'user report', 
            // 'customer report', 'supplier report', 'due report',
            // 'support', 'payment log',
            // 'add withdraw method', 'view withdraw method', 'edit withdraw method', 
            // 'delete withdraw method', 
            // 'charge commission',
            // 'return sales', 'return purchases', 'pos'
        ]);

        $SuperAdmin              = User::where('name', 'superAdmin')->first();
        $SuperAdmin->assignRole('superAdmin');

        $administrator      = Role::where('name', 'administrator')->first();
        $administrator->syncPermissions([
            'view dashboard',
            'view users', 'add users', 'edit users', 'delete users', 
            'view saleman', 'add saleman', 'import saleman', 'edit saleman', 'delete saleman',
            'view website', 'add website', 'edit website', 'delete website',
            'view product', 'add product', 'edit product', 'delete product', 'import product',
            'view location', 'add location', 'edit location', 'delete location', 'import location',
            'view outlet', 'add outlet', 'edit outlet', 'delete outlet', 'import outlet',
            'view order', 'add order', 'edit order', 'delete order',
            'view transfer', 'add transfer', 'edit transfer',
            'view role', 'add role', 'edit role', 'delete role',
            'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            // 'view account', 'add account', 'edit account', 'delete account', 'import account',
            // 'view customer', 'add customer', 'edit customer', 'delete customer', 'import customer',
            // 'view biller', 'add biller', 'edit biller', 'delete biller', 'import biller',
            // 'summary report', 'product report', 'daily sale report', 'monthly sale report',
            // 'daily purchase report', 'monthly purchase report', 'sale report', 'payment report',
            // 'purchase report', 'warehouse report', 'product qty alert', 'user report', 
            // 'customer report', 'supplier report', 'due report',
            // 'support', 'payment log',
            // 'add withdraw method', 'view withdraw method', 'edit withdraw method', 
            // 'delete withdraw method', 
            // 'charge commission', 'pos', 'return sales', 'return purchases',
        ]);

        // $accountant         = Role::where('name', 'Accountant')->first();
        // $accountant->syncPermissions([
        //     'view account', 'add account', 'edit account', 'delete account', 'import account',
        //     'view expense', 'add expense', 'edit expense', 'delete expense', 'import expense',
        // ]);

        $admin              = User::where('name', 'administrator')->first();
        $admin->assignRole('administrator');

        // $account            = User::where('name', 'accountant')->first();
        // $account->assignRole('accountant');

        

        // stockmanager
        $stockmanager = Role::where('name', 'stockmanager')->first();
        $stockmanager->syncPermissions([
            'view dashboard',
            'view stock',
            'add stock',
            'edit stock',
            'delete stock',
            'view product',
            'add product',
            'edit product',
            'delete product',
            'import product',
            // 'view sales', 'import sales', 'view product', 'payment log', 'add withdraw method',
            // 'view expense', 'return sales', 'return purchases',
            // 'summary report', 'product report', 'daily sale report', 'monthly sale report',
            // 'daily purchase report', 'monthly purchase report', 'sale report', 'payment report',
            // 'purchase report', 'warehouse report', 'product qty alert', 'user report', 
            // 'customer report', 'supplier report', 'due report',
        ]);

        $saleman = Role::where('name', 'saleman')->first();
        $saleman->syncPermissions([
            'view dashboard',
            'view saleman',
            'add saleman',
            'edit saleman',
            'delete saleman',
            'import saleman',
            'view outlet',
            'add outlet',
            'edit outlet',
            'delete outlet',
            'import outlet',
            'view order',
            'add order',
            'edit order',
            'delete order',
            'view product',
            'add product',
            'edit product',
            'delete product',
            'import product',
            // 'view sales', 'add sales', 'edit sales', 'delete sales', 'import sales',
            // 'summary report', 'product report', 'daily sale report', 'monthly sale report',
            // 'daily purchase report', 'sale report',
            // 'purchase report', 'warehouse report', 'product qty alert',
            // 'customer report', 'supplier report', 'due report', 'pos', 'return sales' 
        ]);


        $saleMan = User::where('name', 'saleman')->first();
        $saleMan->assignRole('saleman');

        // SuperVisor
        // $superVisor = Role::where('name', 'supervisor')->first();
        // $superVisor->syncPermissions([
        //     'view sales', 'add sales', 'edit sales', 'delete sales', 'import sales',
        //     'summary report', 'product report', 'daily sale report', 'monthly sale report',
        //     'daily purchase report', 'sale report',
        //     'purchase report', 'warehouse report', 'product qty alert',
        //     'customer report', 'supplier report', 'due report', 'pos', 'return sales' 
        // ]);
        
        // $superVisor = User::where('name', 'superVisor')->first();
        // $superVisor->assignRole('superVisor');

        $stockmanager = User::where('name', 'stockmanager')->first();
        $stockmanager->assignRole('stockmanager');

        $saleman = User::where('name', 'saleman')->first();
        $saleman->assignRole('saleman');


        // WebController
        // $webAdmin = Role::where('name', 'webAdmin')->first();
        // $webAdmin->syncPermissions([
        //     'view website', 'add website', 'edit website', 'delete website',
        // ]);
        // $webAdmin->syncPermissions(['view website', 'add website', 'edit website']);

        // $web = User::where('name', 'webAdmin')->first();
        // $web->assignRole('webAdmin');
    }
}
