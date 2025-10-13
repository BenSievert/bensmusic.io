<script lang="ts">
	let {
		value = $bindable(),
		label,
		onchange = (e: any) => {},
		labelClass = ``,
		className = `flex justify-between`,
		inputClassName = ``,
		placeholder = ``,
		type = 'number'
	} = $props();
</script>

<label class={className}>
	<span class="text-primary-dark mr-2 text-lg font-bold {labelClass}">{label}</span>

	<input
		{type}
		min="0"
		max="24"
		{placeholder}
		class="{inputClassName} border-primary focus:border-accent focus:ring-accent rounded-sm border bg-gray-50 pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
		bind:value
		{onchange}
	/>
</label>
