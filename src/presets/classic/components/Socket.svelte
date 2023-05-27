<script>
export let side;
export let payload;
$$props;
</script>

<div class="socket" title={payload.name} />

<style>
.socket {
  display: inline-block;
  cursor: pointer;
  border: 1px solid white;
  border-radius: calc(var(--socket-size) / 2);
  width: var(--socket-size);
  height: var(--socket-size);
  margin: var(--socket-margin);
  vertical-align: middle;
  background: var(--socket-color);
  z-index: 2;
  box-sizing: border-box;
}

.socket:hover {
  border-width: 4px;
}
</style>
