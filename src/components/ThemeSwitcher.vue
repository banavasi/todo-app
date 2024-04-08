<template>
  <button @click="toggleDarkMode">
    <img v-if="isDarkMode" src="../assets/img/icon-moon.svg" alt="" />
    <img v-else src="../assets/img/icon-sun.svg" alt="" />
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from "../composables/useTheme";
const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<style scoped></style>
