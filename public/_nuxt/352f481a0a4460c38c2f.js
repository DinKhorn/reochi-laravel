(window.webpackJsonp=window.webpackJsonp||[]).push([[134],{1023:function(t,e,n){"use strict";n.r(e);var o=n(4),l={name:"StockOut",watch:{name:{handler:function(){this.getItems()}},email:{handler:function(){this.getItems()}},term:{handler:function(){this.searchItems()}},immediate:!0},data:function(){var t;return t={date:(new Date).toISOString().substr(0,10),menu1:!1,modal:!1,menu2:!1,dialog:!1,filter_by:"",items:[],form:{},headers:[{text:"Date",value:"created_at"},{text:"Reference No.",value:"reference_no"},{text:"Deliver Name",value:"deliver_name"},{text:"Total",value:"total"},{text:"Action",value:"action",sortable:!1}]},Object(o.a)(t,"filter_by",["Outlet","Seller"]),Object(o.a)(t,"filter_by_location",[]),Object(o.a)(t,"role",["saleman","administator"]),t},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.$axios.$get("api/stock-out").then((function(e){t.items=e.stock_out.data})).catch((function(t){console.log(t.response)}))}}},c=n(31),r=n(102),h=n.n(r),d=n(380),f=n(538),v=n(167),m=n(147),x=n(66),y=n(939),I=n(563),_=n(143),S=n(688),w=n(537),D=n(384),k=n(369),C=n(532),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"pa-5"},[n("v-card",{staticClass:"card"},[n("v-card-title",{staticClass:"blue-grey lighten-4"},[t._v("\n\t\t\tStock Out\n\t\t\t"),n("span",{staticClass:"caption grey--text mt-2"},[t._v(" List")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{directives:[{name:"permission",rawName:"v-permission",value:"add stock-out",expression:"'add stock-out'"}],staticClass:"primary white--text",attrs:{to:"/stock-out/add"}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-plus-circle")]),t._v("Add\n\t\t\t")],1)],1),t._v(" "),n("div",{staticClass:"pa-4"},[n("div",{staticClass:"d-flex justify-space-between"},[n("div",{staticClass:"col-7 py-0"},[n("div",{staticClass:"row"},[n("v-text-field",{staticStyle:{width:"100px !important"},attrs:{label:"Search",solo:"",outlined:"",dense:""}}),t._v(" "),n("v-select",{staticStyle:{width:"60px !important","padding-left":"10px"},attrs:{label:"Filter by",solo:"",outlined:"",dense:"",items:t.filter_by},model:{value:t.filter_by,callback:function(e){t.filter_by=e},expression:"filter_by"}}),t._v(" "),n("v-autocomplete",{staticStyle:{width:"60px !important","padding-left":"10px"},attrs:{label:"Filter by location",solo:"",outlined:"",dense:"",items:t.filter_by_location,"item-value":"name","item-text":"name"},model:{value:t.filter_by_location,callback:function(e){t.filter_by_location=e},expression:"filter_by_location"}})],1),t._v(" "),n("div",{staticClass:"row"},[n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-text-field",t._g({staticClass:"pr-2",attrs:{readonly:"",outlined:"",solo:"",dense:"",label:"Date From"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},o))]}}]),model:{value:t.menu1,callback:function(e){t.menu1=e},expression:"menu1"}},[t._v(" "),n("v-date-picker",{on:{input:function(e){t.menu1=!1}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-text-field",t._g({staticClass:"pl-2",attrs:{readonly:"",outlined:"",solo:"",dense:"",label:"Date To"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},o))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[t._v(" "),n("v-date-picker",{on:{input:function(e){t.menu2=!1}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)]),t._v(" "),n("div",[n("v-btn",{staticClass:"red darken-1"},[t._v("PDF")]),t._v(" "),n("v-btn",{staticClass:"lime lighten-1"},[t._v("CSV")]),t._v(" "),n("v-btn",{staticClass:"blue lighten-1"},[t._v("Print")])],1)]),t._v(" "),n("v-data-table",{directives:[{name:"permission",rawName:"v-permission",value:"view stock-out",expression:"'view stock-out'"}],attrs:{headers:t.headers,items:t.items},scopedSlots:t._u([{key:"item.action",fn:function(e){var o=e.item;return[n("v-tooltip",{directives:[{name:"permission",rawName:"v-permission",value:"edit stock-out",expression:"'edit stock-out'"}],attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var l=e.on;return[n("v-btn",t._g({attrs:{icon:"",color:"primary",outlined:""},on:{click:function(e){return t.editItem(o)}}},l),[n("v-icon",{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Edit")])]),t._v(" "),n("v-tooltip",{directives:[{name:"permission",rawName:"v-permission",value:"delete stock-out",expression:"'delete stock-out'"}],attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var l=e.on;return[n("v-btn",t._g({attrs:{icon:"",color:"red",outlined:""},on:{click:function(e){return t.deleteItem(o)}}},l),[n("v-icon",{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Delete")])])]}}])})],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VApp:d.a,VAutocomplete:f.a,VBtn:v.a,VCard:m.a,VCardTitle:x.c,VDataTable:y.a,VDatePicker:I.a,VIcon:_.a,VMenu:S.a,VSelect:w.a,VSpacer:D.a,VTextField:k.a,VTooltip:C.a})},394:function(t,e,n){var content=n(395);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("12802b0a",content,!0,{sourceMap:!1})},395:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{-webkit-transition-timing-function:cubic-bezier(0,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{-webkit-transition-duration:.15s;transition-duration:.15s}.v-tooltip__content[class*=leave-active]{-webkit-transition-duration:75ms;transition-duration:75ms}",""])},526:function(t,e,n){var content=n(527);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("a6580db6",content,!0,{sourceMap:!1})},527:function(t,e,n){(t.exports=n(11)(!1)).push([t.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:inherit}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""])},532:function(t,e,n){"use strict";var o=n(4),l=(n(15),n(394),n(157)),c=n(16),r=n(158),h=n(103),d=n(159),f=n(528),v=n(37),m=n(3),x=n(7),y=n(6);e.a=Object(y.a)(c.a,r.a,h.a,d.a,f.a,v.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,l=0;return this.top||this.bottom||n?l=o+e.width/2-content.width/2:(this.left||this.right)&&(l=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(l-=parseInt(this.nudgeLeft)),this.nudgeRight&&(l+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(l,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(o+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(m.g)(this.maxWidth),minWidth:Object(m.g)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(m.r)(this,"activator",!0)&&Object(x.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=l.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===m.w.esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(o.a)(t,this.contentClass,!0),Object(o.a)(t,"menuable__content__active",this.isActive),Object(o.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},538:function(t,e,n){"use strict";n(13),n(9),n(8),n(5),n(10),n(74);var o=n(4),l=(n(526),n(537)),c=n(369),r=n(87),h=n(3);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=f({},l.b,{offsetY:!0,offsetOverflow:!0,transition:!1});e.a=l.a.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:l.a.options.props.menuProps.type,default:function(){return v}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return f({},l.a.options.computed.classes.call(this),{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){return t.filter(e,String(t.internalSearch),String(t.getText(e)))}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=l.a.options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),f({},v,{},t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(i){return t.valueComparator(t.getValue(i),t.getValue(t.internalValue))}))},listData:function(){var data=l.a.options.computed.listData.call(this);return data.props=f({},data.props,{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},methods:{onFilteredItemsChanged:function(t,e){var n=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===h.w.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===h.w.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==h.w.backspace&&t!==h.w.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){if(!this.readonly){var t=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===t){var e=this.selectedItems[this.selectedIndex];if(!this.getDisabled(e)){var n=this.selectedIndex===t?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;-1===n?this.setValue(this.multiple?[]:void 0):this.selectItem(e),this.selectedIndex=n}}else this.selectedIndex=t}},clearableCallback:function(){this.internalSearch=void 0,l.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=c.a.options.methods.genInput.call(this);return input.data=Object(r.a)(input.data,{attrs:{"aria-activedescendant":Object(h.n)(this.$refs.menu,"activeTile.id"),autocomplete:Object(h.n)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=l.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?l.a.options.methods.genSelections.call(this):[]},onClick:function(t){this.isDisabled||(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;l.a.options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){l.a.options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){l.a.options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){l.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){if(-1!==this.selectedIndex){var e=this.selectedItems[this.selectedIndex],n=this.getText(e);t.clipboardData.setData("text/plain",n),t.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",n),t.preventDefault()}}}})}}]);