<script lang="ts">
import Vue from 'vue';
import VuetifyPasswordInput from '@/vuetify-password-input.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VuetifyPasswordInput
  }
});
</script>

<template>
  <div id="app">
    <vuetify-password-input />
  </div>
</template>
