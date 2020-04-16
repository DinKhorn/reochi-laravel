(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{1058:function(t,e,o){"use strict";o.r(e);o(35),o(39),o(15);var r=o(2),n=o(529);r.default.filter("formatMoney",(function(t){return n(t).format("00,00.00")}));var c={name:"editReturn",created:function(){this.fetchReturn(),this.fetchLocation(),this.fetchMember(),this.fetchAccount(),this.fetchProduct()},data:function(){return{form:{products:[]},members:[],locations:[],products:[],returnsale:[],accounts:[]}},computed:{Qty:function(){return this.form.products.reduce((function(t,e){return t+Number(e.quantity)}),0)},Total:function(){return this.form.products.reduce((function(t,e){return t+(e.unit_price-e.unit_price*e.discount/100)*e.quantity}),0)}},methods:{discountedPrice:function(t){return(t.unit_price-t.unit_price*t.discount/100)*t.quantity},fetchLocation:function(){var t=this;this.$axios.$get("api/location").then((function(e){t.locations=e.locations.data,console.log(e)})).catch((function(t){console.log(t.response)}))},fetchMember:function(){var t=this;this.$axios.$get("api/member").then((function(e){t.members=e.members.data,console.log(e)})).catch((function(t){console.log(t.response)}))},fetchAccount:function(){var t=this;this.$axios.$get("api/account").then((function(e){t.accounts=e.account,console.log(e)})).catch((function(t){console.log(t.response)}))},fetchProduct:function(){var t=this;this.$axios.$get("/api/product").then((function(e){t.products=e.products.data,console.log(e)})).catch((function(t){console.log(t)}))},fetchReturn:function(){var t=this;this.$axios.$get("api/return-sale/"+this.$route.params.id).then((function(e){for(var i in t.$set(t.$data,"form",e.returnsale),t.form.products)r.default.set(t.form.products[i],"quantity",t.form.products[i].pivot.quantity),r.default.set(t.form.products[i],"unit_price",t.form.products[i].pivot.unit_price),r.default.set(t.form.products[i],"discount",t.form.products[i].pivot.discount),console.log(t.form.products);console.log(e)})).catch((function(t){console.log(res.response)}))},addTocart:function(t){this.form.products.includes(t)?alert("Item already there"):this.form.products.push(t),r.default.set(t,"quantity",1),r.default.set(t,"discount",0)},updateReturn:function(){var t=this;this.$axios.$patch("api/return-sale/"+this.form.id,{branch:this.form.branch,products:this.form.products,member:this.form.member,account:this.form.account,return_des:this.form.return_des,staff_des:this.form.staff_des,reference_no:this.form.reference_no}).then((function(e){t.$set(t.$data,"returnsale",e.data),console.log(e),t.$router.push("/return/return-sale/view")})).catch((function(t){console.log(t.response)}))},removeItem:function(t){this.form.products.splice(t,1)}}},l=(o(885),o(31)),d=o(102),m=o.n(d),f=o(380),v=o(538),_=o(167),h=o(147),x=o(66),y=o(393),C=o(372),w=o(143),$=o(396),R=o(369),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-card",{staticClass:"mx-5 my-5"},[o("div",{staticClass:"green darken-2"},[o("v-card-title",{staticClass:"white--text"},[t._v("Edit​ Return Sale")])],1),t._v(" "),o("v-divider"),t._v(" "),o("div",{staticClass:"px-5"},[o("p",{staticClass:"caption font-italic pt-5"},[t._v("The field labels marked with * are required input fields.")]),t._v(" "),o("v-row",[o("v-col",{attrs:{sm:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold",attrs:{for:"name"}},[t._v("Reference No*")]),t._v(" "),o("validation-provider",{attrs:{name:"Name",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[o("v-text-field",{attrs:{outlined:"",solo:"",dense:"",label:"Reference_no"},model:{value:t.form.reference_no,callback:function(e){t.$set(t.form,"reference_no",e)},expression:"form.reference_no"}}),t._v(" "),o("span",{staticClass:"red--text"},[t._v(t._s(r[0]))])]}}])})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("Location*")]),t._v(" "),o("v-autocomplete",{attrs:{"item-value":"address","item-text":"address",solo:"",outlined:"",dense:"",label:"Business Location","return-object":"",items:t.locations},model:{value:t.form.branch,callback:function(e){t.$set(t.form,"branch",e)},expression:"form.branch"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("Customer*")]),t._v(" "),o("v-autocomplete",{attrs:{items:t.members,"item-text":"name","item-value":"name",solo:"",outlined:"",dense:"","return-object":"",label:"Please select Member"},model:{value:t.form.member,callback:function(e){t.$set(t.form,"member",e)},expression:"form.member"}})],1),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("Account*")]),t._v(" "),o("v-autocomplete",{attrs:{items:t.accounts,"item-text":"name","item-value":"name",solo:"",outlined:"",dense:"","return-object":"",label:"Please select Account"},model:{value:t.form.account,callback:function(e){t.$set(t.form,"account",e)},expression:"form.account"}})],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("label",{staticClass:"font-weight-bold"},[t._v("Select Product")]),t._v(" "),o("div",[o("v-autocomplete",{attrs:{dense:"",solo:"","item-text":"name","item-value":"name","return-object":"",items:t.products},on:{input:t.addTocart}})],1)])],1),t._v(" "),o("div",[o("label",{staticClass:"font-weight-bold mb-3"},[t._v("Product Table")]),t._v(" "),o("table",{staticClass:"tableReturn"},[o("thead",[o("tr",{staticClass:"tableReturn--header"},[o("td",[t._v("Name")]),t._v(" "),o("td",[t._v("Code")]),t._v(" "),o("td",[t._v("Quantity")]),t._v(" "),o("td",[t._v("Unit Price")]),t._v(" "),o("td",[t._v("Discount")]),t._v(" "),o("td",[t._v("Total")]),t._v(" "),o("td",[t._v("Actions")])])]),t._v(" "),o("tbody",[t._l(t.form.products,(function(e,r){return o("tr",{key:r,staticClass:"tableReturn--td"},[o("td",[t._v(t._s(e.name))]),t._v(" "),o("td",[t._v(t._s(e.code))]),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.form.products[r].quantity,expression:"form.products[index].quantity"}],staticClass:"table-quantity",attrs:{type:"number"},domProps:{value:t.form.products[r].quantity},on:{input:function(e){e.target.composing||t.$set(t.form.products[r],"quantity",e.target.value)}}})]),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.form.products[r].unit_price,expression:"form.products[index].unit_price"}],staticClass:"table-quantity",attrs:{type:"number",placeholder:"0.00"},domProps:{value:t.form.products[r].unit_price},on:{input:function(e){e.target.composing||t.$set(t.form.products[r],"unit_price",e.target.value)}}})]),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.form.products[r].discount,expression:"form.products[index].discount"}],staticClass:"table-quantity",attrs:{type:"number",placeholder:"0.00"},domProps:{value:t.form.products[r].discount},on:{input:function(e){e.target.composing||t.$set(t.form.products[r],"discount",e.target.value)}}})]),t._v(" "),o("td",[t._v("USD "+t._s(t._f("formatMoney")(t.discountedPrice(e))))]),t._v(" "),o("td",[o("v-btn",{attrs:{small:"",color:"red",outlined:""},on:{click:function(e){return t.removeItem(r)}}},[o("v-icon",[t._v("mdi-delete")])],1)],1)])})),t._v(" "),o("tr",[o("td",{staticClass:"py-5",attrs:{colspan:"2"}},[t._v("Total")]),t._v(" "),o("td",{attrs:{colspan:"3"}},[t._v(t._s(t.Qty))]),t._v(" "),o("td",[t._v("USD "+t._s(t._f("formatMoney")(t.Total)))])])],2)])]),t._v(" "),o("v-row",[o("v-col",{attrs:{md:"6",cols:"12"}},[o("div",{staticClass:"d-flex flex-column mb-5"},[o("label",{staticClass:"font-weight-bold",attrs:{for:""}},[t._v("Return Note")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.return_des,expression:"form.return_des"}],staticClass:"textarea",attrs:{cols:"30",rows:"5"},domProps:{value:t.form.return_des},on:{input:function(e){e.target.composing||t.$set(t.form,"return_des",e.target.value)}}})])]),t._v(" "),o("v-col",{attrs:{md:"6",cols:"12"}},[o("div",{staticClass:"d-flex flex-column mb-5"},[o("label",{staticClass:"font-weight-bold",attrs:{for:""}},[t._v("Staff Note")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.staff_des,expression:"form.staff_des"}],staticClass:"textarea",attrs:{cols:"30",rows:"5"},domProps:{value:t.form.staff_des},on:{input:function(e){e.target.composing||t.$set(t.form,"staff_des",e.target.value)}}})])])],1)],1),t._v(" "),o("v-btn",{staticClass:"green darken-2 mx-5 darken-2 mb-5 grey--text text--lighten-4",on:{click:function(e){return e.preventDefault(),t.updateReturn(e)}}},[o("v-icon",[t._v("mdi-check")]),t._v("Update\n\t\t")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VApp:f.a,VAutocomplete:v.a,VBtn:_.a,VCard:h.a,VCardTitle:x.c,VCol:y.a,VDivider:C.a,VIcon:w.a,VRow:$.a,VTextField:R.a})},662:function(t,e,o){var content=o(886);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("a00bd6c0",content,!0,{sourceMap:!1})},885:function(t,e,o){"use strict";var r=o(662);o.n(r).a},886:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,".textarea{border:1px solid rgba(0,0,0,.125);outline:1px solid #461577}.tableReturn{width:100%;margin-top:10px;border-collapse:collapse}.tableReturn--header{font-weight:500;text-align:left}.tableReturn--header,.tableReturn--td{border-bottom:1px solid rgba(0,0,0,.125)}.table-quantity{border:1px solid rgba(0,0,0,.125);padding:5px 10px;margin-top:5px;margin-bottom:5px}",""])}}]);