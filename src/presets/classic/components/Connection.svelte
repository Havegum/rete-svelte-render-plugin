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
  <path class="casing" d={path} />
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
  stroke: steelblue;
  pointer-events: auto;
}

path.casing {
  stroke-width: 8px;
  stroke: var(--gray-tint-4);
}
</style>
