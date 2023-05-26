Svelte Render
====
#### Rete.js plugin

This experimental plugin integrates [Rete.js](https://retejs.org/) with Svelte components, allowing you to render the graph using Svelte. As it is still in the early stages, be prepared for bugs and rough edges. Expect dragons.

This plugin targets rete@next (2.0.0-beta.9, at the time of writing). Existing Svelte plugins predominantly target the first version of Rete.

Drawing inspiration from the [Vue Render plugin](https://github.com/retejs/vue-render-plugin/tree/next), this implementation does not use pug and sass since this author has little familiarity with them. This decision might affect how styling works.

Currently, no examples are available, and Typescript support has been dropped in favour of just getting the thing working.

Expect no maintenance. This is a stopgap.