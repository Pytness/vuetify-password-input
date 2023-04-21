# vuetify-password-input
A password input made with vuetify

# Demo
https://pytness.github.io/vuetify-password-input/

# Installation
```bash
$ npm install vuetify-password-input

# Password strenght fucntion
$ npm install zxcvbn
```

# Usage
_plugins/vuetify-password-input.ts_

```typescript
import Vue from 'vue'
import PasswordInputPlugin from 'vuetify-password-input'
import { VTextField } from 'vuetify/lib'

Vue.use(PasswordInputPlugin, {
	components: { VTextField }
});

export default PasswordInputPlugin
```

_App.vue_
```vue
<template>
	<v-main>
		<v-container>
			<v-row>
				<v-col cols="12" md="4">
					<v-password-input
						v-model="password"
						toggleable
						counter
						show_strength
						:strength_function="calc_strength"
						:rules="[min_rules]"
					/>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>


<script lang="ts">
import {
	Component,
	Vue
} from 'vue-property-decorator';

import zxcvbn from 'zxcvbn'

@Component({})
export default class App extends Vue {
	public password: string = '';

	public min_rule(value: string): boolean | string {
		return value.length > 8 || 'Password must be at least 8 characters long';
	}

	public calc_strength(value: string) {
		return zxcvbn(value).score;
	}
}
</script>
```


# Documentation

## Properties
* `toggleable: boolean` : Enables password visibility toggling if `true`.

* `loading: boolean` : Enables loading animation. Has priority over `show_strength`.

* `show_strength: boolean` : Displays a 4-segment bar in the `progress` slot if `true`. Needs `strength_function` to work. 

* `strength_function: (password: string) => 0, 1, 2, 3, 4` : A function that returns a strength value for a given password. If this function is `async`, the `loading` property will be set to `true` while it executes.

* `append-icon: string` : Passed to `v-text-field` by default unless `toggleable` is `true`, in which case this will be overriden by `mdi-eye/mdi-eye-off`.

Any other properties will be handled by the inner `v-text-field`
