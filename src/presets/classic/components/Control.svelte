<script>
export let data;

function change(e) {
  const value =
    data.type === 'number' ? parseFloat(e.target.value) : e.target.value;
  data.setValue(value);
}
</script>

<input
  type={data.type}
  value={data.value}
  readonly={data.readonly}
  on:change={change}
  on:pointerdown|stopPropagation
/>
