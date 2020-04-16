<?php

use Illuminate\Http\Request;



Route::group(['middleware' => 'auth:api', 'namespace' => 'V1'], function () {
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::post('login', 'LoginController@passport')->name('auth.login');
        Route::get('user', 'UserController@index');
        Route::get('me', 'AuthController@me');
        Route::get('permissions', 'PermissionController')->name('permission');
        Route::get('roles', 'RoleController')->name('roles');
    });

    Route::apiResources([
        'user'  => 'UserController',
        'product'  => 'ProductController',
        'expense'  => 'ExpenseController',
        'purchase'  => 'PurchaseController',
        // 'sale'  => 'SaleController',
        // 'expense-category'  => 'ExpenseCategoryController',
        'hr-department'  => 'DepartmentController',
        'employee'  => 'EmployeeController',
        'attendance'  => 'AttendanceController',
        'account'  => 'AccountController',
        'payroll'  => 'PayrollController',
        'holiday'  => 'HolidayController',
        // 'transaction'  => 'TransactionController',
        'deposit-account'  => 'DepositController',
        'member' => 'MemberController',
        'biller' => 'BillerController',
        'supplier' => 'SupplierController',
        'transfer' => 'TransferController',
        'tracking' => 'TrackingController',
        // 'location' => 'LocationController',
        'brand' => 'BrandController',
        'quotation'     => 'QuotationController',
        'return-sale'    => 'ReturnSaleController',
        'return-purchase' => 'ReturnPurchaseController',

        'calendar' => 'CalendarController',
        'outlets' => 'OutletController',
        'order' => 'OrderController',
        'roles' => 'Auth\RoleController',
        'stock-in' => 'StockInController',
        'stock-out' => 'StockOutController',
        'category' => 'CategoryController',
        'salesman' => 'SalesmanController',
        'delivery-man' => 'DeliverymanController',
        'reward'    => 'RewardController',
    ]);

    Route::get('activity', 'ActivityController@index');
});


Route::group(['middleware' => ['auth:api', 'role:saleman|administrator'], 'prefix' => 'v1', 'namespace' => 'V1'], function () {

    Route::apiResource('sale', 'SaleController');
});

Route::group(['middleware' => ['auth:api', 'role:accountant|administrator'], 'prefix' => 'v1', 'namespace' => 'V1'], function () {

    Route::apiResource('transaction', 'SaleController');
    Route::apiResource('expense-category', 'ExpenseCategoryController');
});

// Route::get('purchase/export', 'V1\PurchaseController@export');


// ===================== Export ==================== //

Route::post('purchase/upload', 'V1\PurchaseController@import');
Route::get('purchase/export', 'V1\PurchaseController@export');
Route::get('purchase/export-pdf', 'V1\PurchaseController@export_pdf');

// User 
Route::get('user/export-csv', 'V1\UserController@export_csv');
Route::get('user/export-pdf', 'V1\UserController@export_pdf');

// Outlet
Route::get('outlet/export-csv', 'V1\OutletController@export_csv');
Route::get('outlet/export-pdf', 'V1\OutletController@export_pdf');

// Salesman
Route::get('salesman/export-csv', 'V1\SalesmanController@export_csv');
Route::get('salesman/export-pdf', 'V1\SalesmanController@export_pdf');

// Delivery Man
Route::get('deliveryman/export-csv', 'V1\DeliveryManController@export_csv');
Route::get('deliveryman/export-pdf', 'V1\DeliveryManController@export_pdf');

// Stockin
Route::get('stockin/export-csv', 'V1\StockInController@export_csv');
Route::get('stockin/export-pdf', 'V1\StockInController@export_pdf');
