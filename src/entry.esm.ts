import Vue from 'vue';
import Vuetify, { VTextField } from 'vuetify/lib';
// Import vue component
import component from '@/vuetify-password-input.vue';

Vue.use(Vuetify, {
	components: {
		VTextField
	}
})

class Plugin {
	public install(vue: typeof Vue, _?: any) {
		vue.component('VPasswordInput', component);
	}
}

export default new Plugin();
