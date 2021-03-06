<?php

use App\Quotation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            RolePermissionTableSeeder::class,
            BranchSeeder::class,
            MemberSeeder::class,
            OrderSeeder::class,
            BrandSeeder::class,
            SupplierSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            TransferSeeder::class,
            ExpenseCategorySeeder::class,
            ExpenseSeeder::class,
            PurchaseSeeder::class,
            AccountSeeder::class,
            DepartmentSeeder::class,
            HolidaySeeder::class,
            PayrollSeeder::class,
            AttendanceSeeder::class,
            DepositAccountSeeder::class,
            TransactionSeeder::class,
            BillerSeeder::class,
            TransferSeeder::class,
            QuotationTableSeeder::class,
            ReturnSaleTableSeeder::class,
            ReturnPurchaseTableSeeder::class,
            
        ]);
    }
}
