import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cf0a429e = () => interopDefault(import('..\\resources\\nuxt\\pages\\calendar\\index.vue' /* webpackChunkName: "pages_calendar_index" */))
const _dfc1828a = () => interopDefault(import('..\\resources\\nuxt\\pages\\charge\\index.vue' /* webpackChunkName: "pages_charge_index" */))
const _b357691e = () => interopDefault(import('..\\resources\\nuxt\\pages\\history\\index.vue' /* webpackChunkName: "pages_history_index" */))
const _58e31839 = () => interopDefault(import('..\\resources\\nuxt\\pages\\match-history\\index.vue' /* webpackChunkName: "pages_match-history_index" */))
const _7a12907c = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\index.vue' /* webpackChunkName: "pages_outlet_index" */))
const _00c1a7e8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\payment-log\\index.vue' /* webpackChunkName: "pages_payment-log_index" */))
const _321cdb63 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supplier\\index.vue' /* webpackChunkName: "pages_supplier_index" */))
const _31da37ab = () => interopDefault(import('..\\resources\\nuxt\\pages\\supports\\index.vue' /* webpackChunkName: "pages_supports_index" */))
const _37d30598 = () => interopDefault(import('..\\resources\\nuxt\\pages\\tracking\\index.vue' /* webpackChunkName: "pages_tracking_index" */))
const _2b3ab595 = () => interopDefault(import('..\\resources\\nuxt\\pages\\accounting\\account.vue' /* webpackChunkName: "pages_accounting_account" */))
const _67b0e86a = () => interopDefault(import('..\\resources\\nuxt\\pages\\accounting\\balancesheet.vue' /* webpackChunkName: "pages_accounting_balancesheet" */))
const _76fc839e = () => interopDefault(import('..\\resources\\nuxt\\pages\\auth\\login.vue' /* webpackChunkName: "pages_auth_login" */))
const _110c14dd = () => interopDefault(import('..\\resources\\nuxt\\pages\\delivery-man\\add.vue' /* webpackChunkName: "pages_delivery-man_add" */))
const _a615f2dc = () => interopDefault(import('..\\resources\\nuxt\\pages\\delivery-man\\list.vue' /* webpackChunkName: "pages_delivery-man_list" */))
const _44734798 = () => interopDefault(import('..\\resources\\nuxt\\pages\\expense\\expense_categories.vue' /* webpackChunkName: "pages_expense_expense_categories" */))
const _2b7a1c1a = () => interopDefault(import('..\\resources\\nuxt\\pages\\expense\\expense_list.vue' /* webpackChunkName: "pages_expense_expense_list" */))
const _231578e9 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\attendance.vue' /* webpackChunkName: "pages_hrm_attendance" */))
const _efb9065c = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\department.vue' /* webpackChunkName: "pages_hrm_department" */))
const _9d4e0ed8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\employee\\index.vue' /* webpackChunkName: "pages_hrm_employee_index" */))
const _0ab48ff0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\holiday.vue' /* webpackChunkName: "pages_hrm_holiday" */))
const _67c40356 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\payroll.vue' /* webpackChunkName: "pages_hrm_payroll" */))
const _3c0ed9f2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\add-order.vue' /* webpackChunkName: "pages_order_add-order" */))
const _52e79728 = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\order-list.vue' /* webpackChunkName: "pages_order_order-list" */))
const _14a99790 = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\new.vue' /* webpackChunkName: "pages_outlet_new" */))
const _9093abd8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\add_biller.vue' /* webpackChunkName: "pages_people_add_biller" */))
const _3caf26ba = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\add_member.vue' /* webpackChunkName: "pages_people_add_member" */))
const _ec0c1e94 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\biller.vue' /* webpackChunkName: "pages_people_biller" */))
const _0ef2ed5c = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\member.vue' /* webpackChunkName: "pages_people_member" */))
const _3f4a46d2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\add_adjustment.vue' /* webpackChunkName: "pages_product_add_adjustment" */))
const _7c5f91a7 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\add-product.vue' /* webpackChunkName: "pages_product_add-product" */))
const _ae62ac92 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\brand\\index.vue' /* webpackChunkName: "pages_product_brand_index" */))
const _16f919f8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\category\\index.vue' /* webpackChunkName: "pages_product_category_index" */))
const _4477fc78 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\print-barcode.vue' /* webpackChunkName: "pages_product_print-barcode" */))
const _6d286b7a = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\product-list\\index.vue' /* webpackChunkName: "pages_product_product-list_index" */))
const _95e3dc3c = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\qty_adjustment.vue' /* webpackChunkName: "pages_product_qty_adjustment" */))
const _be844a08 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\stock-count.vue' /* webpackChunkName: "pages_product_stock-count" */))
const _3ac6fa5a = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\add_purchase.vue' /* webpackChunkName: "pages_purchase_add_purchase" */))
const _06abb1d2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\import_purchase.vue' /* webpackChunkName: "pages_purchase_import_purchase" */))
const _5c139a26 = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\purchase-list.vue' /* webpackChunkName: "pages_purchase_purchase-list" */))
const _c77c2670 = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\add.vue' /* webpackChunkName: "pages_quotation_add" */))
const _8e5eaae0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\quotations.vue' /* webpackChunkName: "pages_quotation_quotations" */))
const _43f88ce3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\best_seller.vue' /* webpackChunkName: "pages_report_best_seller" */))
const _fa0d9544 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report.vue' /* webpackChunkName: "pages_report_customer_report" */))
const _af9c0d38 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\index.vue' /* webpackChunkName: "pages_report_customer_report_index" */))
const _12ad1bd0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\payment.vue' /* webpackChunkName: "pages_report_customer_report_payment" */))
const _c39127c4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\quotation.vue' /* webpackChunkName: "pages_report_customer_report_quotation" */))
const _f84e3fe4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\return.vue' /* webpackChunkName: "pages_report_customer_report_return" */))
const _001ebdc6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\due_report.vue' /* webpackChunkName: "pages_report_due_report" */))
const _02b332f4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\payment_report.vue' /* webpackChunkName: "pages_report_payment_report" */))
const _857fca42 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\product_quantity_alert.vue' /* webpackChunkName: "pages_report_product_quantity_alert" */))
const _43ccdc6b = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\product_report.vue' /* webpackChunkName: "pages_report_product_report" */))
const _45062c5b = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\purchase_report.vue' /* webpackChunkName: "pages_report_purchase_report" */))
const _1b4eb9d5 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\sale_report.vue' /* webpackChunkName: "pages_report_sale_report" */))
const _63e4f954 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\summary_report.vue' /* webpackChunkName: "pages_report_summary_report" */))
const _5050dab0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report.vue' /* webpackChunkName: "pages_report_supplier_report" */))
const _39f1d85c = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\index.vue' /* webpackChunkName: "pages_report_supplier_report_index" */))
const _5ebcadf4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\payment.vue' /* webpackChunkName: "pages_report_supplier_report_payment" */))
const _4a04c0e8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\quotation.vue' /* webpackChunkName: "pages_report_supplier_report_quotation" */))
const _b8b1d940 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\return.vue' /* webpackChunkName: "pages_report_supplier_report_return" */))
const _e1e4185e = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report.vue' /* webpackChunkName: "pages_report_user_report" */))
const _6712a391 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\index.vue' /* webpackChunkName: "pages_report_user_report_index" */))
const _7b296257 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\expense.vue' /* webpackChunkName: "pages_report_user_report_expense" */))
const _ffef75f6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\payment.vue' /* webpackChunkName: "pages_report_user_report_payment" */))
const _d6dbeeb8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\payroll.vue' /* webpackChunkName: "pages_report_user_report_payroll" */))
const _3353e892 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\purchase.vue' /* webpackChunkName: "pages_report_user_report_purchase" */))
const _4b2d37cb = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\quotation.vue' /* webpackChunkName: "pages_report_user_report_quotation" */))
const _217c167c = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\transfer.vue' /* webpackChunkName: "pages_report_user_report_transfer" */))
const _24e1ab52 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report.vue' /* webpackChunkName: "pages_report_warehouse_report" */))
const _7673ab6a = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\index.vue' /* webpackChunkName: "pages_report_warehouse_report_index" */))
const _3a162291 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\expense.vue' /* webpackChunkName: "pages_report_warehouse_report_expense" */))
const _51ff2f98 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\purchase.vue' /* webpackChunkName: "pages_report_warehouse_report_purchase" */))
const _01ead185 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\quotation.vue' /* webpackChunkName: "pages_report_warehouse_report_quotation" */))
const _0c6a67f2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\return.vue' /* webpackChunkName: "pages_report_warehouse_report_return" */))
const _39f21abc = () => interopDefault(import('..\\resources\\nuxt\\pages\\role\\role-list.vue' /* webpackChunkName: "pages_role_role-list" */))
const _1b6fe65f = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\add_sale.vue' /* webpackChunkName: "pages_sale_add_sale" */))
const _caa0587a = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\coupons.vue' /* webpackChunkName: "pages_sale_coupons" */))
const _4af4c5ae = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\delivery.vue' /* webpackChunkName: "pages_sale_delivery" */))
const _517356f5 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\gift_card.vue' /* webpackChunkName: "pages_sale_gift_card" */))
const _7709c257 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\import_sale.vue' /* webpackChunkName: "pages_sale_import_sale" */))
const _50b0ae90 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\pos\\index.vue' /* webpackChunkName: "pages_sale_pos_index" */))
const _6b23cbcc = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\sale-list.vue' /* webpackChunkName: "pages_sale_sale-list" */))
const _4325bda0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\add.vue' /* webpackChunkName: "pages_salesman_add" */))
const _e894f6c2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\list.vue' /* webpackChunkName: "pages_salesman_list" */))
const _b29027b8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\setting\\system-settings.vue' /* webpackChunkName: "pages_setting_system-settings" */))
const _2cbb4e82 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\add.vue' /* webpackChunkName: "pages_stock-in_add" */))
const _072d018d = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\list.vue' /* webpackChunkName: "pages_stock-in_list" */))
const _2288e2c6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\add.vue' /* webpackChunkName: "pages_stock-out_add" */))
const _f596765c = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\list.vue' /* webpackChunkName: "pages_stock-out_list" */))
const _1a2495f2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supplier\\add.vue' /* webpackChunkName: "pages_supplier_add" */))
const _2b7c0fb4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\tracking\\create.vue' /* webpackChunkName: "pages_tracking_create" */))
const _e5ad85b2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\add_transfer.vue' /* webpackChunkName: "pages_transfer_add_transfer" */))
const _63c27857 = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\import_transfer.vue' /* webpackChunkName: "pages_transfer_import_transfer" */))
const _529c8e0c = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\transfers.vue' /* webpackChunkName: "pages_transfer_transfers" */))
const _3d06b635 = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\add-user.vue' /* webpackChunkName: "pages_user_add-user" */))
const _83f1a54a = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\profile.vue' /* webpackChunkName: "pages_user_profile" */))
const _34c57f12 = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\user-list.vue' /* webpackChunkName: "pages_user_user-list" */))
const _6d226e02 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\generalsettings.vue' /* webpackChunkName: "pages_webcontrol_generalsettings" */))
const _20a8cbcc = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\sms-api.vue' /* webpackChunkName: "pages_webcontrol_sms-api" */))
const _25418a94 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\template.vue' /* webpackChunkName: "pages_webcontrol_template" */))
const _1db7ba7b = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\terms.vue' /* webpackChunkName: "pages_webcontrol_terms" */))
const _7014f436 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\about.vue' /* webpackChunkName: "pages_webinterface_about" */))
const _b9af1610 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\contact.vue' /* webpackChunkName: "pages_webinterface_contact" */))
const _38c2ac73 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\footer.vue' /* webpackChunkName: "pages_webinterface_footer" */))
const _60c7a483 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\logo.vue' /* webpackChunkName: "pages_webinterface_logo" */))
const _781e0b92 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\menu.vue' /* webpackChunkName: "pages_webinterface_menu" */))
const _2f5423ee = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\slide.vue' /* webpackChunkName: "pages_webinterface_slide" */))
const _74e2d545 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\social.vue' /* webpackChunkName: "pages_webinterface_social" */))
const _f70d0f96 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\team.vue' /* webpackChunkName: "pages_webinterface_team" */))
const _fee60412 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\testimonial.vue' /* webpackChunkName: "pages_webinterface_testimonial" */))
const _2075c8c4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\tree-image.vue' /* webpackChunkName: "pages_webinterface_tree-image" */))
const _8367a8d2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\withdraw\\log.vue' /* webpackChunkName: "pages_withdraw_log" */))
const _fd7c9544 = () => interopDefault(import('..\\resources\\nuxt\\pages\\withdraw\\method.vue' /* webpackChunkName: "pages_withdraw_method" */))
const _eacbd4fe = () => interopDefault(import('..\\resources\\nuxt\\pages\\withdraw\\requests.vue' /* webpackChunkName: "pages_withdraw_requests" */))
const _bd0b36ac = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\employee\\create.vue' /* webpackChunkName: "pages_hrm_employee_create" */))
const _a78ae7b4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\category\\add_category.vue' /* webpackChunkName: "pages_product_category_add_category" */))
const _39e60627 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\create.vue' /* webpackChunkName: "pages_return_return-purchase_create" */))
const _0fdca7e0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\view.vue' /* webpackChunkName: "pages_return_return-purchase_view" */))
const _1e05a16d = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\create.vue' /* webpackChunkName: "pages_return_return-sale_create" */))
const _38693e54 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\view.vue' /* webpackChunkName: "pages_return_return-sale_view" */))
const _4501b906 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\pos\\create.vue' /* webpackChunkName: "pages_sale_pos_create" */))
const _192c0440 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\product-list\\_id\\index.vue' /* webpackChunkName: "pages_product_product-list__id_index" */))
const _3907a7fa = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\_id\\index.vue' /* webpackChunkName: "pages_return_return-purchase__id_index" */))
const _2c30b449 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\_id\\index.vue' /* webpackChunkName: "pages_return_return-sale__id_index" */))
const _7c95513c = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\pos\\_id\\index.vue' /* webpackChunkName: "pages_sale_pos__id_index" */))
const _78aa2d28 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\product-list\\_id\\edit.vue' /* webpackChunkName: "pages_product_product-list__id_edit" */))
const _ed4e2a2e = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\_id\\edit.vue' /* webpackChunkName: "pages_return_return-purchase__id_edit" */))
const _f9217c3a = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\_id\\edit.vue' /* webpackChunkName: "pages_return_return-sale__id_edit" */))
const _42dcc8b9 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\category\\_id\\_edit.vue' /* webpackChunkName: "pages_product_category__id__edit" */))
const _4d08051a = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\_id\\index.vue' /* webpackChunkName: "pages_people__id_index" */))
const _2f3e18cc = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\_id\\index.vue' /* webpackChunkName: "pages_purchase__id_index" */))
const _25e4f7fe = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\_id\\index.vue' /* webpackChunkName: "pages_quotation__id_index" */))
const _651b24dc = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\_id\\index.vue' /* webpackChunkName: "pages_sale__id_index" */))
const _3466c100 = () => interopDefault(import('..\\resources\\nuxt\\pages\\delivery-man\\_id\\edit.vue' /* webpackChunkName: "pages_delivery-man__id_edit" */))
const _f0e9c8a0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\_id\\detail.vue' /* webpackChunkName: "pages_order__id_detail" */))
const _775adaae = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\_id\\edit.vue' /* webpackChunkName: "pages_order__id_edit" */))
const _e062780a = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\_id\\detail.vue' /* webpackChunkName: "pages_outlet__id_detail" */))
const _952c5c98 = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\_id\\edit.vue' /* webpackChunkName: "pages_outlet__id_edit" */))
const _3d1089e0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\_id\\add_member.vue' /* webpackChunkName: "pages_people__id_add_member" */))
const _28b1c100 = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\_id\\edit.vue' /* webpackChunkName: "pages_purchase__id_edit" */))
const _605d9b2b = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\_id\\edit.vue' /* webpackChunkName: "pages_quotation__id_edit" */))
const _6fdcbb7a = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\_id\\edit.vue' /* webpackChunkName: "pages_sale__id_edit" */))
const _57d9e193 = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\_id\\edit.vue' /* webpackChunkName: "pages_salesman__id_edit" */))
const _37aac5f4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\_id\\show.vue' /* webpackChunkName: "pages_salesman__id_show" */))
const _0791d928 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\_id\\detail.vue' /* webpackChunkName: "pages_stock-in__id_detail" */))
const _c45d6d36 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\_id\\edit.vue' /* webpackChunkName: "pages_stock-in__id_edit" */))
const _7d2f0887 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\_id\\detail.vue' /* webpackChunkName: "pages_stock-out__id_detail" */))
const _02e9c940 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\_id\\edit.vue' /* webpackChunkName: "pages_stock-out__id_edit" */))
const _17a33cd5 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supplier\\_id\\edit.vue' /* webpackChunkName: "pages_supplier__id_edit" */))
const _d806c654 = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\_id\\edit.vue' /* webpackChunkName: "pages_transfer__id_edit" */))
const _1d369776 = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\_id\\edit.vue' /* webpackChunkName: "pages_user__id_edit" */))
const _54f5bdce = () => interopDefault(import('..\\resources\\nuxt\\pages\\tracking\\_id\\_edit.vue' /* webpackChunkName: "pages_tracking__id__edit" */))
const _50c69a93 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\_biller\\_id\\edit.vue' /* webpackChunkName: "pages_people__biller__id_edit" */))
const _e3976b22 = () => interopDefault(import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/calendar",
    component: _59ebca65,
    name: "calendar"
  }, {
    path: "/charge",
    component: _2f00f122,
    name: "charge"
  }, {
    path: "/history",
    component: _59fd193d,
    name: "history"
  }, {
    path: "/match-history",
    component: _33755d05,
    name: "match-history"
  }, {
    path: "/outlet",
    component: _7a12907c,
    name: "outlet"
  }, {
    path: "/payment-log",
    component: _1712a098,
    name: "payment-log"
  }, {
    path: "/supplier",
    component: _18e471d2,
    name: "supplier"
  }, {
    path: "/supports",
    component: _1969b942,
    name: "supports"
  }, {
    path: "/tracking",
    component: _37d30598,
    name: "tracking"
  }, {
    path: "/accounting/account",
    component: _a3b2b16e,
    name: "accounting-account"
  }, {
    path: "/accounting/balancesheet",
    component: _519aead2,
    name: "accounting-balancesheet"
  }, {
    path: "/auth/login",
    component: _247f6952,
    name: "auth-login"
  }, {
    path: "/delivery-man/add",
    component: _39f0e391,
    name: "delivery-man-add"
  }, {
    path: "/delivery-man/list",
    component: _beabe344,
    name: "delivery-man-list"
  }, {
    path: "/expense/expense_categories",
    component: _58fc454c,
    name: "expense-expense_categories"
  }, {
    path: "/expense/expense_list",
    component: _b99f1e64,
    name: "expense-expense_list"
  }, {
    path: "/hrm/attendance",
    component: _36f336c6,
    name: "hrm-attendance"
  }, {
    path: "/hrm/department",
    component: _49946886,
    name: "hrm-department"
  }, {
    path: "/hrm/employee",
    component: _e8298540,
    name: "hrm-employee"
  }, {
    path: "/hrm/holiday",
    component: _0500ee58,
    name: "hrm-holiday"
  }, {
    path: "/hrm/payroll",
    component: _621061be,
    name: "hrm-payroll"
  }, {
    path: "/order/add-order",
    component: _4ea51dd3,
    name: "order-add-order"
  }, {
    path: "/order/order-list",
    component: _7bcc65dc,
    name: "order-order-list"
  }, {
    path: "/outlet/new",
    component: _14a99790,
    name: "outlet-new"
  }, {
    path: "/people/add_biller",
    component: _a9299c40,
    name: "people-add_biller"
  }, {
    path: "/people/add_member",
    component: _30642e86,
    name: "people-add_member"
  }, {
    path: "/people/biller",
    component: _3da2be82,
    name: "people-biller"
  }, {
    path: "/people/member",
    component: _7ac889b0,
    name: "people-member"
  }, {
    path: "/product/add_adjustment",
    component: _43ced44b,
    name: "product-add_adjustment"
  }, {
    path: "/product/add-product",
    component: _56f1d673,
    name: "product-add-product"
  }, {
    path: "/product/brand",
    component: _2084fe6b,
    name: "product-brand"
  }, {
    path: "/product/category",
    component: _220418c4,
    name: "product-category"
  }, {
    path: "/product/print-barcode",
    component: _5cd84390,
    name: "product-print-barcode"
  }, {
    path: "/product/product-list",
    component: _2c81b774,
    name: "product-product-list"
  }, {
    path: "/product/qty_adjustment",
    component: _18820996,
    name: "product-qty_adjustment"
  }, {
    path: "/product/stock-count",
    component: _7b501fc8,
    name: "product-stock-count"
  }, {
    path: "/purchase/add_purchase",
    component: _61b0c49f,
    name: "purchase-add_purchase"
  }, {
    path: "/purchase/import_purchase",
    component: _52ff01cb,
    name: "purchase-import_purchase"
  }, {
    path: "/purchase/purchase-list",
    component: _80f0dc4c,
    name: "purchase-purchase-list"
  }, {
    path: "/quotation/add",
    component: _4feaba94,
    name: "quotation-add"
  }, {
    path: "/quotation/quotations",
    component: _3086ff44,
    name: "quotation-quotations"
  }, {
    path: "/report/best_seller",
    component: _723702d2,
    name: "report-best_seller"
  }, {
    path: "/report/customer_report",
    component: _3325a5dc,
    children: [{
      path: "",
      component: _59fdaf30,
      name: "report-customer_report"
    }, {
      path: "payment",
      component: _645ee4e4,
      name: "report-customer_report-payment"
    }, {
      path: "quotation",
      component: _745b5bea,
      name: "report-customer_report-quotation"
    }, {
      path: "return",
      component: _0b83e3c2,
      name: "report-customer_report-return"
    }]
  }, {
    path: "/report/due_report",
    component: _185874dc,
    name: "report-due_report"
  }, {
    path: "/report/payment_report",
    component: _fc711680,
    name: "report-payment_report"
  }, {
    path: "/report/product_quantity_alert",
    component: _6f0bd0ab,
    name: "report-product_quantity_alert"
  }, {
    path: "/report/product_report",
    component: _7a3dc392,
    name: "report-product_report"
  }, {
    path: "/report/purchase_report",
    component: _af0bb7e2,
    name: "report-purchase_report"
  }, {
    path: "/report/sale_report",
    component: _c38aa8ee,
    name: "report-sale_report"
  }, {
    path: "/report/summary_report",
    component: _3a0d89c0,
    name: "report-summary_report"
  }, {
    path: "/report/supplier_report",
    component: _98765b38,
    children: [{
      path: "",
      component: _d65a6cc4,
      name: "report-supplier_report"
    }, {
      path: "payment",
      component: _3e571bd2,
      name: "report-supplier_report-payment"
    }, {
      path: "quotation",
      component: _9dbce150,
      name: "report-supplier_report-quotation"
    }, {
      path: "return",
      component: _2b521714,
      name: "report-supplier_report-return"
    }]
  }, {
    path: "/report/user_report",
    component: _11f9e585,
    children: [{
      path: "",
      component: _494dc146,
      name: "report-user_report"
    }, {
      path: "expense",
      component: _107fc9ba,
      name: "report-user_report-expense"
    }, {
      path: "payment",
      component: _06c2045e,
      name: "report-user_report-payment"
    }, {
      path: "payroll",
      component: _1128c170,
      name: "report-user_report-payroll"
    }, {
      path: "purchase",
      component: _49944946,
      name: "report-user_report-purchase"
    }, {
      path: "quotation",
      component: _060e24d2,
      name: "report-user_report-quotation"
    }, {
      path: "transfer",
      component: _37bc7730,
      name: "report-user_report-transfer"
    }]
  }, {
    path: "/report/warehouse_report",
    component: _0ecbadba,
    children: [{
      path: "",
      component: _4c712dff,
      name: "report-warehouse_report"
    }, {
      path: "expense",
      component: _f9e1ed76,
      name: "report-warehouse_report-expense"
    }, {
      path: "purchase",
      component: _28231f64,
      name: "report-warehouse_report-purchase"
    }, {
      path: "quotation",
      component: _1f76498e,
      name: "report-warehouse_report-quotation"
    }, {
      path: "return",
      component: _67803ed3,
      name: "report-warehouse_report-return"
    }]
  }, {
    path: "/role/role-list",
    component: _0939f320,
    name: "role-role-list"
  }, {
    path: "/sale/add_sale",
    component: _61ce97aa,
    name: "sale-add_sale"
  }, {
    path: "/sale/coupons",
    component: _19dfc712,
    name: "sale-coupons"
  }, {
    path: "/sale/delivery",
    component: _02c4d90c,
    name: "sale-delivery"
  }, {
    path: "/sale/gift_card",
    component: _12e442a9,
    name: "sale-gift_card"
  }, {
    path: "/sale/import_sale",
    component: _c022ddea,
    name: "sale-import_sale"
  }, {
    path: "/sale/pos",
    component: _44543384,
    name: "sale-pos"
  }, {
    path: "/sale/sale-list",
    component: _e841f464,
    name: "sale-sale-list"
  }, {
    path: "/salesman/add",
    component: _36cd69e4,
    name: "salesman-add"
  }, {
    path: "/salesman/list",
    component: _3f5e526b,
    name: "salesman-list"
  }, {
    path: "/setting/system-settings",
    component: _9c7a2a20,
    name: "setting-system-settings"
  }, {
    path: "/stock-in/add",
    component: _f5c8d194,
    name: "stock-in-add"
  }, {
    path: "/stock-in/list",
    component: _8a54614e,
    name: "stock-in-list"
  }, {
    path: "/stock-out/add",
    component: _bb37472e,
    name: "stock-out-add"
  }, {
    path: "/stock-out/list",
    component: _46a5b086,
    name: "stock-out-list"
  }, {
    path: "/supplier/add",
    component: _7284dea6,
    name: "supplier-add"
  }, {
    path: "/tracking/create",
    component: _2b7c0fb4,
    name: "tracking-create"
  }, {
    path: "/transfer/add_transfer",
    component: _0c3d7ef3,
    name: "transfer-add_transfer"
  }, {
    path: "/transfer/import_transfer",
    component: _8bd159ea,
    name: "transfer-import_transfer"
  }, {
    path: "/transfer/transfers",
    component: _599daaae,
    name: "transfer-transfers"
  }, {
    path: "/user/add-user",
    component: _1ea0f7fe,
    name: "user-add-user"
  }, {
    path: "/user/profile",
    component: _1667760f,
    name: "user-profile"
  }, {
    path: "/user/user-list",
    component: _13932a74,
    name: "user-user-list"
  }, {
    path: "/webcontrol/generalsettings",
    component: _4410729a,
    name: "webcontrol-generalsettings"
  }, {
    path: "/webcontrol/sms-api",
    component: _72978bce,
    name: "webcontrol-sms-api"
  }, {
    path: "/webcontrol/template",
    component: _701d00fc,
    name: "webcontrol-template"
  }, {
    path: "/webcontrol/terms",
    component: _469c892f,
    name: "webcontrol-terms"
  }, {
    path: "/webinterface/about",
    component: _4ae17799,
    name: "webinterface-about"
  }, {
    path: "/webinterface/contact",
    component: _1adec9ac,
    name: "webinterface-contact"
  }, {
    path: "/webinterface/footer",
    component: _1354f13f,
    name: "webinterface-footer"
  }, {
    path: "/webinterface/logo",
    component: _547cac4f,
    name: "webinterface-logo"
  }, {
    path: "/webinterface/menu",
    component: _90b3fbfa,
    name: "webinterface-menu"
  }, {
    path: "/webinterface/slide",
    component: _6b41dfbd,
    name: "webinterface-slide"
  }, {
    path: "/webinterface/social",
    component: _4f751a11,
    name: "webinterface-social"
  }, {
    path: "/webinterface/team",
    component: _782e8001,
    name: "webinterface-team"
  }, {
    path: "/webinterface/testimonial",
    component: _523c4eaa,
    name: "webinterface-testimonial"
  }, {
    path: "/webinterface/tree-image",
    component: _2b80c790,
    name: "webinterface-tree-image"
  }, {
    path: "/withdraw/log",
    component: _16ac744b,
    name: "withdraw-log"
  }, {
    path: "/withdraw/method",
    component: _24237fac,
    name: "withdraw-method"
  }, {
    path: "/withdraw/requests",
    component: _7e4f1d4d,
    name: "withdraw-requests"
  }, {
    path: "/hrm/employee/create",
    component: _1930b95e,
    name: "hrm-employee-create"
  }, {
    path: "/product/category/add_category",
    component: _33e58fda,
    name: "product-category-add_category"
  }, {
    path: "/return/return-purchase/create",
    component: _7cddec4a,
    name: "return-return-purchase-create"
  }, {
    path: "/return/return-purchase/view",
    component: _0e520cc4,
    name: "return-return-purchase-view"
  }, {
    path: "/return/return-sale/create",
    component: _328e9f21,
    name: "return-return-sale-create"
  }, {
    path: "/return/return-sale/view",
    component: _3a203b8a,
    name: "return-return-sale-view"
  }, {
    path: "/sale/pos/create",
    component: _6de687ba,
    name: "sale-pos-create"
  }, {
    path: "/product/product-list/:id?",
    component: _3c62e494,
    name: "product-product-list-id"
  }, {
    path: "/return/return-purchase/:id?",
    component: _5c539492,
    name: "return-return-purchase-id"
  }, {
    path: "/return/return-sale/:id?",
    component: _98489006,
    name: "return-return-sale-id"
  }, {
    path: "/sale/pos/:id",
    component: _396bac16,
    name: "sale-pos-id"
  }, {
    path: "/product/product-list/:id?/edit",
    component: _31605c38,
    name: "product-product-list-id-edit"
  }, {
    path: "/return/return-purchase/:id?/edit",
    component: _5f7cdab5,
    name: "return-return-purchase-id-edit"
  }, {
    path: "/return/return-sale/:id?/edit",
    component: _353af7af,
    name: "return-return-sale-id-edit"
  }, {
    path: "/product/category/:id/:edit?",
    component: _591d296d,
    name: "product-category-id-edit"
  }, {
    path: "/people/:id?",
    component: _40bd0ce6,
    name: "people-id"
  }, {
    path: "/purchase/:id?",
    component: _09d05d98,
    name: "purchase-id"
  }, {
    path: "/quotation/:id?",
    component: _64c3d8b5,
    name: "quotation-id"
  }, {
    path: "/sale/:id?",
    component: _3a1ef85e,
    name: "sale-id"
  }, {
    path: "/delivery-man/:id?/edit",
    component: _49409734,
    name: "delivery-man-id-edit"
  }, {
    path: "/order/:id?/detail",
    component: _7b40237c,
    name: "order-id-detail"
  }, {
    path: "/order/:id?/edit",
    component: _30ff1d75,
    name: "order-id-edit"
  }, {
    path: "/outlet/:id/detail",
    component: _e062780a,
    name: "outlet-id-detail"
  }, {
    path: "/outlet/:id/edit",
    component: _952c5c98,
    name: "outlet-id-edit"
  }, {
    path: "/people/:id?/add_member",
    component: _bef6fcd8,
    name: "people-id-add_member"
  }, {
    path: "/purchase/:id?/edit",
    component: _a8c49a98,
    name: "purchase-id-edit"
  }, {
    path: "/quotation/:id?/edit",
    component: _3aefdff7,
    name: "quotation-id-edit"
  }, {
    path: "/sale/:id?/edit",
    component: _314da72e,
    name: "sale-id-edit"
  }, {
    path: "/salesman/:id?/edit",
    component: _4a745972,
    name: "salesman-id-edit"
  }, {
    path: "/salesman/:id?/show",
    component: _67168eba,
    name: "salesman-id-show"
  }, {
    path: "/stock-in/:id?/detail",
    component: _73ed6820,
    name: "stock-in-id-detail"
  }, {
    path: "/stock-in/:id?/edit",
    component: _20bd3b19,
    name: "stock-in-id-edit"
  }, {
    path: "/stock-out/:id?/detail",
    component: _07796b5a,
    name: "stock-out-id-detail"
  }, {
    path: "/stock-out/:id?/edit",
    component: _4507e3e8,
    name: "stock-out-id-edit"
  }, {
    path: "/supplier/:id/edit",
    component: _cae1a2ee,
    name: "supplier-id-edit"
  }, {
    path: "/transfer/:id?/edit",
    component: _16e88e8a,
    name: "transfer-id-edit"
  }, {
    path: "/user/:id?/edit",
    component: _42b0f9ac,
    name: "user-id-edit"
  }, {
    path: "/tracking/:id/:edit?",
    component: _54f5bdce,
    name: "tracking-id-edit"
  }, {
    path: "/people/:biller?/:id?/edit",
    component: _75e5d342,
    name: "people-biller-id-edit"
  }, {
    path: "/",
    component: _8b1af1ba,
    name: "index"
  }, {
    path: "/__laravel_nuxt__",
    component: _8b1af1ba,
    name: "__laravel_nuxt__"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
