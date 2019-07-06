import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faUser, faHome, faSyncAlt,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faJs, faVuejs, faGithub, faGithubAlt} from '@fortawesome/free-brands-svg-icons';

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faUser, faHome, faSyncAlt,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faTachometerAlt,
    faJs, faVuejs, faGithub, faGithubAlt);
Vue.component('vue-fontawesome', FontAwesomeIcon);

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {
  defaultIconPack: 'fab',
  defaultIconComponent: 'vue-fontawesome'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
