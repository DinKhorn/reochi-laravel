const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
    modules: [
        '@nuxtjs/axios',
        "@nuxtjs/dotenv",
        '@nuxtjs/pwa',
        '@nuxtjs/vuetify',
        '@nuxtjs/auth',
    ],
    plugins: [
        { src: "~/plugins/quill-editor.js", ssr: false },
        { src: "~/plugins/image-upload.js", ssr: false },
        { src: "~/plugins/DateRangePicker.js", ssr: false },
        { src: "~/plugins/vuetify-snackbar" },
        { src: "~/plugins/laravel-permission" },
        { src: "~/plugins/vee-validate" },
        { src: "~/plugins/notification.js", ssr: false },
        { src: "~/plugins/vue-fullcalendar.js", ssr: false },
        { src: "~/plugins/vue-image-input.js", ssr: false },
        { src: "~/plugins/vue-browser-geolocation.js", ssr: false },
    ],
    router: {
        middleware: ['auth']
    },

    auth: {
        redirect: {
            login: '/auth/login',
            logout: '/auth/login',
            home: '/',
            // callback: '/login'
        },
        vuex: {
            namespace: 'auth', // Vuex store namespace for keeping state.
        },
        strategies: {
            password_grant: {
                _scheme: "local",
                endpoints: {
                    login: {
                        url: "/oauth/token",
                        method: "post",
                        propertyName: "access_token"
                    },
                    logout: false,
                    user: {
                        url: "/api/auth/me"
                    }
                }
            },
        }
    },
});