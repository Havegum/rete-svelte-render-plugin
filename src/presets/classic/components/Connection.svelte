<script>
export let data;
export let end;
export let start;
export let path;

data;
end;
start;
</script>

<svg data-testid="connection">
  <path d={path} />
</svg>

<style>
svg {
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
}

path {
  fill: none;
  stroke-width: 5px;
  stroke: var(--connection-color);
  pointer-events: auto;
}
</style>
