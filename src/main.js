import './assets/main.css'
import './assets/index.css'
import './assets/nprogress.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './registerServiceWorker'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: localStorage.getItem("data-theme") || 'light',
    },
    display: {
        mobileBreakpoint: 'xl',
        thresholds: {
            xs: 0,
            sm: 340,
            md: 540,
            lg: 800,
            xl: 1280,
        },
    },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
