<script>
export let side;
export let payload;
$$props;
</script>

<div
  class="socket"
  class:input={side === 'input'}
  class:output={side === 'output'}
  title={payload.name}
/>

<style>
.socket {
  display: inline-block;
  cursor: pointer;
  border: 1px solid white;
  border-radius: calc(var(--socket-size) / 2);
  width: var(--socket-size);
  height: var(--socket-size);
  margin: 5px var(--socket-margin);
  vertical-align: middle;
  background: var(--socket-color);
  z-index: 2;
  box-sizing: border-box;
}

.socket:hover {
  border-width: 4px;
}

.socket.multiple {
  border-color: yellow;
}

.socket.output {
  margin-right: calc(var(--socket-size, 10px) / -2);
}

.socket.input {
  margin-left: calc(var(--socket-size, 10px) / -2);
}
</style>
