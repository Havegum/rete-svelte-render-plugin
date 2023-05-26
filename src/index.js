import './variables.css';
import { Scope } from 'rete';

import { getRenderer } from './renderer';
export * as Presets from './presets';

export class SvelteRenderPlugin extends Scope {
  renderer = null;
  presets = [];
  owners = new WeakMap();

  constructor() {
    super('svelte-render');
    this.renderer = getRenderer();

    this.addPipe(context => {
      if (!context || typeof context !== 'object' || !('type' in context)) {
        return context;
      }
      if (context.type === 'unmount') {
        this.unmount(context.node);
        return context;
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context;
        }

        if (this.mount(context.data.element, context)) {
          return {
            ...context,
            data: {
              ...context.data,
              filled: true,
            },
          };
        }
      }

      return context;
    });
  }

  setParent(scope) {
    super.setParent(scope);
    for (const preset of this.presets) {
      if (preset.attach) {
        preset.attach(this);
      }
    }
  }

  unmount(element) {
    this.owners.delete(element);
    this.renderer.unmount(element);
  }

  mount(element, context) {
    const existing = this.renderer.get(element);
    const parent = this.parentScope();

    if (existing) {
      for (const preset of this.presets) {
        if (this.owners.get(element) !== preset) {
          continue;
        }

        const result = preset.update(context, this);

        if (result) {
          this.renderer.update(existing, result);
        }
      }

      return true;
    }

    for (const preset of this.presets) {
      const result = preset.render(context, this);

      if (!result) {
        continue;
      }

      this.renderer.mount(element, result.component, result.props, () =>
        // @ts-ignore
        parent.emit({ type: 'rendered', data: context.data })
      );

      this.owners.set(element, preset);
      return true;
    }
  }

  addPreset(preset) {
    const local = preset;

    if (local.attach) {
      local.attach(this);
    }

    this.presets.push(local);
  }
}
