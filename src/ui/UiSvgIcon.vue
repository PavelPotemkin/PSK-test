<script setup lang="ts">
const props = defineProps<{
  iconName: string;
}>();

let icon = require(`@/assets/icons/${props.iconName}.svg`);
if (Object.prototype.hasOwnProperty.call(icon, "default")) {
  icon = icon.default;
}

const iconPath = icon.url;
</script>

<template>
  <svg class="ui-svg-icon" xmlns="http://www.w3.org/2000/svg">
    <use :href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<style scoped>
.ui-svg-icon {
  width: 1em;
  height: 1em;
}
</style>
