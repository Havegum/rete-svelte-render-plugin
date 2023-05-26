<script>
export let data;
export let emit;

let selected = false;
let label = '';

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

function getInputs(data) {
  return sortByIndex(Object.entries(data.inputs || {}));
}

function getControls(data) {
  return sortByIndex(Object.entries(data.controls || {}));
}

function getOutputs(data) {
  return sortByIndex(Object.entries(data.outputs || {}));
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

$: inputs = getInputs(data);
$: controls = getControls(data);
$: outputs = getOutputs(data);
</script>

<div class="node" class:selected style:width style:height data-testid="node">
  <div class="title" data-testid="title">{label}</div>

  {#each outputs as [key, output] (key)}
    <div class="output" data-testid="output-{+key}">
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
      data-testid="control-{+key}"
      use:bind={{ key, entity: control, type: 'control' }}
    />
  {/each}

  {#each inputs as [key, input] (key)}
    <div class="input" data-testid="input-{+key}">
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
  background-color: var(--node-color, var(--blue-tint-4));
  border: 1px solid var(--blue-tint-3);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  min-width: var(--node-width, 100px);
  height: auto;
  padding-bottom: 6px;
  position: relative;
  user-select: none;
  line-height: initial;
  font-family: Arial;
}

/* .node:hover { */
/* background: lighten($node-color, 4%); */
/* } */

.node.selected {
  /* background: $node-color-selected; */
  border-color: #e3c000;
}

.title {
  color: white;
  font-family: sans-serif;
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
  /* margin-right: -(math.div($socket-size, 2) + $socket-margin); */
  display: inline-block;
}

.input-socket {
  text-align: left;
  /* margin-left: -(math.div($socket-size, 2) + $socket-margin); */
  display: inline-block;
}

.input-title,
.output-title {
  vertical-align: middle;
  color: black;
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
  /* margin: $socket-margin; */
  /* line-height: $socket-size; */
}

.input-control {
  z-index: 1;
  /* width: calc(100% - #{$socket-size + 2 * $socket-margin}); */
  vertical-align: middle;
  display: inline-block;
}

.control {
  /* padding: $socket-margin math.div($socket-size, 2) + $socket-margin; */
}
</style>
