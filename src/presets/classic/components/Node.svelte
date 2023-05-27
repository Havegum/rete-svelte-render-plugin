<script>
export let data;
export let emit;

$: width = Number.isFinite(data.width) ? `${data.width}px` : '';
$: height = Number.isFinite(data.height) ? `${data.height}px` : '';

function sortByIndex(entries) {
  entries.sort((a, b) => {
    const ai = (a[1] && a[1].index) || 0;
    const bi = (b[1] && b[1].index) || 0;

    return ai - bi;
  });
  return entries;
}

function bind(element, { key, entity, type }) {
  switch (type) {
    case 'input':
    case 'output':
      return emit({
        type: 'render',
        data: {
          type: 'socket',
          side: type,
          key,
          nodeId: data.id,
          element,
          payload: entity.socket,
        },
      });

    case 'control':
      return emit({
        type: 'render',
        data: {
          type: 'control',
          element,
          payload: entity,
        },
      });
  }
}

const getSorted = object => sortByIndex(Object.entries(object || {}));
$: inputs = getSorted(data.inputs);
$: controls = getSorted(data.controls);
$: outputs = getSorted(data.outputs);
</script>

<div
  class="node"
  class:selected={data.selected}
  style:width
  style:height
  data-testid="node"
>
  <div class="title" data-testid="title">{data.label}</div>

  {#each outputs as [key, output] (key)}
    <div class="output" data-testid="output-{key}">
      <div class="output-title" data-testid="output-title">{output.label}</div>
      <div
        class="output-socket"
        data-testid="output-socket"
        use:bind={{ key, entity: output, type: 'output' }}
      />
    </div>
  {/each}

  {#each controls as [key, control] (key)}
    <div
      class="control"
      data-testid="control-{key}"
      use:bind={{ key, entity: control, type: 'control' }}
    />
  {/each}

  {#each inputs as [key, input] (key)}
    <div class="input" data-testid="input-{key}">
      <div
        class="input-socket"
        data-testid="input-socket"
        use:bind={{ key, entity: input, type: 'input' }}
      />

      <div
        class="input-title"
        class:hidden={input.control && input.showControl}
        data-testid="input-title"
      >
        {input.label}
      </div>
      {#if input.control && input.showControl}
        <div
          class="input-control"
          data-testid="input-control"
          use:bind={{ key, entity: input, type: 'input' }}
        />
      {/if}
    </div>
  {/each}
</div>

<style>
.node {
  background-color: var(--node-color);
  border: 2px solid var(--node-border-color);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  min-width: var(--node-width);
  height: auto;
  padding-bottom: 6px;
  position: relative;
  user-select: none;
  line-height: initial;
  font-family: var(--node-font-family);
}

.node:hover {
  background-color: var(--node-color-hover);
  background-color: var(--node-color-hover);
}

.node.selected {
  background-color: var(--node-color-selected);
  border-color: var(--node-border-color-selected);
}

.title {
  color: var(--node-text-color);
  font-size: 18px;
  padding: 8px;
}

.output {
  text-align: right;
}

.input {
  text-align: left;
}

.output-socket {
  text-align: right;
  margin-right: calc(-1 * (var(--socket-size) / 2 + var(--socket-margin)));
  display: inline-block;
}

.input-socket {
  text-align: left;
  margin-left: calc(-1 * (var(--socket-size) / 2 + var(--socket-margin)));
  display: inline-block;
}

.input-title,
.output-title {
  color: var(--node-text-color);
  vertical-align: middle;
  display: inline-block;
  font-family: var(--node-font-family);
  font-size: 14px;
  margin: var(--socket-margin);
  line-height: var(--socket-size);
}

.input-control {
  z-index: 1;
  width: calc(100% - (var(--socket-size) + 2 * var(--socket-margin)));
  vertical-align: middle;
  display: inline-block;
}

.control {
  padding: var(--socket-margin)
    calc(var(--socket-size) / 2 + var(--socket-margin));
}
</style>
