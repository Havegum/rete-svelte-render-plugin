export type Renderer<I> = {
  get(target: Element): I | undefined;
  mount<P>(target: Element, SvelteComponent: any, props: P, onRendered: any): I;
  update<P>(app: I, props: P): void;
  unmount(element: Element): void;
};

export function getRenderer<I>(): Renderer<I> {
  const instances = new Map<Element, I>();

  return {
    get(target) {
      return instances.get(target);
    },

    mount(target, SvelteComponent, props, onRendered) {
      const app = new SvelteComponent({ target, props });
      instances.set(target, app);
      if (typeof onRendered === 'function') {
        onRendered();
      }
      return app;
    },

    update(app, props) {
      // @ts-ignore
      app.$set(props);
    },

    unmount(element) {
      const app = instances.get(element);

      if (app) {
        // @ts-ignore
        app.$destroy();
        instances.delete(element);
      }
    },
  };
}
