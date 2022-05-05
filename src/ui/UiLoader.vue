<template>
  <div class="ui-loader"></div>
</template>

<style scoped>
.ui-loader {
  display: inline-block;
  width: 5em;
  height: 5em;
}
.ui-loader:after {
  content: "";
  display: block;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  border-width: 0.5em;
  border-style: solid;
  border-color: darkgrey transparent darkgrey transparent;
  animation: ui-loader 1.2s linear infinite;
}
@keyframes ui-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
