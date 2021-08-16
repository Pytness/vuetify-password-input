<template>
	<v-text-field
		v-bind="$attrs"
		:value="value"
		v-on="$listeners"
		@input="on_input"
		@change="calc_strength(value)"
		:type="show_password ? 'text' : 'password'"
		:append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
		@click:append="show_password = !show_password"
		:loading="loading || show_strength"
	>
		<template #progress>
			<v-progress-linear
				v-if="loading"
				indeterminate
				absolute
			/>
			<password-strength
				v-if="show_strength"
				:class="loading ? 'mt-2' : ''"
				v-model="strength"
				:colors="colors"
			/>
		</template>
	</v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import password_checker from "zxcvbn";

import PasswordStrength from "@/components/password-strength.vue";

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

	public show_password: boolean = false;

	public strength: number = -1;

	public colors: string[] = ["red", "orange", "yellow", "green"];


	private calculate_strength(value: string): number {
		const response = password_checker(value);
		const guesses = response.guesses_log10;

		console.log("response", response);

		if (guesses === 0)
			return -1;

		const strength = Math.floor(
			(guesses / 50) * this.colors.length
		);
		console.log("strength", strength);

		return strength;
	}

	public on_input(value: string) {
		this.$emit("input", value);
	}

	@Watch("value", { immediate: true })
	public on_value_change(new_value: string, _: string) {
		this.calc_strength(new_value);
	}

	@Watch("show_strength", { immediate: true })
	public on_show_strength_change(new_value: boolean, _: string) {
		if (new_value === true)
			this.calc_strength(this.value);
	}

	public calc_strength(value: string) {
		if (this.show_strength)
			this.strength = this.calculate_strength(value);
	}

	public calc_entropy(password: string) {
		if (password.length === 0)
			return 0;

		const count_map: Record<string, number> = {};

		for (let char of password) {
			if (char in count_map == false)
				count_map[char] = 0;

			count_map[char] += 1;
		}

		const probs = Object.values(count_map).map(
			(count) => count / password.length
		);

		const entropy = probs
			.map((p) => Math.log2(1 / p) / (1 / p))
			.reduce((a, b) => a + b);

		console.log("count map", count_map);
		console.log("entropy", entropy);

		return entropy;
	}

	mounted() {
		// this.strength = this.calculate_strength(this.value);
		// this.strength = this.calculate_strength(value);
	}
}
</script>
