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
            'superadmin','administrator','stockmanager', 'saleman','outlet','finance','salemanager','salesupervisor',
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
            'view reward',
            'add reward',
            'edit reward',
            'delete reward',
            'view administrator', 'add administrator', 'edit administrator', 'delete administrator', 
            'view users', 'add users', 'edit users', 'delete users', 
            'view product', 'add product', 'edit product', 'delete product', 'import product',
            'view transfer', 'add transfer', 'edit transfer',
            'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            'view saleman','add saleman','import saleman','edit saleman','delete saleman',
            'view stock-in','add stock-in','edit stock-in','delete stock-in',
            'view stock-out','add stock-out','edit stock-out','delete stock-out',
			'view order','add order','edit order','delete order',
			'view location','add location','edit location','delete location','import location',
            'view role','add role','edit role','delete role','import role',
            'view setting','add setting','edit setting','delete setting',
            'view outlet','add outlet','edit outlet','delete outlet','import outlet',
            'view finance',
            'add finance',
            'edit finance',
            'delete finance',
            'view salemanager',
            'add salemanager',
            'edit salemanager',
            'delete salemanager',
            'view salesupervisor',
            'add salesupervisor',
            'edit salesupervisor',
            'delete salesupervisor',
        ];

        foreach ($permissions as $permission) :
            Permission::create(
                [
                    'name'          => $permission,
                    'guard_name'    => 'api'
                ]
            );
        endforeach;

    //    superadmin
        $superadmin = Role::where('name', 'superadmin')->first();
        $superadmin->syncPermissions([
            'view administrator', 'add administrator', 'edit administrator', 'delete administrator',
            'view dashboard',
            'view reward',
            'add reward',
            'edit reward',
            'delete reward',
            'view users', 'add users', 'edit users', 'delete users', 
            'view product', 'add product', 'edit product', 'delete product', 'import product',
            'view transfer', 'add transfer', 'edit transfer',
            'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            'view saleman','add saleman','import saleman','edit saleman','delete saleman',
            'view stock-in','add stock-in','edit stock-in','delete stock-in',
            'view stock-out','add stock-out','edit stock-out','delete stock-out',
			'view order','add order','edit order','delete order',
			'view location','add location','edit location','delete location','import location',
            'view role','add role','edit role','delete role','import role',
            'view setting','add setting','edit setting','delete setting',
            'view outlet','add outlet','edit outlet','delete outlet','import outlet',
            'view finance',
            'add finance',
            'edit finance',
            'delete finance',
            'view salemanager',
            'add salemanager',
            'edit salemanager',
            'delete salemanager',
            'view salesupervisor',
            'add salesupervisor',
            'edit salesupervisor',
            'delete salesupervisor',
        ]);

        $superadmin = User::where('name', 'superadmin')->first();
        $superadmin->assignRole('superadmin');

        $administrator      = Role::where('name', 'administrator')->first();
        $administrator->syncPermissions([
            'view dashboard',
            'view users', 'add users', 'edit users', 'delete users', 
            'view saleman', 'add saleman', 'import saleman', 'edit saleman', 'delete saleman',
            'view reward',
            'add reward',
            'edit reward',
            'delete reward',
            'view location', 'add location', 'edit location', 'delete location', 'import location',
            'view outlet', 'add outlet', 'edit outlet', 'delete outlet', 'import outlet',
            'view transfer', 'add transfer', 'edit transfer',
            'view role', 'add role', 'edit role', 'delete role',
            'view stock-in','add stock-in','edit stock-in','delete stock-in',
            'view stock-out','add stock-out','edit stock-out','delete stock-out',
            'view order', 'add order', 'edit order', 'delete order',
            'view product', 'add product', 'edit product', 'delete product', 'import product',
            'view setting','add setting','edit setting','delete setting',
            'view supplier', 'add supplier', 'edit supplier', 'delete supplier', 'import supplier',
            'view finance',
            'add finance',
            'edit finance',
            'delete finance',
            'view salemanager',
            'add salemanager',
            'edit salemanager',
            'delete salemanager',
            'view salesupervisor',
            'add salesupervisor',
            'edit salesupervisor',
            'delete salesupervisor',
 
        ]);
        $administrator= User::where('name', 'administrator')->first();
        $administrator->assignRole('administrator');

        // Finance
        $finance= Role::where('name', 'finance')->first();
        $finance->syncPermissions([
            'view stock-in','add stock-in','edit stock-in','delete stock-in',
            'view stock-out','add stock-out','edit stock-out','delete stock-out',
            'view order', 'add order', 'edit order', 'delete order',
            'view product', 'add product', 'edit product', 'delete product', 'import product',
        ]);

        $finance= User::where('name', 'finance')->first();
        $finance->assignRole('finance');

    
        // stockmanager
        $stockmanager = Role::where('name', 'stockmanager')->first();
        $stockmanager->syncPermissions([
            'view dashboard',
            'view stock-in',
            'add stock-in',
            'edit stock-in',
            'delete stock-in',
            'view stock-out',
            'add stock-out',
            'edit stock-out',
            'delete stock-out',
            'view product',
            'add product',
            'edit product',
            'delete product',
            'import product',
        ]);
        $stockmanager = User::where('name', 'stockmanager')->first();
        $stockmanager->assignRole('stockmanager');

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
        ]);


        $saleman = User::where('name', 'saleman')->first();
        $saleman->assignRole('saleman');
        // $saleman = User::where('name', 'saleman')->first();
        // $saleman->assignRole('saleman');

     
        // SaleManager
        $salemanager = Role::where('name', 'salemanager')->first();
        $salemanager->syncPermissions([
            'view stock-in','add stock-in','edit stock-in','delete stock-in',
            'view stock-out','add stock-out','edit stock-out','delete stock-out',
            'view order', 'add order', 'edit order', 'delete order',
            'view product', 'add product', 'edit product', 'delete product', 'import product',
        ]);

        $salemanager = User::where('name', 'salemanager')->first();
        $salemanager->assignRole('salemanager');

        // salesupervisor
        $salesupervisor = Role::where('name', 'salesupervisor')->first();
        $salesupervisor->syncPermissions([
            'view order', 'add order', 'edit order', 'delete order',
            'view product', 'add product', 'edit product', 'delete product', 'import product', 
        ]);

        $salesupervisor = User::where('name', 'salesupervisor')->first();
        $salesupervisor->assignRole('salesupervisor');  
    }
}
