import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import UUID from 'vue-uuid';
import moment from 'vue-moment';

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
Vue.component('v-icon', Icon);

Vue.use(UUID);
Vue.use(moment);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
