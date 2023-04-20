import vuetify from '@/plugins/vuetify';
import Vue, { VNode } from 'vue';
import 'vuetify/dist/vuetify.min.css';
import Dev from './serve.vue';

Vue.config.productionTip = false;

// insert stylesheets

const stylesheets = [
	"https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
	"https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"
];


for (const href of stylesheets) {
	const link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', href);

	document.head.appendChild(link);
}

new Vue({
	vuetify,
	render: (h): VNode => h(Dev),
}).$mount('#app');
