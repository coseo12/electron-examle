<script setup lang="ts">
import { ref } from 'vue';

const themeSource = ref<HTMLSpanElement | null>(null);

const onDarkMode = async () => {
  const isDarkMode = await window.darkMode.toggle();
  if (isDarkMode && themeSource.value) {
    themeSource.value.innerText = isDarkMode ? 'Dark' : 'light';
  }
};

const onSystemMode = async () => {
  if (!themeSource.value) {
    return;
  }
  await window.darkMode.system();
  themeSource.value.innerText = 'System';
};
</script>

<template>
  <div class="container">
    <h1>Dark mode control</h1>
    <p>
      Current theme source:
      <strong><span ref="themeSource">System</span></strong>
    </p>

    <button @click="onDarkMode">Toggle Dark Mode</button>
    <button @click="onSystemMode">Reset to System Theme</button>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .container {
    background: #333;
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  .container {
    background: #ddd;
    color: black;
  }
}
</style>
