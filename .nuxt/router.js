import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _331f1722 = () => interopDefault(import('..\\resources\\nuxt\\pages\\calendar\\index.vue' /* webpackChunkName: "pages_calendar_index" */))
const _b2ae4128 = () => interopDefault(import('..\\resources\\nuxt\\pages\\charge\\index.vue' /* webpackChunkName: "pages_charge_index" */))
const _60fec0e0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\history\\index.vue' /* webpackChunkName: "pages_history_index" */))
const _e530cbaa = () => interopDefault(import('..\\resources\\nuxt\\pages\\Location\\index.vue' /* webpackChunkName: "pages_Location_index" */))
const _14f57e68 = () => interopDefault(import('..\\resources\\nuxt\\pages\\match-history\\index.vue' /* webpackChunkName: "pages_match-history_index" */))
const _4cff4f1a = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\index.vue' /* webpackChunkName: "pages_outlet_index" */))
const _65746452 = () => interopDefault(import('..\\resources\\nuxt\\pages\\payment-log\\index.vue' /* webpackChunkName: "pages_payment-log_index" */))
const _667dd858 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supplier\\index.vue' /* webpackChunkName: "pages_supplier_index" */))
const _67031fc8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supports\\index.vue' /* webpackChunkName: "pages_supports_index" */))
const _218964f4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\accounting\\account.vue' /* webpackChunkName: "pages_accounting_account" */))
const _61a57b0c = () => interopDefault(import('..\\resources\\nuxt\\pages\\accounting\\balancesheet.vue' /* webpackChunkName: "pages_accounting_balancesheet" */))
const _28289c8f = () => interopDefault(import('..\\resources\\nuxt\\pages\\auth\\login.vue' /* webpackChunkName: "pages_auth_login" */))
const _d8f815e4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\delivery-man\\add.vue' /* webpackChunkName: "pages_delivery-man_add" */))
const _79792c81 = () => interopDefault(import('..\\resources\\nuxt\\pages\\delivery-man\\list.vue' /* webpackChunkName: "pages_delivery-man_list" */))
const _0b4d42ee = () => interopDefault(import('..\\resources\\nuxt\\pages\\expense\\expense_categories.vue' /* webpackChunkName: "pages_expense_expense_categories" */))
const _1c97086a = () => interopDefault(import('..\\resources\\nuxt\\pages\\expense\\expense_list.vue' /* webpackChunkName: "pages_expense_expense_list" */))
const _848c9d4c = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\attendance.vue' /* webpackChunkName: "pages_hrm_attendance" */))
const _22c7b543 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\department.vue' /* webpackChunkName: "pages_hrm_department" */))
const _6d6b5ec3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\employee\\index.vue' /* webpackChunkName: "pages_hrm_employee_index" */))
const _6efcbd37 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\holiday.vue' /* webpackChunkName: "pages_hrm_holiday" */))
const _40750384 = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\payroll.vue' /* webpackChunkName: "pages_hrm_payroll" */))
const _473ff5f3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\Location\\create.vue' /* webpackChunkName: "pages_Location_create" */))
const _c8492e94 = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\add-order.vue' /* webpackChunkName: "pages_order_add-order" */))
const _5541114e = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\order-list.vue' /* webpackChunkName: "pages_order_order-list" */))
const _74549efe = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\new.vue' /* webpackChunkName: "pages_outlet_new" */))
const _f78b5ffa = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\add_biller.vue' /* webpackChunkName: "pages_people_add_biller" */))
const _09334ca9 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\add_member.vue' /* webpackChunkName: "pages_people_add_member" */))
const _44a46625 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\biller.vue' /* webpackChunkName: "pages_people_biller" */))
const _6cc53a6a = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\member.vue' /* webpackChunkName: "pages_people_member" */))
const _017c1408 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\add_adjustment.vue' /* webpackChunkName: "pages_product_add_adjustment" */))
const _3871f7d6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\add-product.vue' /* webpackChunkName: "pages_product_add-product" */))
const _6f090968 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\brand\\index.vue' /* webpackChunkName: "pages_product_brand_index" */))
const _19fed0a7 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\category\\index.vue' /* webpackChunkName: "pages_product_category_index" */))
const _4254cf9a = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\print-barcode.vue' /* webpackChunkName: "pages_product_print-barcode" */))
const _740532a9 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\product-list\\index.vue' /* webpackChunkName: "pages_product_product-list_index" */))
const _53a16d5a = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\qty_adjustment.vue' /* webpackChunkName: "pages_product_qty_adjustment" */))
const _5cd0412b = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\stock-count.vue' /* webpackChunkName: "pages_product_stock-count" */))
const _38a3cd7c = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\add_purchase.vue' /* webpackChunkName: "pages_purchase_add_purchase" */))
const _5a5b4648 = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\import_purchase.vue' /* webpackChunkName: "pages_purchase_import_purchase" */))
const _7d34d197 = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\purchase-list.vue' /* webpackChunkName: "pages_purchase_purchase-list" */))
const _56ec6237 = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\add.vue' /* webpackChunkName: "pages_quotation_add" */))
const _7f0b0a41 = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\quotations.vue' /* webpackChunkName: "pages_quotation_quotations" */))
const _07f924d4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\best_seller.vue' /* webpackChunkName: "pages_report_best_seller" */))
const _b7cb2662 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report.vue' /* webpackChunkName: "pages_report_customer_report" */))
const _6af9b0d3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\index.vue' /* webpackChunkName: "pages_report_customer_report_index" */))
const _266109c7 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\payment.vue' /* webpackChunkName: "pages_report_customer_report_payment" */))
const _833057e6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\quotation.vue' /* webpackChunkName: "pages_report_customer_report_quotation" */))
const _1a08167f = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\customer_report\\return.vue' /* webpackChunkName: "pages_report_customer_report_return" */))
const _66ba3896 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\due_report.vue' /* webpackChunkName: "pages_report_due_report" */))
const _03c4c963 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\payment_report.vue' /* webpackChunkName: "pages_report_payment_report" */))
const _fff05b64 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\product_quantity_alert.vue' /* webpackChunkName: "pages_report_product_quantity_alert" */))
const _44de72da = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\product_report.vue' /* webpackChunkName: "pages_report_product_report" */))
const _662763cc = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\purchase_report.vue' /* webpackChunkName: "pages_report_purchase_report" */))
const _41615c74 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\sale_report.vue' /* webpackChunkName: "pages_report_sale_report" */))
const _64f68fc3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\summary_report.vue' /* webpackChunkName: "pages_report_summary_report" */))
const _71721221 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report.vue' /* webpackChunkName: "pages_report_supplier_report" */))
const _b462697e = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\index.vue' /* webpackChunkName: "pages_report_supplier_report_index" */))
const _005940b5 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\payment.vue' /* webpackChunkName: "pages_report_supplier_report_payment" */))
const _09a3f10a = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\quotation.vue' /* webpackChunkName: "pages_report_supplier_report_quotation" */))
const _39d649d1 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\supplier_report\\return.vue' /* webpackChunkName: "pages_report_supplier_report_return" */))
const _530e8bc2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report.vue' /* webpackChunkName: "pages_report_user_report" */))
const _80f52b00 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\index.vue' /* webpackChunkName: "pages_report_user_report_index" */))
const _fbf3acf4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\expense.vue' /* webpackChunkName: "pages_report_user_report_expense" */))
const _f235e798 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\payment.vue' /* webpackChunkName: "pages_report_user_report_payment" */))
const _c922605a = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\payroll.vue' /* webpackChunkName: "pages_report_user_report_payroll" */))
const _08100743 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\purchase.vue' /* webpackChunkName: "pages_report_user_report_purchase" */))
const _0df4ef3a = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\quotation.vue' /* webpackChunkName: "pages_report_user_report_quotation" */))
const _138f95a6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\user_report\\transfer.vue' /* webpackChunkName: "pages_report_user_report_transfer" */))
const _1ed63df4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report.vue' /* webpackChunkName: "pages_report_warehouse_report" */))
const _5af560bc = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\index.vue' /* webpackChunkName: "pages_report_warehouse_report_index" */))
const _015180c2 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\expense.vue' /* webpackChunkName: "pages_report_warehouse_report_expense" */))
const _722f9787 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\purchase.vue' /* webpackChunkName: "pages_report_warehouse_report_purchase" */))
const _30713114 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\quotation.vue' /* webpackChunkName: "pages_report_warehouse_report_quotation" */))
const _298263b6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\report\\warehouse_report\\return.vue' /* webpackChunkName: "pages_report_warehouse_report_return" */))
const _56d359a6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\role\\role-list.vue' /* webpackChunkName: "pages_role_role-list" */))
const _53cb4864 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\add_sale.vue' /* webpackChunkName: "pages_sale_add_sale" */))
const _9d8d1718 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\coupons.vue' /* webpackChunkName: "pages_sale_coupons" */))
const _059f3b1d = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\delivery.vue' /* webpackChunkName: "pages_sale_delivery" */))
const _27d0e134 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\gift_card.vue' /* webpackChunkName: "pages_sale_gift_card" */))
const _0cfcbaf0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\import_sale.vue' /* webpackChunkName: "pages_sale_import_sale" */))
const _dceb0332 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\pos\\index.vue' /* webpackChunkName: "pages_sale_pos_index" */))
const _6512528b = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\sale-list.vue' /* webpackChunkName: "pages_sale_sale-list" */))
const _16127c3e = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\add.vue' /* webpackChunkName: "pages_salesman_add" */))
const _465ffa0e = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\list.vue' /* webpackChunkName: "pages_salesman_list" */))
const _ac84ba5a = () => interopDefault(import('..\\resources\\nuxt\\pages\\setting\\system-settings.vue' /* webpackChunkName: "pages_setting_system-settings" */))
const _4344ef33 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\add.vue' /* webpackChunkName: "pages_stock-in_add" */))
const _7c511208 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\list.vue' /* webpackChunkName: "pages_stock-in_list" */))
const _ad33f7e8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\add.vue' /* webpackChunkName: "pages_stock-out_add" */))
const _1fd8fd43 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\list.vue' /* webpackChunkName: "pages_stock-out_list" */))
const _30ae36a3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supplier\\add.vue' /* webpackChunkName: "pages_supplier_add" */))
const _e38a58d4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\add_transfer.vue' /* webpackChunkName: "pages_transfer_add_transfer" */))
const _7d18d0f0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\import_transfer.vue' /* webpackChunkName: "pages_transfer_import_transfer" */))
const _ca9b5e2a = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\transfers.vue' /* webpackChunkName: "pages_transfer_transfers" */))
const _109da8b8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\add-user.vue' /* webpackChunkName: "pages_user_add-user" */))
const _56de63e8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\profile.vue' /* webpackChunkName: "pages_user_profile" */))
const _612c90fa = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\user-list.vue' /* webpackChunkName: "pages_user_user-list" */))
const _7f54dff0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\generalsettings.vue' /* webpackChunkName: "pages_webcontrol_generalsettings" */))
const _98a79bea = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\sms-api.vue' /* webpackChunkName: "pages_webcontrol_sms-api" */))
const _ad1cbe36 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\template.vue' /* webpackChunkName: "pages_webcontrol_template" */))
const _bfa0caa8 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webcontrol\\terms.vue' /* webpackChunkName: "pages_webcontrol_terms" */))
const _e813c454 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\about.vue' /* webpackChunkName: "pages_webinterface_about" */))
const _6962d4a9 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\contact.vue' /* webpackChunkName: "pages_webinterface_contact" */))
const _1655dabc = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\footer.vue' /* webpackChunkName: "pages_webinterface_footer" */))
const _2d4bca72 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\logo.vue' /* webpackChunkName: "pages_webinterface_logo" */))
const _df15bfb4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\menu.vue' /* webpackChunkName: "pages_webinterface_menu" */))
const _a752f40c = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\slide.vue' /* webpackChunkName: "pages_webinterface_slide" */))
const _30f53b74 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\social.vue' /* webpackChunkName: "pages_webinterface_social" */))
const _50fd9e24 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\team.vue' /* webpackChunkName: "pages_webinterface_team" */))
const _4383c5b0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\testimonial.vue' /* webpackChunkName: "pages_webinterface_testimonial" */))
const _237b7f73 = () => interopDefault(import('..\\resources\\nuxt\\pages\\webinterface\\tree-image.vue' /* webpackChunkName: "pages_webinterface_tree-image" */))
const _56546770 = () => interopDefault(import('..\\resources\\nuxt\\pages\\withdraw\\log.vue' /* webpackChunkName: "pages_withdraw_log" */))
const _3b248b0d = () => interopDefault(import('..\\resources\\nuxt\\pages\\withdraw\\method.vue' /* webpackChunkName: "pages_withdraw_method" */))
const _571e3b70 = () => interopDefault(import('..\\resources\\nuxt\\pages\\withdraw\\requests.vue' /* webpackChunkName: "pages_withdraw_requests" */))
const _67b4c45b = () => interopDefault(import('..\\resources\\nuxt\\pages\\hrm\\employee\\create.vue' /* webpackChunkName: "pages_hrm_employee_create" */))
const _4269c297 = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\category\\add_category.vue' /* webpackChunkName: "pages_product_category_add_category" */))
const _5fd586d0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\create.vue' /* webpackChunkName: "pages_return_return-purchase_create" */))
const _66646a7e = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\view.vue' /* webpackChunkName: "pages_return_return-purchase_view" */))
const _58288f44 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\create.vue' /* webpackChunkName: "pages_return_return-sale_create" */))
const _417c8007 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\view.vue' /* webpackChunkName: "pages_return_return-sale_view" */))
const _710ccd92 = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\pos\\create.vue' /* webpackChunkName: "pages_sale_pos_create" */))
const _8ab547de = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\product-list\\_id\\index.vue' /* webpackChunkName: "pages_product_product-list__id_index" */))
const _6d4e7c18 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\_id\\index.vue' /* webpackChunkName: "pages_return_return-purchase__id_index" */))
const _7b402a8c = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\_id\\index.vue' /* webpackChunkName: "pages_return_return-sale__id_index" */))
const _f02091da = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\pos\\_id\\index.vue' /* webpackChunkName: "pages_sale_pos__id_index" */))
const _193afdca = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\product-list\\_id\\edit.vue' /* webpackChunkName: "pages_product_product-list__id_edit" */))
const _aced5a50 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-purchase\\_id\\edit.vue' /* webpackChunkName: "pages_return_return-purchase__id_edit" */))
const _4636f952 = () => interopDefault(import('..\\resources\\nuxt\\pages\\return\\return-sale\\_id\\edit.vue' /* webpackChunkName: "pages_return_return-sale__id_edit" */))
const _1798e76a = () => interopDefault(import('..\\resources\\nuxt\\pages\\product\\category\\_id\\_edit.vue' /* webpackChunkName: "pages_product_category__id__edit" */))
const _198c2b09 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\_id\\index.vue' /* webpackChunkName: "pages_people__id_index" */))
const _295f020a = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\_id\\index.vue' /* webpackChunkName: "pages_purchase__id_index" */))
const _9970389c = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\_id\\index.vue' /* webpackChunkName: "pages_quotation__id_index" */))
const _f155797e = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\_id\\index.vue' /* webpackChunkName: "pages_sale__id_index" */))
const _06edd6f1 = () => interopDefault(import('..\\resources\\nuxt\\pages\\delivery-man\\_id\\edit.vue' /* webpackChunkName: "pages_delivery-man__id_edit" */))
const _540f419f = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\_id\\detail.vue' /* webpackChunkName: "pages_order__id_detail" */))
const _7e356858 = () => interopDefault(import('..\\resources\\nuxt\\pages\\order\\_id\\edit.vue' /* webpackChunkName: "pages_order__id_edit" */))
const _53cf5bec = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\_id\\detail.vue' /* webpackChunkName: "pages_outlet__id_detail" */))
const _37e1b1e5 = () => interopDefault(import('..\\resources\\nuxt\\pages\\outlet\\_id\\edit.vue' /* webpackChunkName: "pages_outlet__id_edit" */))
const _5e31c151 = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\_id\\add_member.vue' /* webpackChunkName: "pages_people__id_add_member" */))
const _269b4e1e = () => interopDefault(import('..\\resources\\nuxt\\pages\\purchase\\_id\\edit.vue' /* webpackChunkName: "pages_purchase__id_edit" */))
const _1c70015a = () => interopDefault(import('..\\resources\\nuxt\\pages\\quotation\\_id\\edit.vue' /* webpackChunkName: "pages_quotation__id_edit" */))
const _0a80f3eb = () => interopDefault(import('..\\resources\\nuxt\\pages\\sale\\_id\\edit.vue' /* webpackChunkName: "pages_sale__id_edit" */))
const _1bda7984 = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\_id\\edit.vue' /* webpackChunkName: "pages_salesman__id_edit" */))
const _afa99612 = () => interopDefault(import('..\\resources\\nuxt\\pages\\salesman\\_id\\show.vue' /* webpackChunkName: "pages_salesman__id_show" */))
const _7b1d19c6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\_id\\detail.vue' /* webpackChunkName: "pages_stock-in__id_detail" */))
const _61d1e156 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-in\\_id\\edit.vue' /* webpackChunkName: "pages_stock-in__id_edit" */))
const _7e409ef6 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\_id\\detail.vue' /* webpackChunkName: "pages_stock-out__id_detail" */))
const _8207a122 = () => interopDefault(import('..\\resources\\nuxt\\pages\\stock-out\\_id\\edit.vue' /* webpackChunkName: "pages_stock-out__id_edit" */))
const _48b85674 = () => interopDefault(import('..\\resources\\nuxt\\pages\\supplier\\_id\\edit.vue' /* webpackChunkName: "pages_supplier__id_edit" */))
const _57fd34c7 = () => interopDefault(import('..\\resources\\nuxt\\pages\\transfer\\_id\\edit.vue' /* webpackChunkName: "pages_transfer__id_edit" */))
const _904a6032 = () => interopDefault(import('..\\resources\\nuxt\\pages\\user\\_id\\edit.vue' /* webpackChunkName: "pages_user__id_edit" */))
const _64857066 = () => interopDefault(import('..\\resources\\nuxt\\pages\\Location\\_id\\_edit.vue' /* webpackChunkName: "pages_Location__id__edit" */))
const _ad8d3cfc = () => interopDefault(import('..\\resources\\nuxt\\pages\\people\\_biller\\_id\\edit.vue' /* webpackChunkName: "pages_people__biller__id_edit" */))
const _9643a7c0 = () => interopDefault(import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _331f1722,
    name: "calendar"
  }, {
    path: "/charge",
    component: _b2ae4128,
    name: "charge"
  }, {
    path: "/history",
    component: _60fec0e0,
    name: "history"
  }, {
    path: "/Location",
    component: _e530cbaa,
    name: "Location"
  }, {
    path: "/match-history",
    component: _14f57e68,
    name: "match-history"
  }, {
    path: "/outlet",
    component: _4cff4f1a,
    name: "outlet"
  }, {
    path: "/payment-log",
    component: _65746452,
    name: "payment-log"
  }, {
    path: "/supplier",
    component: _667dd858,
    name: "supplier"
  }, {
    path: "/supports",
    component: _67031fc8,
    name: "supports"
  }, {
    path: "/accounting/account",
    component: _218964f4,
    name: "accounting-account"
  }, {
    path: "/accounting/balancesheet",
    component: _61a57b0c,
    name: "accounting-balancesheet"
  }, {
    path: "/auth/login",
    component: _28289c8f,
    name: "auth-login"
  }, {
    path: "/delivery-man/add",
    component: _d8f815e4,
    name: "delivery-man-add"
  }, {
    path: "/delivery-man/list",
    component: _79792c81,
    name: "delivery-man-list"
  }, {
    path: "/expense/expense_categories",
    component: _0b4d42ee,
    name: "expense-expense_categories"
  }, {
    path: "/expense/expense_list",
    component: _1c97086a,
    name: "expense-expense_list"
  }, {
    path: "/hrm/attendance",
    component: _848c9d4c,
    name: "hrm-attendance"
  }, {
    path: "/hrm/department",
    component: _22c7b543,
    name: "hrm-department"
  }, {
    path: "/hrm/employee",
    component: _6d6b5ec3,
    name: "hrm-employee"
  }, {
    path: "/hrm/holiday",
    component: _6efcbd37,
    name: "hrm-holiday"
  }, {
    path: "/hrm/payroll",
    component: _40750384,
    name: "hrm-payroll"
  }, {
    path: "/Location/create",
    component: _473ff5f3,
    name: "Location-create"
  }, {
    path: "/order/add-order",
    component: _c8492e94,
    name: "order-add-order"
  }, {
    path: "/order/order-list",
    component: _5541114e,
    name: "order-order-list"
  }, {
    path: "/outlet/new",
    component: _74549efe,
    name: "outlet-new"
  }, {
    path: "/people/add_biller",
    component: _f78b5ffa,
    name: "people-add_biller"
  }, {
    path: "/people/add_member",
    component: _09334ca9,
    name: "people-add_member"
  }, {
    path: "/people/biller",
    component: _44a46625,
    name: "people-biller"
  }, {
    path: "/people/member",
    component: _6cc53a6a,
    name: "people-member"
  }, {
    path: "/product/add_adjustment",
    component: _017c1408,
    name: "product-add_adjustment"
  }, {
    path: "/product/add-product",
    component: _3871f7d6,
    name: "product-add-product"
  }, {
    path: "/product/brand",
    component: _6f090968,
    name: "product-brand"
  }, {
    path: "/product/category",
    component: _19fed0a7,
    name: "product-category"
  }, {
    path: "/product/print-barcode",
    component: _4254cf9a,
    name: "product-print-barcode"
  }, {
    path: "/product/product-list",
    component: _740532a9,
    name: "product-product-list"
  }, {
    path: "/product/qty_adjustment",
    component: _53a16d5a,
    name: "product-qty_adjustment"
  }, {
    path: "/product/stock-count",
    component: _5cd0412b,
    name: "product-stock-count"
  }, {
    path: "/purchase/add_purchase",
    component: _38a3cd7c,
    name: "purchase-add_purchase"
  }, {
    path: "/purchase/import_purchase",
    component: _5a5b4648,
    name: "purchase-import_purchase"
  }, {
    path: "/purchase/purchase-list",
    component: _7d34d197,
    name: "purchase-purchase-list"
  }, {
    path: "/quotation/add",
    component: _56ec6237,
    name: "quotation-add"
  }, {
    path: "/quotation/quotations",
    component: _7f0b0a41,
    name: "quotation-quotations"
  }, {
    path: "/report/best_seller",
    component: _07f924d4,
    name: "report-best_seller"
  }, {
    path: "/report/customer_report",
    component: _b7cb2662,
    children: [{
      path: "",
      component: _6af9b0d3,
      name: "report-customer_report"
    }, {
      path: "payment",
      component: _266109c7,
      name: "report-customer_report-payment"
    }, {
      path: "quotation",
      component: _833057e6,
      name: "report-customer_report-quotation"
    }, {
      path: "return",
      component: _1a08167f,
      name: "report-customer_report-return"
    }]
  }, {
    path: "/report/due_report",
    component: _66ba3896,
    name: "report-due_report"
  }, {
    path: "/report/payment_report",
    component: _03c4c963,
    name: "report-payment_report"
  }, {
    path: "/report/product_quantity_alert",
    component: _fff05b64,
    name: "report-product_quantity_alert"
  }, {
    path: "/report/product_report",
    component: _44de72da,
    name: "report-product_report"
  }, {
    path: "/report/purchase_report",
    component: _662763cc,
    name: "report-purchase_report"
  }, {
    path: "/report/sale_report",
    component: _41615c74,
    name: "report-sale_report"
  }, {
    path: "/report/summary_report",
    component: _64f68fc3,
    name: "report-summary_report"
  }, {
    path: "/report/supplier_report",
    component: _71721221,
    children: [{
      path: "",
      component: _b462697e,
      name: "report-supplier_report"
    }, {
      path: "payment",
      component: _005940b5,
      name: "report-supplier_report-payment"
    }, {
      path: "quotation",
      component: _09a3f10a,
      name: "report-supplier_report-quotation"
    }, {
      path: "return",
      component: _39d649d1,
      name: "report-supplier_report-return"
    }]
  }, {
    path: "/report/user_report",
    component: _530e8bc2,
    children: [{
      path: "",
      component: _80f52b00,
      name: "report-user_report"
    }, {
      path: "expense",
      component: _fbf3acf4,
      name: "report-user_report-expense"
    }, {
      path: "payment",
      component: _f235e798,
      name: "report-user_report-payment"
    }, {
      path: "payroll",
      component: _c922605a,
      name: "report-user_report-payroll"
    }, {
      path: "purchase",
      component: _08100743,
      name: "report-user_report-purchase"
    }, {
      path: "quotation",
      component: _0df4ef3a,
      name: "report-user_report-quotation"
    }, {
      path: "transfer",
      component: _138f95a6,
      name: "report-user_report-transfer"
    }]
  }, {
    path: "/report/warehouse_report",
    component: _1ed63df4,
    children: [{
      path: "",
      component: _5af560bc,
      name: "report-warehouse_report"
    }, {
      path: "expense",
      component: _015180c2,
      name: "report-warehouse_report-expense"
    }, {
      path: "purchase",
      component: _722f9787,
      name: "report-warehouse_report-purchase"
    }, {
      path: "quotation",
      component: _30713114,
      name: "report-warehouse_report-quotation"
    }, {
      path: "return",
      component: _298263b6,
      name: "report-warehouse_report-return"
    }]
  }, {
    path: "/role/role-list",
    component: _56d359a6,
    name: "role-role-list"
  }, {
    path: "/sale/add_sale",
    component: _53cb4864,
    name: "sale-add_sale"
  }, {
    path: "/sale/coupons",
    component: _9d8d1718,
    name: "sale-coupons"
  }, {
    path: "/sale/delivery",
    component: _059f3b1d,
    name: "sale-delivery"
  }, {
    path: "/sale/gift_card",
    component: _27d0e134,
    name: "sale-gift_card"
  }, {
    path: "/sale/import_sale",
    component: _0cfcbaf0,
    name: "sale-import_sale"
  }, {
    path: "/sale/pos",
    component: _dceb0332,
    name: "sale-pos"
  }, {
    path: "/sale/sale-list",
    component: _6512528b,
    name: "sale-sale-list"
  }, {
    path: "/salesman/add",
    component: _16127c3e,
    name: "salesman-add"
  }, {
    path: "/salesman/list",
    component: _465ffa0e,
    name: "salesman-list"
  }, {
    path: "/setting/system-settings",
    component: _ac84ba5a,
    name: "setting-system-settings"
  }, {
    path: "/stock-in/add",
    component: _4344ef33,
    name: "stock-in-add"
  }, {
    path: "/stock-in/list",
    component: _7c511208,
    name: "stock-in-list"
  }, {
    path: "/stock-out/add",
    component: _ad33f7e8,
    name: "stock-out-add"
  }, {
    path: "/stock-out/list",
    component: _1fd8fd43,
    name: "stock-out-list"
  }, {
    path: "/supplier/add",
    component: _30ae36a3,
    name: "supplier-add"
  }, {
    path: "/transfer/add_transfer",
    component: _e38a58d4,
    name: "transfer-add_transfer"
  }, {
    path: "/transfer/import_transfer",
    component: _7d18d0f0,
    name: "transfer-import_transfer"
  }, {
    path: "/transfer/transfers",
    component: _ca9b5e2a,
    name: "transfer-transfers"
  }, {
    path: "/user/add-user",
    component: _109da8b8,
    name: "user-add-user"
  }, {
    path: "/user/profile",
    component: _56de63e8,
    name: "user-profile"
  }, {
    path: "/user/user-list",
    component: _612c90fa,
    name: "user-user-list"
  }, {
    path: "/webcontrol/generalsettings",
    component: _7f54dff0,
    name: "webcontrol-generalsettings"
  }, {
    path: "/webcontrol/sms-api",
    component: _98a79bea,
    name: "webcontrol-sms-api"
  }, {
    path: "/webcontrol/template",
    component: _ad1cbe36,
    name: "webcontrol-template"
  }, {
    path: "/webcontrol/terms",
    component: _bfa0caa8,
    name: "webcontrol-terms"
  }, {
    path: "/webinterface/about",
    component: _e813c454,
    name: "webinterface-about"
  }, {
    path: "/webinterface/contact",
    component: _6962d4a9,
    name: "webinterface-contact"
  }, {
    path: "/webinterface/footer",
    component: _1655dabc,
    name: "webinterface-footer"
  }, {
    path: "/webinterface/logo",
    component: _2d4bca72,
    name: "webinterface-logo"
  }, {
    path: "/webinterface/menu",
    component: _df15bfb4,
    name: "webinterface-menu"
  }, {
    path: "/webinterface/slide",
    component: _a752f40c,
    name: "webinterface-slide"
  }, {
    path: "/webinterface/social",
    component: _30f53b74,
    name: "webinterface-social"
  }, {
    path: "/webinterface/team",
    component: _50fd9e24,
    name: "webinterface-team"
  }, {
    path: "/webinterface/testimonial",
    component: _4383c5b0,
    name: "webinterface-testimonial"
  }, {
    path: "/webinterface/tree-image",
    component: _237b7f73,
    name: "webinterface-tree-image"
  }, {
    path: "/withdraw/log",
    component: _56546770,
    name: "withdraw-log"
  }, {
    path: "/withdraw/method",
    component: _3b248b0d,
    name: "withdraw-method"
  }, {
    path: "/withdraw/requests",
    component: _571e3b70,
    name: "withdraw-requests"
  }, {
    path: "/hrm/employee/create",
    component: _67b4c45b,
    name: "hrm-employee-create"
  }, {
    path: "/product/category/add_category",
    component: _4269c297,
    name: "product-category-add_category"
  }, {
    path: "/return/return-purchase/create",
    component: _5fd586d0,
    name: "return-return-purchase-create"
  }, {
    path: "/return/return-purchase/view",
    component: _66646a7e,
    name: "return-return-purchase-view"
  }, {
    path: "/return/return-sale/create",
    component: _58288f44,
    name: "return-return-sale-create"
  }, {
    path: "/return/return-sale/view",
    component: _417c8007,
    name: "return-return-sale-view"
  }, {
    path: "/sale/pos/create",
    component: _710ccd92,
    name: "sale-pos-create"
  }, {
    path: "/product/product-list/:id?",
    component: _8ab547de,
    name: "product-product-list-id"
  }, {
    path: "/return/return-purchase/:id?",
    component: _6d4e7c18,
    name: "return-return-purchase-id"
  }, {
    path: "/return/return-sale/:id?",
    component: _7b402a8c,
    name: "return-return-sale-id"
  }, {
    path: "/sale/pos/:id",
    component: _f02091da,
    name: "sale-pos-id"
  }, {
    path: "/product/product-list/:id?/edit",
    component: _193afdca,
    name: "product-product-list-id-edit"
  }, {
    path: "/return/return-purchase/:id?/edit",
    component: _aced5a50,
    name: "return-return-purchase-id-edit"
  }, {
    path: "/return/return-sale/:id?/edit",
    component: _4636f952,
    name: "return-return-sale-id-edit"
  }, {
    path: "/product/category/:id/:edit?",
    component: _1798e76a,
    name: "product-category-id-edit"
  }, {
    path: "/people/:id?",
    component: _198c2b09,
    name: "people-id"
  }, {
    path: "/purchase/:id?",
    component: _295f020a,
    name: "purchase-id"
  }, {
    path: "/quotation/:id?",
    component: _9970389c,
    name: "quotation-id"
  }, {
    path: "/sale/:id?",
    component: _f155797e,
    name: "sale-id"
  }, {
    path: "/delivery-man/:id?/edit",
    component: _06edd6f1,
    name: "delivery-man-id-edit"
  }, {
    path: "/order/:id?/detail",
    component: _540f419f,
    name: "order-id-detail"
  }, {
    path: "/order/:id?/edit",
    component: _7e356858,
    name: "order-id-edit"
  }, {
    path: "/outlet/:id/detail",
    component: _53cf5bec,
    name: "outlet-id-detail"
  }, {
    path: "/outlet/:id/edit",
    component: _37e1b1e5,
    name: "outlet-id-edit"
  }, {
    path: "/people/:id?/add_member",
    component: _5e31c151,
    name: "people-id-add_member"
  }, {
    path: "/purchase/:id?/edit",
    component: _269b4e1e,
    name: "purchase-id-edit"
  }, {
    path: "/quotation/:id?/edit",
    component: _1c70015a,
    name: "quotation-id-edit"
  }, {
    path: "/sale/:id?/edit",
    component: _0a80f3eb,
    name: "sale-id-edit"
  }, {
    path: "/salesman/:id?/edit",
    component: _1bda7984,
    name: "salesman-id-edit"
  }, {
    path: "/salesman/:id?/show",
    component: _afa99612,
    name: "salesman-id-show"
  }, {
    path: "/stock-in/:id?/detail",
    component: _7b1d19c6,
    name: "stock-in-id-detail"
  }, {
    path: "/stock-in/:id?/edit",
    component: _61d1e156,
    name: "stock-in-id-edit"
  }, {
    path: "/stock-out/:id?/detail",
    component: _7e409ef6,
    name: "stock-out-id-detail"
  }, {
    path: "/stock-out/:id?/edit",
    component: _8207a122,
    name: "stock-out-id-edit"
  }, {
    path: "/supplier/:id/edit",
    component: _48b85674,
    name: "supplier-id-edit"
  }, {
    path: "/transfer/:id?/edit",
    component: _57fd34c7,
    name: "transfer-id-edit"
  }, {
    path: "/user/:id?/edit",
    component: _904a6032,
    name: "user-id-edit"
  }, {
    path: "/Location/:id/:edit?",
    component: _64857066,
    name: "Location-id-edit"
  }, {
    path: "/people/:biller?/:id?/edit",
    component: _ad8d3cfc,
    name: "people-biller-id-edit"
  }, {
    path: "/",
    component: _9643a7c0,
    name: "index"
  }, {
    path: "/__laravel_nuxt__",
    component: _9643a7c0,
    name: "__laravel_nuxt__"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
