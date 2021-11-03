# vuetify-password-input
A password input made with vuetify

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

	public calc_strength(password: string) {
		return zxcvbn(password).score;
	}
}
</script>
```
