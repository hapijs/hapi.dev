declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // oxlint-disable-next-line typescript/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.css' {}
