<script>
export let data;

function change(e) {
  const value =
    data.type === 'number' ? parseFloat(e.target.value) : e.target.value;
  data = { ...data, value };
}
</script>

<input
  type={data.type}
  value={data.value}
  readonly={data.readonly}
  on:change={change}
  on:pointerdown|stopPropagation
/>

<style>
input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  box-sizing: border-box;
}
</style>
