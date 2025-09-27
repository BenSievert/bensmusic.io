<script lang="ts">
    let {value = $bindable(), label, onchange = (e: any) => {} } = $props();

</script>

<label>
    <span class="text-primary-dark text-lg font-bold">{label}</span>

    <input
        type="number"
        min="0"
        max="24"
        class="bg-gray-50 border-primary focus:border-accent focus:ring-accent rounded-sm border pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
        bind:value={value}
        onchange={onchange}
/>
</label>