(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{394:function(t,e,n){var content=n(395);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("12802b0a",content,!0,{sourceMap:!1})},395:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{-webkit-transition-timing-function:cubic-bezier(0,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{-webkit-transition-duration:.15s;transition-duration:.15s}.v-tooltip__content[class*=leave-active]{-webkit-transition-duration:75ms;transition-duration:75ms}",""])},532:function(t,e,n){"use strict";var o=n(4),r=(n(15),n(394),n(157)),c=n(16),l=n(158),d=n(103),h=n(159),v=n(528),f=n(37),m=n(3),y=n(7),_=n(6);e.a=Object(_.a)(c.a,l.a,d.a,h.a,v.a,f.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||n?r=o+e.width/2-content.width/2:(this.left||this.right)&&(r=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(o+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(m.g)(this.maxWidth),minWidth:Object(m.g)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(m.r)(this,"activator",!0)&&Object(y.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=r.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===m.w.esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(o.a)(t,this.contentClass,!0),Object(o.a)(t,"menuable__content__active",this.isActive),Object(o.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},593:function(t,e,n){var content=n(760);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("611e0d62",content,!0,{sourceMap:!1})},759:function(t,e,n){"use strict";var o=n(593);n.n(o).a},760:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".nuxt--link{display:block;text-decoration:none}.supplier-csv{border:1px solid #161616;padding:3px 10px}",""])},971:function(t,e,n){"use strict";n.r(e);var o={name:"viewCategory",created:function(){this.fetchData()},data:function(){return{items:[],search:"",form:{},total:0,itemsPerPage:5,editedIndex:-1,headers:[{text:"Category",sortable:!1,value:"cat_name"},{text:"Description",sortable:!1,value:"description"},{text:"Actions",sortable:!1,value:"action"}]}},methods:{fetchData:function(){var t=this;this.$axios.$get("api/category").then((function(e){t.items=e.categories.data,console.log(e)})).catch((function(t){console.log(t.response)}))},editItem:function(t){this.$router.push("/product/category/".concat(t,"/edit"))},deleteItem:function(t){var e=this;confirm("Are u sure to delete it?")&&this.$axios.$delete("/api/category/"+t).then((function(t){e.fetchData(),e.$toast.info("Succeessfully Delete")})).catch((function(t){console.log(t.response),e.$toast.error("Error!! Unable to Delete")}))},uploadCsv:function(image){var data=new FormData;data.append("name","my-csv"),data.append("file",event.target.files[0]);this.$axios.$put("http://127.0.0.1:3000/product/category",data,{header:{"Content-Type":"text/csv"}}).then((function(t){console.log("Csv upload response > ",t)}))}}},r=(n(759),n(31)),c=n(102),l=n.n(c),d=n(380),h=n(167),v=n(147),f=n(66),m=n(939),y=n(143),_=n(384),x=n(369),C=n(532),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"pa-5"},[n("v-card",{staticClass:"card"},[n("v-card-title",{staticClass:"blue-grey lighten-4"},[t._v("\n\t\t\tCategory\n\t\t\t"),n("span",{staticClass:"caption grey--text mt-2"},[t._v(" List")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{directives:[{name:"permission",rawName:"v-permission",value:"add category",expression:"'add category'"}],staticClass:"primary white--text",attrs:{to:"/product/category/add_category"}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-plus-circle")]),t._v("Add\n\t\t\t")],1)],1),t._v(" "),n("div",{staticClass:"pa-4"},[n("div",{staticClass:"d-flex justify-space-between"},[n("div",[n("v-text-field",{attrs:{label:"Search",solo:"",outlined:"",dense:""}})],1),t._v(" "),n("div",[n("v-btn",{staticClass:"red darken-1"},[t._v("PDF")]),t._v(" "),n("v-btn",{staticClass:"lime lighten-1"},[t._v("CSV")]),t._v(" "),n("v-btn",{staticClass:"blue lighten-1"},[t._v("Print")])],1)]),t._v(" "),n("v-data-table",{attrs:{headers:t.headers,items:t.items,"items-per-page":t.itemsPerPage},scopedSlots:t._u([{key:"item.action",fn:function(e){var o=e.item;return[n("v-tooltip",{directives:[{name:"permission",rawName:"v-permission",value:"edit category",expression:"'edit category'"}],attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{left:"",small:"",outlined:"",icon:"",color:"primary"},on:{click:function(e){return t.editItem(o.id)}}},r),[n("v-icon",{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Edit Category")])]),t._v(" "),n("v-tooltip",{directives:[{name:"permission",rawName:"v-permission",value:"delete category",expression:"'delete category'"}],attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{left:"",small:"",outlined:"",icon:"",color:"red"},on:{click:function(e){return t.deleteItem(o.id)}}},r),[n("v-icon",{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Delete Category")])])]}}])})],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VApp:d.a,VBtn:h.a,VCard:v.a,VCardTitle:f.c,VDataTable:m.a,VIcon:y.a,VSpacer:_.a,VTextField:x.a,VTooltip:C.a})}}]);