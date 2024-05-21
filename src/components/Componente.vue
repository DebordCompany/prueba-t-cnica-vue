<script setup>
const props = defineProps(["title"]);
const getConsole = () => {
  console.log("hola");
};
</script>

<template>
  <button class="button" @click="getConsole">{{ title }}</button>
</template>
