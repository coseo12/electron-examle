import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (mode === 'production') {
    return {
      base: path.resolve(__dirname, './dist'),
      plugins: [vue()],
    };
  } else {
    return {
      base: './',
      plugins: [vue()],
      server: {
        host: '0.0.0.0',
      },
    };
  }
});
