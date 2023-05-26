import { ClassicPreset } from 'rete';
import {
  classicConnectionPath,
  getDOMSocketPosition,
  loopConnectionPath,
} from 'rete-render-utils';

import Connection from './components/Connection.svelte';
import ConnectionWrapper from './components/ConnectionWrapper.svelte';
import Node from './components/Node.svelte';
import Socket from './components/Socket.svelte';
import Control from './components/Control.svelte';

export { default as Connection } from './components/Connection.svelte';
export { default as Control } from './components/Control.svelte';
export { default as Node } from './components/Node.svelte';
export { default as Socket } from './components/Socket.svelte';

export function setup(props) {
  const positionWatcher =
    typeof props?.socketPositionWatcher === 'undefined'
      ? getDOMSocketPosition()
      : props.socketPositionWatcher;

  const { node, connection, socket, control } = props?.customize || {};

  return {
    attach(plugin) {
      positionWatcher.attach(plugin);
    },

    update(context, plugin) {
      const { payload } = context.data;
      const parent = plugin.parentScope();

      if (!parent) {
        throw new Error('Parent scope is not defined');
      }

      const emit = parent.emit.bind(parent);

      if (context.data.type === 'node') {
        return { data: payload, emit };
      } else if (context.data.type === 'connection') {
        const { start, end } = context.data;

        return {
          data: payload,
          ...(start ? { start } : {}),
          ...(end ? { end } : {}),
        };
      } else {
        return { data: payload };
      }
    },

    render(context, plugin) {
      const parent = plugin.parentScope();
      const emit = parent.emit.bind(parent);

      if (context.data.type === 'node') {
        const component = node ? node(context.data) : Node;
        if (!component) {
          return;
        }
        return {
          component,
          props: {
            data: context.data.payload,
            emit,
          },
        };
      } else if (context.data.type === 'connection') {
        const component = connection ? connection(context.data) : Connection;
        const { payload } = context.data;
        const { source, target, sourceOutput, targetInput } = payload;

        if (!component) {
          return;
        }

        return {
          component: ConnectionWrapper,
          props: {
            data: context.data.payload,
            component,
            start:
              context.data.start ||
              (change =>
                positionWatcher.listen(source, 'output', sourceOutput, change)),
            end:
              context.data.end ||
              (change =>
                positionWatcher.listen(target, 'input', targetInput, change)),
            path: async (start, end) => {
              const response = await plugin.emit({
                type: 'connectionpath',
                data: { payload, points: [start, end] },
              });
              if (!response) {
                return '';
              }

              const { path, points } = response.data;
              const curvature = 0.3;

              if (!path) {
                if (points.length !== 2) {
                  throw new Error(
                    'Cannot render connection with a custom number of points'
                  );
                }

                return payload.isLoop
                  ? loopConnectionPath(points, curvature, 120)
                  : classicConnectionPath(points, curvature);
              }

              return path;
            },
          },
        };
      } else if (context.data.type === 'socket') {
        console.log(context);

        const component = socket ? socket(context.data) : Socket;

        return {
          component,
          props: context.data,
        };
      } else if (context.data.type === 'control') {
        const { payload } = context.data;

        if (control) {
          const component = control(context.data);

          if (!component) {
            return;
          }

          return {
            component,
            props: {
              data: payload,
            },
          };
        }

        if (context.data.payload instanceof ClassicPreset.InputControl) {
          return {
            component: Control,
            props: {
              data: payload,
            },
          };
        }

        return null;
      }
    },
  };
}
