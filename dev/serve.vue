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
							:toggleable="toggleable"
							:rules="[min_rule]"
							:show_strength="show_strength"
							:counter="show_counter"
							:loading="loading"
							:append-icon="selected_append_icon"
							maxlength="100"
						/>
					</v-col>
					<v-col
						cols="12"
						md="6"
					>
						<!-- <v-btn @click="randomize">Randomize Password</v-btn> -->

						<v-checkbox
							v-model="toggleable"
							label="Toggleable"
						></v-checkbox>
						<v-combobox
							v-model="selected_append_icon"
							:items="icons"
							label="append-icon"
							outlined
							dense
						></v-combobox>
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

@Component({
	components: {
		PasswordInput,
	}
})
export default class Home extends Vue {
	public password: string = '';

	public toggleable: boolean = false;
	public selected_append_icon: string | null = null;
	public icons: Array<string | null> = [
		'mdi-key',
		'mdi-key-variant',
		'mdi-account-key',
	]
	public show_counter: boolean = false;
	public show_strength: boolean = false;
	public loading: boolean = false;

	public min_rule(value: string): boolean {
		return value.length > 8;
	}

	public randomize() {

		const LENGTH = 50;
		const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
		let password = '';

		for (let i = 0; i < LENGTH; i++)
			password += str[(Math.random() * str.length) | 0]

		this.password = password
	}
}
</script>
