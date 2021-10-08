/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type DarkMode = {
  toggle(): boolean;
  system(): void;
};

interface Window {
  calculateGo: (n: number) => void;
  darkMode: DarkMode;
}
