(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{394:function(t,e,n){var content=n(395);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("12802b0a",content,!0,{sourceMap:!1})},395:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{-webkit-transition-timing-function:cubic-bezier(0,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{-webkit-transition-duration:.15s;transition-duration:.15s}.v-tooltip__content[class*=leave-active]{-webkit-transition-duration:75ms;transition-duration:75ms}",""])},532:function(t,e,n){"use strict";var o=n(4),r=(n(15),n(394),n(157)),c=n(16),l=n(158),d=n(103),v=n(159),h=n(528),f=n(37),m=n(3),_=n(7),x=n(6);e.a=Object(x.a)(c.a,l.a,d.a,v.a,h.a,f.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||n?r=o+e.width/2-content.width/2:(this.left||this.right)&&(r=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(o+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(m.g)(this.maxWidth),minWidth:Object(m.g)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(m.r)(this,"activator",!0)&&Object(_.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=r.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===m.w.esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(o.a)(t,this.contentClass,!0),Object(o.a)(t,"menuable__content__active",this.isActive),Object(o.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},586:function(t,e,n){var content=n(746);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("8be8b52c",content,!0,{sourceMap:!1})},745:function(t,e,n){"use strict";var o=n(586);n.n(o).a},746:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".paid{background-color:#36d160}.due,.paid{padding:5px 7px;border-radius:5px}.due{background-color:#e0355a;color:#fff}.new{background-color:#da5521}.new,.pending{padding:5px 7px;border-radius:5px}.pending{background-color:#4635e0;color:#fff}.accepted{background-color:#d5e035;padding:5px 7px;border-radius:5px}.received{background-color:#3bd136}.cancel,.received{padding:5px 7px;border-radius:5px;color:#fff}.cancel{background-color:#d42b2b}",""])},962:function(t,e,n){"use strict";n.r(e);var o={name:"OrderList",watch:{name:{handler:function(){this.getItems()}},email:{handler:function(){this.getItems()}},term:{handler:function(){this.searchItems()}},immediate:!0},created:function(){this.fetchData()},data:function(){return{date:(new Date).toISOString().substr(0,10),menu1:!1,modal:!1,menu2:!1,filter_by:["Salesman","Admin"],dialog:!1,items:[],form:{},headers:[{text:"Date",value:"created_at"},{text:"Reference No.",value:"reference_no"},{text:"Outlet Name",value:"outlet.name"},{text:"Location",value:"location"},{text:"Order Status",value:"order_status"},{text:"Payment Status",value:"payment_status"},{text:"Total",value:"total"},{text:"Payment Due",value:"due_amount"},{text:"Order By",value:"order_by.name"},{text:"Action",value:"action",sortable:!1}],role:["saleman","administator"]}},methods:{fetchData:function(){var t=this;this.$axios.$get("/api/order").then((function(e){t.items=e.orders.data,console.log(t.items)})).catch((function(t){console.log(t.response)}))},editItem:function(t){this.$router.push("/order/".concat(t,"/edit"))},viewItem:function(t){this.$router.push("/order/".concat(t,"/detail"))}}},r=(n(745),n(31)),c=n(102),l=n.n(c),d=n(380),v=n(167),h=n(147),f=n(66),m=n(939),_=n(563),x=n(143),y=n(688),w=n(537),k=n(384),C=n(369),S=n(532),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"pa-5"},[n("v-card",{staticClass:"card"},[n("v-card-title",{staticClass:"blue-grey lighten-4"},[t._v("\n\t\t\tOrder\n\t\t\t"),n("span",{staticClass:"caption grey--text mt-2"},[t._v(" List")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"primary white--text",attrs:{to:"/order/add-order"}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-plus-circle")]),t._v("Add\n\t\t\t")],1)],1),t._v(" "),n("div",{staticClass:"pa-5"},[n("div",{staticClass:"d-flex justify-space-between"},[n("div",{staticClass:"col-8 py-0"},[n("div",{staticClass:"row"},[n("v-text-field",{staticStyle:{width:"100px !important"},attrs:{label:"Search",solo:"",outlined:"",dense:""}}),t._v(" "),n("v-select",{staticStyle:{width:"60px !important","padding-left":"10px"},attrs:{label:"Filter by",solo:"",outlined:"",dense:"",items:t.filter_by},model:{value:t.filter_by,callback:function(e){t.filter_by=e},expression:"filter_by"}}),t._v(" "),n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-text-field",t._g({staticStyle:{width:"40px !important",margin:"0 10px"},attrs:{readonly:"",outlined:"",solo:"",dense:"",label:"Date From"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},o))]}}]),model:{value:t.menu1,callback:function(e){t.menu1=e},expression:"menu1"}},[t._v(" "),n("v-date-picker",{on:{input:function(e){t.menu1=!1}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-text-field",t._g({staticStyle:{width:"40px !important"},attrs:{readonly:"",outlined:"",solo:"",dense:"",label:"Date To"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},o))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[t._v(" "),n("v-date-picker",{on:{input:function(e){t.menu2=!1}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)]),t._v(" "),n("div",[n("v-btn",{staticClass:"red darken-1"},[t._v("PDF")]),t._v(" "),n("v-btn",{staticClass:"lime lighten-1"},[t._v("CSV")]),t._v(" "),n("v-btn",{staticClass:"blue lighten-1"},[t._v("Print")])],1)]),t._v(" "),n("v-data-table",{directives:[{name:"permission",rawName:"v-permission",value:"view order",expression:"'view order'"}],attrs:{headers:t.headers,items:t.items},scopedSlots:t._u([{key:"item",fn:function(e){var o=e.item;return[n("tr",[n("td",[t._v(t._s(o.created_at))]),t._v(" "),n("td",[t._v(t._s(o.reference_no))]),t._v(" "),n("td",[t._v(t._s(o.outlet?o.outlet.name:null))]),t._v(" "),n("td",[t._v(t._s(o.location?o.location.name:null))]),t._v(" "),"New"===o.order_status?n("td",[n("span",{staticClass:"new"},[t._v(t._s(o.order_status))])]):"Pending"===o.order_status?n("td",[n("span",{staticClass:"pending"},[t._v(t._s(o.order_status))])]):"Accepted"===o.order_status?n("td",[n("span",{staticClass:"accepted"},[t._v(t._s(o.order_status))])]):"Received"===o.order_status?n("td",[n("span",{staticClass:"received"},[t._v(t._s(o.order_status))])]):n("td",[n("span",{staticClass:"cancel"},[t._v(t._s(o.order_status))])]),t._v(" "),n("td",[n("span",{class:"Paid"===o.payment_status?"paid":"due"},[t._v(t._s(o.payment_status))])]),t._v(" "),n("td",[t._v("USD "+t._s(o.total))]),t._v(" "),n("td",[t._v("USD "+t._s(o.due_amount))]),t._v(" "),n("td",[t._v(t._s(o.order_by?o.order_by.name:null))]),t._v(" "),n("td",[n("v-tooltip",{directives:[{name:"permission",rawName:"v-permission",value:"view order",expression:"'view order'"}],attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{icon:"",small:"",color:"cyan",outlined:""},on:{click:function(e){return t.viewItem(o.id)}}},r),[n("v-icon",{attrs:{small:""}},[t._v("mdi-eye")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("View")])]),t._v(" "),n("v-tooltip",{directives:[{name:"permission",rawName:"v-permission",value:"edit order",expression:"'edit order'"}],attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{small:"",icon:"",color:"primary",outlined:""},on:{click:function(e){return t.editItem(o.id)}}},r),[n("v-icon",{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Edit")])])],1)])]}}])})],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VApp:d.a,VBtn:v.a,VCard:h.a,VCardTitle:f.c,VDataTable:m.a,VDatePicker:_.a,VIcon:x.a,VMenu:y.a,VSelect:w.a,VSpacer:k.a,VTextField:C.a,VTooltip:S.a})}}]);