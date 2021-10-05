<script setup lang="ts">
import { ref } from 'vue';
import init from '../wasm/test.wasm';
import Go from '../wasm/wasm-exec.js';

const go = new Go(window);
const button = ref<HTMLButtonElement | null>(null);

init(go.importObject).then(async (exports) => {
  const instance = { exports };
  if (button.value) {
    button.value.addEventListener('click', () => {
      (window as any).calculateGo(10000);
    });
  }
  await go.run(instance);
});
</script>

<template>
  <div>
    <button ref="button">test</button>
  </div>
</template>

<style scoped></style>
