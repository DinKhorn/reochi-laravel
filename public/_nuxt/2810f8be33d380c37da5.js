(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{953:function(t,e,r){"use strict";r.r(e);r(52);var n=r(19),o=(r(724),{layout:"auth",data:function(){return{loading:!1,auth:{username:"administrator@mail.com",password:"secret"}}},methods:{login:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$auth.loginWith("password_grant",{data:{grant_type:"password",client_id:4,client_secret:"FXRgKyggjxEpeghEXkMQIiVamQMT52jeT4buRRWF",scope:"*",username:t.auth.username,password:t.auth.password}}).then(Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/api/auth/permissions");case 2:return r=e.sent,n=r.data,e.next=6,t.$axios.get("/api/auth/roles");case 6:o=e.sent,c=o.data,t.$laravel.setPermissions(n),t.$laravel.setRoles(c),t.loading=!1;case 11:case"end":return e.stop()}}),e)}))));case 4:e.next=10;break;case 6:e.prev=6,e.t0=e.catch(1),t.loading=!1,t.$toast.error(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[1,6]])})))()}}}),c=r(31),l=r(102),d=r.n(l),v=r(380),m=r(167),f=r(147),h=r(66),w=r(393),x=r(541),V=r(382),_=r(372),k=r(933),R=r(143),$=r(396),y=r(384),C=r(369),T=r(42),j=r(120),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"inspire"}},[r("v-content",[r("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[r("v-card",{staticClass:"elevation-12"},[r("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[r("v-toolbar-title",[t._v("Login form")]),t._v(" "),r("v-spacer")],1),t._v(" "),r("v-card-text",[r("v-form",{on:{submit:function(e){return t.login()}}},[r("v-text-field",{attrs:{label:"Login","prepend-icon":"mdi-account",type:"text"},model:{value:t.auth.username,callback:function(e){t.$set(t.auth,"username",e)},expression:"auth.username"}}),t._v(" "),r("v-text-field",{attrs:{id:"password",label:"Password","prepend-icon":"mdi-lock",type:"password"},model:{value:t.auth.password,callback:function(e){t.$set(t.auth,"password",e)},expression:"auth.password"}})],1)],1),t._v(" "),r("v-divider"),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"primary",loading:t.loading},on:{click:function(e){return t.login()}}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-login")]),t._v("Login\n\t\t\t\t\t\t\t")],1),t._v(" "),r("v-spacer")],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VApp:v.a,VBtn:m.a,VCard:f.a,VCardActions:h.a,VCardText:h.b,VCol:w.a,VContainer:x.a,VContent:V.a,VDivider:_.a,VForm:k.a,VIcon:R.a,VRow:$.a,VSpacer:y.a,VTextField:C.a,VToolbar:T.a,VToolbarTitle:j.b})}}]);