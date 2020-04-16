(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{1077:function(t,e,o){"use strict";o.r(e);o(27),o(35),o(39);var r={name:"AddOrder",created:function(){this.fetchData(),this.fetchOutlet(),this.fetchLocation(),this.setData()},data:function(){return{form:{items:[]},outlets:[],products:[],orders:[],order_status:["New","Accepted","Pending","Received","Cancel"],payment_status:["Paid","Due"],locations:[]}},computed:{},methods:{discountedPrice:function(t){return(t.unit_price-t.unit_price*t.discount/100)*t.quantity},fetchData:function(){var t=this;this.$axios.$get("/api/product").then((function(e){t.$set(t.$data,"products",e.products.data)})).catch((function(t){console.log(t)}))},fetchOutlet:function(){var t=this;this.$axios.$get("/api/outlets").then((function(e){t.$set(t.$data,"outlets",e.outlets.data),console.log(e.outlets.data)})).catch((function(t){console.log(t)}))},fetchLocation:function(){var t=this;this.$axios.$get("api/location").then((function(e){t.locations=e.locations.data})).catch((function(t){console.log(t.response)}))},addTocart:function(t){this.form.items.includes(t)?alert("already there"):this.form.items.push(t),Vue.set(t,"quantity",1),Vue.set(t,"discount",0)},removeItem:function(t){this.form.items.splice(t,1)},setData:function(){var t=this;this.$axios.$get("api/order/"+this.$route.params.id).then((function(e){t.form=e[1],t.$set(t.$data,"form",e[1]),console.log(e[1])})).catch((function(t){console.log(res.response)}))},updateItem:function(){var t=this;this.$axios.$patch("api/order/"+this.form.id,{name:this.form.name,location:this.form.location,phone:this.form.phone,create_by:this.form.create_by,status:this.form.status}).then((function(e){t.items=e.data,t.$toast.info("Succeessfully updated"),t.$router.push("/order/order-list")})).catch((function(e){t.$refs.form.validate(e.response.data.errors)}))}}},n=(o(919),o(31)),l=o(102),c=o.n(l),d=o(380),m=o(538),v=o(167),f=o(147),_=o(66),h=o(393),x=o(372),y=o(143),$=o(396),C=o(537),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",{staticClass:"pa-5"},[o("v-card",{staticClass:"card"},[o("v-card-title",{staticClass:"blue-grey lighten-4"},[t._v("Edit Order")]),t._v(" "),o("v-divider"),t._v(" "),o("p",{staticClass:"px-5 pt-3 font-italic grey--text"},[t._v("\n\t\t\tThe field labels marked with\n\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")]),t._v(" are required input fields.\n\t\t")]),t._v(" "),o("div",{staticClass:"px-5"},[o("v-row",[o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("\n\t\t\t\t\t\tLocation\n\t\t\t\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")])]),t._v(" "),o("v-autocomplete",{attrs:{"item-value":"name","item-text":"name",solo:"",outlined:"",dense:"",label:"Business Location","return-object":"",items:t.locations},model:{value:t.form.location,callback:function(e){t.$set(t.form,"location",e)},expression:"form.location"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("\n\t\t\t\t\t\tOutlet Name\n\t\t\t\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")])]),t._v(" "),o("v-autocomplete",{attrs:{items:t.outlets,"item-text":"name","item-value":"id",solo:"",outlined:"",dense:"","return-object":"",label:"Please select Outlet"},model:{value:t.form.outlet_name,callback:function(e){t.$set(t.form,"outlet_name",e)},expression:"form.outlet_name"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("Order Status")]),t._v(" "),o("v-select",{attrs:{solo:"",outlined:"",dense:"",label:"Order Status",items:t.order_status},model:{value:t.form.order_status,callback:function(e){t.$set(t.form,"order_status",e)},expression:"form.order_status"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold",attrs:{for:""}},[t._v("Payment Status")]),t._v(" "),o("v-select",{attrs:{solo:"",outlined:"",dense:"",items:t.payment_status,label:"Payment Status",required:""},model:{value:t.form.payment_status,callback:function(e){t.$set(t.form,"payment_status",e)},expression:"form.payment_status"}})],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("\n\t\t\t\t\t\tSelect Product\n\t\t\t\t\t\t"),o("span",{staticClass:"red--text"},[t._v("*")])]),t._v(" "),o("div",[o("v-autocomplete",{attrs:{items:t.products,solo:"",outlined:"",dense:"","item-text":"name","item-value":"name","return-object":"",label:"Select Product"},on:{input:t.addTocart}})],1)])],1),t._v(" "),o("div",[o("label",{staticClass:"font-weight-bold mb-3"},[t._v("Order Table")]),t._v(" "),o("table",{staticClass:"tableOrder"},[o("thead",[o("tr",{staticClass:"tableOrder--header"},[o("td",[t._v("Code")]),t._v(" "),o("td",[t._v("Name")]),t._v(" "),o("td",[t._v("Quantity")]),t._v(" "),o("td",[t._v("Unit Price")]),t._v(" "),o("td",[t._v("Discount")]),t._v(" "),o("td",[t._v("Total")]),t._v(" "),o("td",[t._v("Actions")])])]),t._v(" "),o("tbody",[t._l(t.form.items,(function(e,r){return o("tr",{key:r,staticClass:"tableOrder--td"},[o("td",[t._v(t._s(e.code))]),t._v(" "),o("td",[t._v(t._s(e.name))]),t._v(" "),o("td",[o("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.errors;return[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.form.items[r].quantity,expression:"form.items[index].quantity",modifiers:{number:!0}}],staticClass:"table-quantity",attrs:{type:"number",name:"form.items[index].quantity"},domProps:{value:t.form.items[r].quantity},on:{input:function(e){e.target.composing||t.$set(t.form.items[r],"quantity",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),o("span",[t._v(t._s(n[0]))])]}}],null,!0)})],1),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.form.items[r].unit_price,expression:"form.items[index].unit_price",modifiers:{number:!0}}],staticClass:"table-quantity",attrs:{type:"number",name:"form.items[index].unit_price",placeholder:"0.00"},domProps:{value:t.form.items[r].unit_price},on:{input:function(e){e.target.composing||t.$set(t.form.items[r],"unit_price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.form.items[r].discount,expression:"form.items[index].discount",modifiers:{number:!0}}],staticClass:"table-quantity",attrs:{type:"number",name:"form.items[index].discount",placeholder:"0.00"},domProps:{value:t.form.items[r].discount},on:{input:function(e){e.target.composing||t.$set(t.form.items[r],"discount",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),o("td",[t._v("USD "+t._s(t.discountedPrice(e)))]),t._v(" "),o("td",[o("v-btn",{attrs:{small:"",color:"red",outlined:""},on:{click:function(e){return t.removeItem(r)}}},[o("v-icon",[t._v("mdi-delete")])],1)],1)])})),t._v(" "),o("tr",[o("td",{staticClass:"py-3",attrs:{colspan:"2"}},[t._v("Total")]),t._v(" "),o("td",{attrs:{colspan:"3"}},[t._v(t._s(t.calculateQty))]),t._v(" "),o("td",[t._v("USD "+t._s(t.calculateTotal))])])],2)])]),t._v(" "),o("div",{staticClass:"d-flex flex-column mb-5"},[o("label",{attrs:{for:""}},[t._v("Note")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.description,expression:"form.description"}],staticClass:"textarea",attrs:{cols:"30",rows:"7"},domProps:{value:t.form.description},on:{input:function(e){e.target.composing||t.$set(t.form,"description",e.target.value)}}})])],1),t._v(" "),o("v-btn",{staticClass:"blue mx-5 darken-2 mb-5 grey--text text--lighten-4",on:{click:function(e){return e.preventDefault(),t.createOrder(e)}}},[o("v-icon",[t._v("mdi-check")]),t._v("Submit\n\t\t")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VApp:d.a,VAutocomplete:m.a,VBtn:v.a,VCard:f.a,VCardTitle:_.c,VCol:h.a,VDivider:x.a,VIcon:y.a,VRow:$.a,VSelect:C.a})},679:function(t,e,o){var content=o(920);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("0685a76a",content,!0,{sourceMap:!1})},919:function(t,e,o){"use strict";var r=o(679);o.n(r).a},920:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,".textarea{border:1px solid rgba(0,0,0,.125);outline:1px solid #461577}.tableOrder{width:100%;margin-top:10px;border-collapse:collapse}.tableOrder--header{font-weight:500;text-align:left}.tableOrder--header,.tableOrder--td{border-bottom:1px solid rgba(0,0,0,.125)}.table-quantity{border:1px solid rgba(0,0,0,.125);padding:5px 10px;margin-top:5px;margin-bottom:5px}",""])}}]);