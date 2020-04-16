(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{1018:function(t,e,n){"use strict";n.r(e);n(228);var o=n(4),r=n(2),l=n(529);r.default.filter("formatNumber",(function(t){return l(t).format("0,0.00")}));var c={created:function(){this.fetchData()},data:function(){return Object(o.a)({completed:!0,items:[],search:"",form:{},total:0,options:{},itemsPerPage:5,editedIndex:-1,headers:[{text:"Date",sortable:!1,value:"date"},{text:"Seller",sortable:!1},{text:"Invoice No",sortable:!1},,{text:"Customer",sortable:!1},{text:"Payment Status",sortable:!1,value:"payment_status"},{text:"Grand Total",sortable:!1,value:"total"},{text:"Paid",sortable:!1,value:"paid"},{text:"Due",sortable:!1,value:"due"},{text:"Actions",sortable:!1,value:"action"}]},"total",0)},watch:{search:{handler:function(){this.fetchData()}},options:{handler:function(){this.fetchData()}},immediate:!0},methods:{fetchData:function(){var t=this;this.$axios.$get("api/sale?search=".concat(this.search,"&itemsPerPage=").concat(this.options.itemsPerPage,"&page=").concat(this.options.page)).then((function(e){t.$set(t.$data,"items",e.sales.data),t.total=e.sales.total,console.log(e)})).catch((function(t){console.log(t.response)}))},close:function(){this.dialog=!1,this.editedIndex=-1,this.form={}},editSale:function(t){this.$router.push("/sale/".concat(t,"/edit"))},removeSale:function(t){var e=this;this.$axios.$delete("api/sale/"+t).then((function(t){e.fetchData()})).catch((function(t){console.log(t.response)}))},viewInfo:function(t){this.$router.push("/sale/".concat(t))}}},d=(n(807),n(31)),v=n(102),m=n.n(v),f=n(380),_=n(167),h=n(147),x=n(939),k=n(143),C=n(369),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"mx-5 my-5"},[n("div",{staticClass:"d-flex"},[n("div",{staticClass:"pb-5 d-flex"},[n("nuxt-link",{staticClass:"nuxt--link",attrs:{to:"/sale/add_sale"}},[n("v-btn",{directives:[{name:"permission",rawName:"v-permission",value:"add sales",expression:"'add sales'"}],staticClass:"teal darken-1",attrs:{dark:""}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-plus-circle")]),t._v("Add Sale\n\t\t\t\t")],1)],1),t._v(" "),n("nuxt-link",{staticClass:"nuxt--link px-3",attrs:{to:"/sale/import_sale"}},[n("v-btn",{directives:[{name:"permission",rawName:"v-permission",value:"add sales",expression:"'add sales'"}],staticClass:"purple darken-1",attrs:{dark:""}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-file")]),t._v("Import Sale\n\t\t\t\t")],1)],1)],1)]),t._v(" "),n("div",{staticClass:"d-flex justify-space-between"},[n("div",[n("v-text-field",{attrs:{label:"Search",solo:"",outlined:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),n("div",[n("v-btn",{staticClass:"red darken-1"},[t._v("PDF")]),t._v(" "),n("v-btn",{staticClass:"lime lighten-1"},[t._v("CSV")]),t._v(" "),n("v-btn",{staticClass:"blue lighten-1"},[t._v("Print")])],1)]),t._v(" "),n("v-card",[n("v-data-table",{attrs:{headers:t.headers,items:t.items,"items-per-page":t.itemsPerPage,"server-items-length":t.total,options:t.options},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item",fn:function(e){var o=e.item;return[n("tr",{staticClass:"sale-tr"},[n("td",[t._v(t._s(o.created_at))]),t._v(" "),n("td",[t._v(t._s(o.user.name))]),t._v(" "),n("td",[t._v(t._s(o.reference_no))]),t._v(" "),n("td",[t._v(t._s(o.member.name))]),t._v(" "),n("td",[n("span",{class:"Paid"===o.payment_status?"paid":"due"},[t._v(t._s(o.payment_status))])]),t._v(" "),n("td",[t._v("USD "+t._s(t._f("formatNumber")(o.grand_total)))]),t._v(" "),n("td",[t._v("USD "+t._s(t._f("formatNumber")(o.paid)))]),t._v(" "),n("td",[t._v("USD "+t._s(t._f("formatNumber")(o.due_amount)))]),t._v(" "),n("td",[n("v-btn",{attrs:{small:"",outlined:"",icon:"",color:"teal"},on:{click:function(e){return t.viewInfo(o.id)}}},[n("v-icon",{attrs:{small:"",text:""}},[t._v("mdi-eye")])],1),t._v(" "),n("v-btn",{attrs:{small:"",outlined:"",icon:"",color:"primary"},on:{click:function(e){return t.editSale(o.id)}}},[n("v-icon",{attrs:{small:"",text:""}},[t._v("mdi-pencil")])],1),t._v(" "),n("v-btn",{attrs:{small:"",outlined:"",icon:"",color:"red"},on:{click:function(e){return t.removeSale(o.id)}}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-delete")])],1)],1)])]}}])})],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VApp:f.a,VBtn:_.a,VCard:h.a,VDataTable:x.a,VIcon:k.a,VTextField:C.a})},618:function(t,e,n){var content=n(808);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("2be6aeee",content,!0,{sourceMap:!1})},807:function(t,e,n){"use strict";var o=n(618);n.n(o).a},808:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".nuxt--link{text-decoration:none}.form-control{width:100%;padding:5px 10px;outline:none;border-radius:5px;border:1px solid #616161}.paid{background-color:#36d160}.due,.paid{padding:5px 7px;border-radius:5px}.due{background-color:#e0355a;color:#fff}.completed{background-color:#433ac1;padding:5px 7px;border-radius:5px;color:#fff}.sale-tr{cursor:pointer}",""])}}]);