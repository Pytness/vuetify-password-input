<template>
	<v-app>
		<v-app-bar app color="primary" dark dense>
			<v-app-bar-title>vuetify-password-input</v-app-bar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="toggle_dark_mode">
				<v-icon>{{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row justify="space-between">
					<v-col cols="12" md="4">
						<PasswordInput v-model="password" :label="label" :toggleable="toggleable"
							:rules="selected_rules" :show_strength="show_strength"
							:strength_function="selected_strength_function" :counter="show_counter"
							:loading="loading" :prepend-icon="selected_prepend_icon"
							:append-icon="selected_append_icon"
							:maxlength="max_length == 0 ? null : max_length" />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="label" label="Label" />
						<v-checkbox v-model="toggleable" label="Toggleable"></v-checkbox>
						<v-select v-model="selected_prepend_icon" :items="icons" label="prepend-icon"
							clearable dense></v-select>
						<v-select v-model="selected_append_icon" :items="icons" label="append-icon"
							clearable dense></v-select>
						<v-checkbox v-model="show_counter" label="Show counter"></v-checkbox>
						<v-slider v-model="max_length" thumb-label label="Max length"></v-slider>
						<v-checkbox v-model="loading" label="Loading"></v-checkbox>
						<v-checkbox v-model="show_strength" label="Show strength"></v-checkbox>
						<v-select label="Strength Function" v-model="selected_strength_f_key"
							:items="strength_function_keys" clearable></v-select>
						<v-select label="Rules" v-model="selected_rule_keys" :items="rule_keys" multiple
							clearable></v-select>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">


import {
	Component,
	Vue
} from 'vue-property-decorator';

import { AnyStrengthFunction } from '@/components/strength-types';
import PasswordInput from '@/vuetify-password-input.vue';

import zxcvbn from 'zxcvbn';


type Rule = (value: string) => boolean | string;


function calc_entropy(password: string) {
	if (password.length === 0)
		return 0;

	const count_map: Record<string, number> = {};

	for (let char of password) {
		if (char in count_map === false)
			count_map[char] = 0;

		count_map[char] += 1;
	}

	const probs = Object.values(count_map).map(
		(count) => count / password.length
	);

	const entropy = probs
		.map((p) => Math.log2(1 / p) / (1 / p))
		.reduce((a, b) => a + b);

	const printable_char_count = 96;
	return Math.round(entropy / Math.log2(printable_char_count) * 4);
}

@Component({
	components: {
		PasswordInput,
	}
})
export default class Home extends Vue {
	public password: string = '';

	public label: string = 'Password';
	public toggleable: boolean = false;

	public selected_append_icon: string | null = null;
	public selected_prepend_icon: string | null = null;
	public icons: Array<string | null> = [
		'mdi-key',
		'mdi-key-variant',
		'mdi-account-key',
	];

	public show_counter: boolean = false;
	public show_strength: boolean = false;
	public loading: boolean = false;
	public max_length: number = 0;

	public rules: Record<string, Rule> = {
		'Required': (value: string) => {
			return value.length > 0 || 'This field is required'
		},
		'Min length': (value: string) => {
			return value.length > 8 || 'You need at least 8 characters'
		}
	};

	public strength_functions: Record<string, AnyStrengthFunction> = {
		'Shannon entropy': calc_entropy,
		'Zxcvbn': (value: string) => zxcvbn(value).score,
		'Async Zxcvbn with loading': async (value: string) => {
			await new Promise<void>((resolve, _) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			return zxcvbn(value).score
		}
	};

	public selected_rule_keys: string[] = [];
	public selected_strength_f_key: string | null = null;

	get rule_keys(): string[] {
		return Object.keys(this.rules);
	}

	get strength_function_keys(): string[] {
		return Object.keys(this.strength_functions);
	}

	get selected_rules(): Rule[] {
		return this.selected_rule_keys.map(key => this.rules[key]);
	}

	get selected_strength_function(): AnyStrengthFunction | null {
		if (this.selected_strength_f_key !== null)
			return this.strength_functions[this.selected_strength_f_key];

		return null;
	}

	toggle_dark_mode() {
		this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
	}
}
</script>
