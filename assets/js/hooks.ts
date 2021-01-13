import type { SvelteComponent } from 'svelte';

const hooks = {
  'svelte-component': {
    mounted(this: { el: HTMLElement, _instance: SvelteComponent | null }) {
      const componentName = this.el.getAttribute('data-name');
      if (!componentName) {
        throw new Error('Component name must be provided');
      }

      const requiredApp = require(`./${componentName}.svelte`);
      if (!requiredApp) {
        throw new Error(`Unable to find ${componentName} component`);
      }

      const props = this.el.getAttribute('data-props');
      const parsedProps = props ? JSON.parse(props) : {};

      this._instance = new requiredApp.default({
        target: this.el,
        props: parsedProps,
      });
    },

    destroyed() {
      this._instance?.$destroy();
    }
  },
}

export default hooks;
