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
  border: 1px solid var(--blue-tint-3);
  border-radius: calc(var(--socket-size, 10px) / 2);
  width: var(--socket-size, 10px);
  height: var(--socket-size, 10px);
  margin: 5px var(--socket-size, 10px);
  vertical-align: middle;
  background: var(--socket-color, white);
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
