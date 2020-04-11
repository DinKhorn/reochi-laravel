import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_5ae7da7c from 'nuxt_plugin_plugin_5ae7da7c' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_workbox_a2b5fd1e from 'nuxt_plugin_workbox_a2b5fd1e' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_6a31c0d3 from 'nuxt_plugin_nuxticons_6a31c0d3' // Source: .\\nuxt-icons.js (mode: 'all')
import nuxt_plugin_axios_07c59d95 from 'nuxt_plugin_axios_07c59d95' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_quilleditor_dc45d328 from 'nuxt_plugin_quilleditor_dc45d328' // Source: ..\\resources\\nuxt\\plugins\\quill-editor.js (mode: 'client')
import nuxt_plugin_imageupload_8113ffa4 from 'nuxt_plugin_imageupload_8113ffa4' // Source: ..\\resources\\nuxt\\plugins\\image-upload.js (mode: 'client')
import nuxt_plugin_DateRangePicker_6ada1350 from 'nuxt_plugin_DateRangePicker_6ada1350' // Source: ..\\resources\\nuxt\\plugins\\DateRangePicker.js (mode: 'client')
import nuxt_plugin_vuetifysnackbar_01eab2da from 'nuxt_plugin_vuetifysnackbar_01eab2da' // Source: ..\\resources\\nuxt\\plugins\\vuetify-snackbar (mode: 'all')
import nuxt_plugin_laravelpermission_07277359 from 'nuxt_plugin_laravelpermission_07277359' // Source: ..\\resources\\nuxt\\plugins\\laravel-permission (mode: 'all')
import nuxt_plugin_veevalidate_6e5ad03a from 'nuxt_plugin_veevalidate_6e5ad03a' // Source: ..\\resources\\nuxt\\plugins\\vee-validate (mode: 'all')
import nuxt_plugin_notification_0f206214 from 'nuxt_plugin_notification_0f206214' // Source: ..\\resources\\nuxt\\plugins\\notification.js (mode: 'client')
import nuxt_plugin_vuefullcalendar_de1442e6 from 'nuxt_plugin_vuefullcalendar_de1442e6' // Source: ..\\resources\\nuxt\\plugins\\vue-fullcalendar.js (mode: 'client')
import nuxt_plugin_vueimageinput_5c12573c from 'nuxt_plugin_vueimageinput_5c12573c' // Source: ..\\resources\\nuxt\\plugins\\vue-image-input.js (mode: 'client')
import nuxt_plugin_vuebrowsergeolocation_646f1793 from 'nuxt_plugin_vuebrowsergeolocation_646f1793' // Source: ..\\resources\\nuxt\\plugins\\vue-browser-geolocation.js (mode: 'client')
import nuxt_plugin_plugin_098c4984 from 'nuxt_plugin_plugin_098c4984' // Source: .\\auth\\plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"meta":[{"hid":"charset","charset":"utf-8"},{"hid":"viewport","name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"description","name":"description","content":"\u003Cp align=\"center\"\u003E\u003Cimg src=\"https:\u002F\u002Fres.cloudinary.com\u002Fdtfbvvkyp\u002Fimage\u002Fupload\u002Fv1566331377\u002Flaravel-logolockup-cmyk-red.svg\" width=\"400\"\u003E\u003C\u002Fp\u003E"},{"hid":"theme-color","name":"theme-color","content":"black"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:description","name":"og:description","property":"og:description","content":"\u003Cp align=\"center\"\u003E\u003Cimg src=\"https:\u002F\u002Fres.cloudinary.com\u002Fdtfbvvkyp\u002Fimage\u002Fupload\u002Fv1566331377\u002Flaravel-logolockup-cmyk-red.svg\" width=\"400\"\u003E\u003C\u002Fp\u003E"}],"link":[{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.22354845.json"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_plugin_5ae7da7c === 'function') {
    await nuxt_plugin_plugin_5ae7da7c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_a2b5fd1e === 'function') {
    await nuxt_plugin_workbox_a2b5fd1e(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_6a31c0d3 === 'function') {
    await nuxt_plugin_nuxticons_6a31c0d3(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_07c59d95 === 'function') {
    await nuxt_plugin_axios_07c59d95(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_quilleditor_dc45d328 === 'function') {
    await nuxt_plugin_quilleditor_dc45d328(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_imageupload_8113ffa4 === 'function') {
    await nuxt_plugin_imageupload_8113ffa4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_DateRangePicker_6ada1350 === 'function') {
    await nuxt_plugin_DateRangePicker_6ada1350(app.context, inject)
  }

  if (typeof nuxt_plugin_vuetifysnackbar_01eab2da === 'function') {
    await nuxt_plugin_vuetifysnackbar_01eab2da(app.context, inject)
  }

  if (typeof nuxt_plugin_laravelpermission_07277359 === 'function') {
    await nuxt_plugin_laravelpermission_07277359(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_6e5ad03a === 'function') {
    await nuxt_plugin_veevalidate_6e5ad03a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_notification_0f206214 === 'function') {
    await nuxt_plugin_notification_0f206214(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuefullcalendar_de1442e6 === 'function') {
    await nuxt_plugin_vuefullcalendar_de1442e6(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueimageinput_5c12573c === 'function') {
    await nuxt_plugin_vueimageinput_5c12573c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuebrowsergeolocation_646f1793 === 'function') {
    await nuxt_plugin_vuebrowsergeolocation_646f1793(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_098c4984 === 'function') {
    await nuxt_plugin_plugin_098c4984(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
