import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons'
import Toaster from '@meforma/vue-toaster';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

library.add(faCartShopping);
library.add(faXmark)

createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(router)
    .use(Toaster)
    .use(VueSweetalert2)
    .mount('#app')