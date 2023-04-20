<template>
	<div role="progressbar"
		class="v-progress-linear v-progress-linear--absolute v-progress-linear--rounded v-progress-linear--visible"
		style="height: 4px">
		<v-row>
			<v-col v-for="(color, index) in colors" :key="color" :cols="12 / colors.length" class="px-1">
				<div :class="get_bar_classes(index)" style="height: 4px"></div>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "PasswordStrength",
})
export default class PasswordStrength extends Vue {
	@Prop({ type: Number, default: -1 })
	public value!: number;

	@Prop({ type: String, default: "blue-grey lighten-4" })
	public backgroundColor!: string;

	@Prop({
		default: function () {
			return ["red", "orange", "amber", "lime", "light-green", "green"];
		},
	})
	public colors!: string[];

	public get_index_color(index: number): string {
		const color_index =
			this.value >= this.colors.length ? this.colors.length - 1 : this.value;

		if (index < 0 || index > this.value) return this.backgroundColor;

		return this.colors[color_index];
	}

	public get_bar_classes(index: number) {
		return [
			"v-progress-linear",
			"progress-segment",
			this.get_index_color(index),
		];
	}

	public on_input(value: string) {
		this.$emit("input", value);
	}
}
</script>

<style>
.progress-segment {
	width: 100% !important;
	position: initial !important;
}
</style>
