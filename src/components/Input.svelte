<script lang="ts">
	let { value = $bindable(), label, onchange = (e: any) => {}, className } = $props();
</script>

<label class="flex justify-between {className}">
	<span class="text-primary-dark mr-2 text-lg font-bold">{label}</span>

	<input
		type="number"
		min="0"
		max="24"
		class="border-primary focus:border-accent focus:ring-accent rounded-sm border bg-gray-50 pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
		bind:value
		{onchange}
	/>
</label>
