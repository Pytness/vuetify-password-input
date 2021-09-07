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
		:loading="is_loading || show_strength"
	>
		<template #progress>
			<v-progress-linear
				v-if="is_loading"
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


import PasswordStrength, { AnyStrengthFunction } from "@/components/password-strength.vue";

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

	public get is_loading(): boolean {
		return (this.show_strength && this.current_promise !== null) || this.loading;
	};

	@Prop({ default: false })
	public show_strength!: boolean;

	@Prop({ default: null })
	public appendIcon!: string;

	@Prop({ default: false })
	public toggleable!: boolean;

	public show_password: boolean = false;

	// Number between 0 and 1, or -1 if empty
	public strength: number = -1;

	@Prop({ default: null })
	public strength_function!: AnyStrengthFunction | null;
	public current_promise: Promise<any> | null = null;
	public abort_controller = new AbortController();

	public colors: string[] = ["red", "orange", "yellow", "green"];

	get append_click_event() {
		if (!this.toggleable)
			return false;

		return this.toggle_show_password;
	}

	get final_append_icon() {
		if (this.toggleable)
			return this.show_password ?
				'mdi-eye' : 'mdi-eye-off'

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

	@Watch("strength_function")
	public on_show_strength_function_change(_: any) {
		this.calc_strength(this.value);
	}

	public async calc_strength(value: string) {
		if (this.strength_function === null || value.length === 0) {
			this.strength = -1;
			return
		}

		if (this.abort_controller !== null && this.is_loading)
			this.abort_controller.abort();

		this.abort_controller = new AbortController();
		const signal = this.abort_controller.signal;

		const returned_value = this.strength_function(value, signal);
		const isAsyncFunction = returned_value instanceof Promise;

		if (isAsyncFunction) {
			const local_promise = new Promise<number>((resolve, reject) => {
				const strength_promise = <Promise<number>>returned_value;
				strength_promise.then(resolve);

				signal.addEventListener('abort', () =>
					reject(new DOMException('Aborted because of newer promise', 'AbortError'))
				);

			}).then((strength) =>
				this.strength = strength
			).catch(error => {
				if (error.name !== 'AbortError')
					throw error
			});

			this.current_promise = local_promise;

			local_promise.finally(() => {
				if (local_promise === this.current_promise)
					this.current_promise = null;
			})

			await local_promise;
		} else
			this.strength = <number>returned_value;
	}
}
</script>
