import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Leaflet
import { LMap, LTileLayer, LMarker, LControl, LFeatureGroup } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-control', LControl);
Vue.component('l-featuregroup', LFeatureGroup);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Font awesome
//
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub,faExclamationTriangle);
Vue.component('vue-fontawesome', FontAwesomeIcon);

import Buefy from 'buefy'
import 'buefy/dist/buefy.min.css'

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
