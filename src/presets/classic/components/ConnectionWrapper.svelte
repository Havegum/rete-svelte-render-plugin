<script>
import { onDestroy, onMount } from 'svelte';

export let component;
export let data;
export let path;
export let start;
export let end;

let observedStart = { x: 0, y: 0 };
let observedEnd = { x: 0, y: 0 };
let observedPath = '';

async function fetchPath() {
  if (startPosition && endPosition) {
    observedPath = await path(startPosition, endPosition);
  }
}

$: startPosition = start && 'x' in start ? start : observedStart;
$: endPosition = end && 'x' in end ? end : observedEnd;

$: {
  startPosition;
  endPosition;
  fetchPath();
}

let listeners = [];
onMount(() => {
  if (typeof start === 'function') {
    listeners.push(start(position => (observedStart = position)));
  }

  if (typeof end === 'function') {
    listeners.push(end(position => (observedEnd = position)));
  }
});

onDestroy(() => {
  listeners.forEach(listener => listener());
});
</script>

<div>
  <svelte:component
    this={component}
    bind:data
    path={observedPath}
    start={startPosition}
    end={endPosition}
  />
</div>

<style>
div {
  min-width: 1px;
  min-height: 1px;
}
</style>
