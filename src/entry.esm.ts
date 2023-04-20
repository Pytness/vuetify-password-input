import PasswordStrength from "@/components/password-strength.vue";
import VuetifyPasswordInput from "@/vuetify-password-input.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

class VuetifyPasswordInputPlugin {
	public install(vue: typeof Vue, _?: any) {
		vue.component("VPasswordInput", VuetifyPasswordInput);
	}
}

export { PasswordStrength, VuetifyPasswordInput };

export default new VuetifyPasswordInputPlugin();
