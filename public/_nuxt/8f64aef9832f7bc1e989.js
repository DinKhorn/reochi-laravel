(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{594:function(t,e,o){var content=o(762);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("78679de7",content,!0,{sourceMap:!1})},761:function(t,e,o){"use strict";var r=o(594);o.n(r).a},762:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,".tableBarcode{width:100%;text-align:left;border-collapse:collapse}.tableBarcode--tr{border-bottom:1px solid rgba(0,0,0,.125)}.tableBarcode--input{border:1px solid rgba(0,0,0,.125);padding:5px 10px;outline:none}",""])},972:function(t,e,o){"use strict";o.r(e);o(35),o(39);var r={name:"ProductBarcode",created:function(){this.fetchData()},data:function(){return{headers:[{text:"Name",sortable:!1},{text:"Code",sortable:!1},{text:"Quantity",sortable:!1},{text:"Action",sortable:!1}],items:[],orders:[],form:{}}},methods:{fetchData:function(){var t=this;this.$axios.$get("api/product").then((function(e){t.items=e.products.data,console.log(e)})).catch((function(t){console.log(t.response)}))},remove:function(t){this.orders.splice(t,1)},addToCart:function(t){this.orders.includes(t)?alert("already there"):this.orders.push(t)}}},n=(o(761),o(31)),l=o(102),c=o.n(l),d=o(380),v=o(538),m=o(167),_=o(147),f=o(66),x=o(929),h=o(393),C=o(372),k=o(143),w=o(396),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-card",{staticClass:"mx-5 my-5"},[o("div",{staticClass:"px-5 cyan darken-3 white--text"},[o("v-card-title",[t._v("\n\t\t\t\tPrint Barcode\n\t\t\t")])],1),t._v(" "),o("v-divider"),t._v(" "),o("div",{staticClass:"px-5 pt-5"},[o("div",{staticClass:"d-flex flex-column"},[o("label",[t._v("Add Product *")]),t._v(" "),o("v-autocomplete",{attrs:{solo:"",outlined:"",dense:"","append-icon":"mdi-barcode",label:"Please type, product code and select...",items:t.items,"item-text":"name","item-value":"name","return-object":""},on:{input:t.addToCart},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),o("div",[o("table",{staticClass:"tableBarcode"},[o("thead",[o("tr",{staticClass:"tableBarcode--tr"},[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Code")]),t._v(" "),o("th",[t._v("Quantity")]),t._v(" "),o("th",[t._v("Action")])])]),t._v(" "),o("tbody",t._l(t.orders,(function(e,r){return o("tr",{key:r},[o("td",[t._v(t._s(e.name))]),t._v(" "),o("td",[t._v(t._s(e.code))]),t._v(" "),o("td",[o("input",{directives:[{name:"model",rawName:"v-model",value:e.unit,expression:"item.unit"}],staticClass:"tableBarcode--input",attrs:{type:"number"},domProps:{value:e.unit},on:{input:function(o){o.target.composing||t.$set(e,"unit",o.target.value)}}})]),t._v(" "),o("td",[o("v-btn",{attrs:{small:"",outlined:"",icon:"",color:"red"},on:{click:function(e){return t.remove(r)}}},[o("v-icon",{attrs:{small:""}},[t._v("mdi-delete")])],1)],1)])})),0)])])]),t._v(" "),o("v-row",{staticClass:"pl-5"},[o("v-col",{staticClass:"d-flex align-center",attrs:{sm:"3",cols:"6"}},[o("label",{attrs:{for:""}},[t._v("Print")]),t._v(" "),o("v-checkbox")],1),t._v(" "),o("v-col",{staticClass:"d-flex align-center",attrs:{sm:"3",cols:"6"}},[o("label",{attrs:{for:""}},[t._v("Product Name")]),t._v(" "),o("v-checkbox")],1),t._v(" "),o("v-col",{staticClass:"d-flex align-center",attrs:{sm:"3",cols:"6"}},[o("label",{attrs:{for:""}},[t._v("Price")]),t._v(" "),o("v-checkbox")],1),t._v(" "),o("v-col",{staticClass:"d-flex align-center",attrs:{sm:"3",cols:"6"}},[o("label",{attrs:{for:""}},[t._v("Promotion Price")]),t._v(" "),o("v-checkbox")],1)],1),t._v(" "),o("v-btn",{staticClass:"blue mx-5 lighten-2 mb-5 grey--text text--lighten-4"},[o("v-icon",[t._v("mdi-check")]),t._v("\n\t\t\tSubmit\n\t\t")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VApp:d.a,VAutocomplete:v.a,VBtn:m.a,VCard:_.a,VCardTitle:f.c,VCheckbox:x.a,VCol:h.a,VDivider:C.a,VIcon:k.a,VRow:w.a})}}]);