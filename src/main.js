import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

library.add(faCartShopping);

createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(router)
    .mount('#app')
