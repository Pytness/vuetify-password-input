<template>
	<v-text-field
		v-bind="$attrs"
		:value="value"
		v-on="$listeners"
		@input="on_input"
		@change="calc_strength(value)"
		:type="show_password ? 'text' : 'password'"
		:append-icon="final_append_icon"
		@click:append="append_click_event"
		:loading="loading || show_strength"
	>
		<template #progress>
			<v-progress-linear
				v-if="loading"
				indeterminate
				absolute
			/>
			<password-strength
				v-else-if="show_strength"
				:class="loading ? 'mt-2' : ''"
				v-model="strength"
				:colors="colors"
			/>
		</template>
	</v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import PasswordStrength from "@/components/password-strength.vue";

type StrengthFunction = (value: string) => number;

@Component({
	components: {
		PasswordStrength,
	},
})
export default class PasswordInput extends Vue {
	@Prop({ default: "" })
	public value!: string;

	@Prop({ default: false })
	public loading!: boolean;

	@Prop({ default: false })
	public show_strength!: boolean;

	@Prop({ default: null })
	public appendIcon!: string;

	@Prop({ default: false })
	public toggleable!: boolean;

	@Prop({ default: false })
	public show_password!: boolean;

	// Number between 0 and 1, or -1 if empty
	public strength: number = -1;

	@Prop({ default: null })
	public strength_function!: StrengthFunction | null;

	public colors: string[] = ["red", "orange", "yellow", "green"];

	get append_click_event() {
		if (!this.toggleable)
			return false;

		return this.toggle_show_password;
	}

	get final_append_icon() {
		if (this.toggleable)
			return this.show_password ? 'mdi-eye' : 'mdi-eye-off'

		return this.appendIcon;
	}

	public toggle_show_password() {
		this.show_password = !this.show_password;
	}

	public on_input(value: string) {
		this.$emit("input", value);
	}

	@Watch("value", { immediate: true })
	public on_value_change(new_value: string, _: string) {
		if (this.show_strength)
			this.calc_strength(new_value);
	}

	@Watch("show_strength", { immediate: true })
	public on_show_strength_change(new_value: boolean, _: string) {
		if (new_value === true)
			this.calc_strength(this.value);
	}

	public calc_strength(value: string) {

		if (this.strength_function === null)
			return;

		if (value.length === 0)
			this.strength = -1
		else
			this.strength = this.strength_function(value);
	}
}
</script>
