(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{561:function(t,e,o){var content=o(585);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("15a1eb29",content,!0,{sourceMap:!1})},584:function(t,e,o){"use strict";var r=o(561);o.n(r).a},585:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,".textarea{border:1px solid rgba(0,0,0,.125);outline:1px solid #461577}.tableOrder{width:100%;margin-top:10px;border-collapse:collapse}.tableOrder--header{font-weight:500;text-align:left}.tableOrder--header,.tableOrder--td{border-bottom:1px solid rgba(0,0,0,.125)}.table-quantity{border:1px solid rgba(0,0,0,.125);padding:5px 10px;margin-top:5px;margin-bottom:5px}",""])},685:function(t,e,o){"use strict";o(15);var r={props:{form:{required:!0,type:Object,default:function(){return{items:[]}}}},data:function(){return{outlets:[],products:[],orders:[],order_status:["Pending","Accepted","Cancel"],payment_status:["Paid","Due"],locations:[]}},watch:{"form.items":{handler:function(){for(var t=0,e=this.form.items,i=0;i<e.length;i++)this.form.items[i].subtotal=e[i].quantity*e[i].unit_price,t+=this.form.items[i].subtotal;this.form.items=e,this.form.total=t},immediate:!0,deep:!0}},methods:{fetchData:function(){var t=this;this.$axios.$get("/api/product").then((function(e){t.$set(t.$data,"products",e.products.data)})).catch((function(t){console.log(t)}))},fetchOutlet:function(){var t=this;this.$axios.$get("api/outlets").then((function(e){t.outlets=e.outlets.data})).catch((function(t){console.log(t.response)}))},fetchLocation:function(){var t=this;this.$axios.$get("api/location").then((function(e){t.locations=e.locations.data})).catch((function(t){console.log(t.response)}))},addTocart:function(t){for(var e=this.form.items,i=0;i<e.length;i++)if(e[i].product_id==t.id)return void(this.form.items[i].quantity+=1);this.form.items.push({product:t,product_id:t.id,quantity:1,unit_price:t.price})},removeItem:function(t){this.form.items.splice(t,1)},discountedPrice:function(t){return(t.unit_price-t.unit_price*t.discount/100)*t.quantity}},computed:{calculateQty:function(){return this.form.items.reduce((function(t,e){return t+Number(e.quantity)}),0)},calculateTotal:function(){return this.form.items.reduce((function(t,e){return t+(e.unit_price-e.unit_price*e.discount/100)*e.quantity}),0)}},created:function(){this.fetchData(),this.fetchOutlet(),this.fetchLocation()}},n=(o(584),o(31)),l=o(102),c=o.n(l),d=o(538),m=o(167),v=o(393),f=o(143),_=o(396),h=o(537),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-row",[o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("\n\t\t\t\tLocation\n\t\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")])]),t._v(" "),o("v-autocomplete",{attrs:{"item-value":"name","item-text":"name",solo:"",outlined:"",dense:"",label:"Business Location","return-object":"",items:t.locations},model:{value:t.form.location,callback:function(e){t.$set(t.form,"location",e)},expression:"form.location"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("\n\t\t\t\tOutlet Name\n\t\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")])]),t._v(" "),o("v-autocomplete",{attrs:{items:t.outlets,"item-text":"name","item-value":"id",solo:"",outlined:"",dense:"","return-object":"",label:"Please select Outlet"},model:{value:t.form.outlet,callback:function(e){t.$set(t.form,"outlet",e)},expression:"form.outlet"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("Order Status")]),t._v(" "),o("v-select",{attrs:{solo:"",outlined:"",dense:"",label:"Order Status",items:t.order_status},model:{value:t.form.order_status,callback:function(e){t.$set(t.form,"order_status",e)},expression:"form.order_status"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold",attrs:{for:""}},[t._v("Payment Status")]),t._v(" "),o("v-select",{attrs:{solo:"",outlined:"",dense:"",items:t.payment_status,label:"Payment Status",required:""},model:{value:t.form.payment_status,callback:function(e){t.$set(t.form,"payment_status",e)},expression:"form.payment_status"}})],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("\n\t\t\t\tSelect Product\n\t\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")])]),t._v(" "),o("div",[o("v-autocomplete",{attrs:{items:t.products,solo:"",outlined:"",dense:"","item-text":"name","item-value":"name","return-object":"",label:"Select Product"},on:{input:t.addTocart}})],1)])],1),t._v(" "),o("div",[o("label",{staticClass:"font-weight-bold mb-3"},[t._v("Order Table")]),t._v(" "),o("table",{staticClass:"tableOrder"},[t._m(0),t._v(" "),o("tbody",[t._l(t.form.items,(function(e,r){return o("tr",{key:r,staticClass:"tableOrder--td"},[o("td",[t._v(t._s(e.product?e.product.code:null))]),t._v(" "),o("td",[t._v(t._s(e.product?e.product.name:null))]),t._v(" "),o("td",[o("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.errors;return[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.quantity,expression:"item.quantity",modifiers:{number:!0}}],staticClass:"table-quantity",attrs:{type:"number",name:"item.quantity"},domProps:{value:e.quantity},on:{input:function(o){o.target.composing||t.$set(e,"quantity",t._n(o.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),o("span",[t._v(t._s(n[0]))])]}}],null,!0)})],1),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.unit_price,expression:"item.unit_price",modifiers:{number:!0}}],staticClass:"table-quantity",attrs:{type:"number",name:"item.unit_price",placeholder:"0.00"},domProps:{value:e.unit_price},on:{input:function(o){o.target.composing||t.$set(e,"unit_price",t._n(o.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),o("td",[t._v(t._s(e.subtotal))]),t._v(" "),o("td",[o("v-btn",{attrs:{small:"",color:"red",outlined:""},on:{click:function(e){return t.removeItem(r)}}},[o("v-icon",[t._v("mdi-delete")])],1)],1)])})),t._v(" "),o("tr",[o("td",{staticClass:"py-3",attrs:{colspan:"2"}},[t._v("Total")]),t._v(" "),o("td",{attrs:{colspan:"2"}},[t._v(t._s(t.calculateQty))]),t._v(" "),o("td",[t._v("USD "+t._s(t.form.total))])])],2)])]),t._v(" "),o("div",{staticClass:"d-flex flex-column mb-5"},[o("label",{attrs:{for:""}},[t._v("Note")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.note,expression:"form.note"}],staticClass:"textarea",attrs:{cols:"30",rows:"7"},domProps:{value:t.form.note},on:{input:function(e){e.target.composing||t.$set(t.form,"note",e.target.value)}}})])],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("thead",[o("tr",{staticClass:"tableOrder--header"},[o("td",[t._v("Code")]),t._v(" "),o("td",[t._v("Name")]),t._v(" "),o("td",[t._v("Quantity")]),t._v(" "),o("td",[t._v("Unit Price")]),t._v(" "),o("td",[t._v("Subtotal")]),t._v(" "),o("td",[t._v("Actions")])])])}],!1,null,null,null);e.a=component.exports;c()(component,{VAutocomplete:d.a,VBtn:m.a,VCol:v.a,VIcon:f.a,VRow:_.a,VSelect:h.a})},961:function(t,e,o){"use strict";o.r(e);var r=o(2),n=o(685),l=o(529);r.default.filter("formatMoney",(function(t){return l(t).format("0,0.00")}));var c={name:"AddOrder",components:{OrderForm:n.a},data:function(){return{form:{items:[]}}},methods:{createOrder:function(){var t=this;this.$axios.$post("api/order",this.form).then((function(e){t.$router.push("/order/order-list")})).catch((function(t){console.log(t.response)}))}}},d=o(31),m=o(102),v=o.n(m),f=o(380),_=o(167),h=o(147),x=o(66),y=o(372),C=o(143),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",{staticClass:"pa-5"},[o("v-card",{staticClass:"card"},[o("v-card-title",{staticClass:"blue-grey lighten-4"},[t._v("Create Order")]),t._v(" "),o("v-divider"),t._v(" "),o("v-card-text",[o("OrderForm",{attrs:{form:t.form}})],1),t._v(" "),o("v-btn",{staticClass:"blue mx-5 darken-2 mb-5 grey--text text--lighten-4",on:{click:function(e){return e.preventDefault(),t.createOrder(e)}}},[o("v-icon",[t._v("mdi-check")]),t._v("Submit\n\t\t")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VApp:f.a,VBtn:_.a,VCard:h.a,VCardText:x.b,VCardTitle:x.c,VDivider:y.a,VIcon:C.a})}}]);