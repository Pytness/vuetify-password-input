<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
			dense
		>
			<v-app-bar-title>vuetify-password-input</v-app-bar-title>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row justify="space-between">
					<v-col
						cols="12"
						md="4"
					>
						<PasswordInput
							v-model="password"
							:label="label"
							:toggleable="toggleable"
							:rules="selected_rules"
							:show_strength="show_strength"
							:counter="show_counter"
							:loading="loading"
							:append-icon="selected_append_icon"
							:maxlength="max_length == 0 ? null : max_length"
						/>
					</v-col>
					<v-col
						cols="12"
						md="6"
					>
						<v-text-field
							v-model="label"
							label="Label"
						/>
						<v-checkbox
							v-model="toggleable"
							label="Toggleable"
						></v-checkbox>
						<v-select
							v-model="selected_append_icon"
							:items="icons"
							label="append-icon"
							clearable
							dense
						></v-select>
						<v-checkbox
							v-model="show_counter"
							label="Show counter"
						></v-checkbox>

						<v-checkbox
							v-model="show_strength"
							label="Show strength"
						></v-checkbox>
						<v-checkbox
							v-model="loading"
							label="Loading"
						></v-checkbox>
						<v-slider
							v-model="max_length"
							thumb-label
							label="Max length"
						></v-slider>
						<v-select
							label="Rules"
							v-model="selected_rules"
							:items="rules"
							multiple
							dense
							clearable
						></v-select>
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

import PasswordInput from '@/vuetify-password-input.vue'
import { DataTableHeader } from 'vuetify'

type Rule = (value: string) => boolean | string;
interface RuleTableHeader<T = any> extends Omit<DataTableHeader<T>, 'value'> {
	value: Rule;
};


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
	public icons: Array<string | null> = [
		'mdi-key',
		'mdi-key-variant',
		'mdi-account-key',
	];

	public show_counter: boolean = false;
	public show_strength: boolean = false;
	public loading: boolean = false;
	public max_length: number = 0;

	public selected_rules: Rule[] = [];
	public rules: RuleTableHeader[] = [
		{
			text: 'Required',
			value: (value: string) => {
				return value.length > 0 || 'This field is required'
			}
		},
		{
			text: 'Min Length',
			value: (value: string) => {
				return value.length > 8 || 'Not enough characters'
			}
		}
	];
}
</script>
