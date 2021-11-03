import Vue from 'vue';
import Vuetify from 'vuetify';
import VuetifyPasswordInput from '@/vuetify-password-input.vue';
import PasswordStrength from '@/components/password-strength.vue';


Vue.use(Vuetify)

class VuetifyPasswordInputPlugin {
	public install(vue: typeof Vue, _?: any) {
		vue.component('VPasswordInput', VuetifyPasswordInput);
	}
}

export {
	VuetifyPasswordInput,
	PasswordStrength
}

export default new VuetifyPasswordInputPlugin();
