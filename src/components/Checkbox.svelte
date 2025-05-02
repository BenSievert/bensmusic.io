<script lang="ts">
	export let label = '';
	export let checked = false;
	export let handleInput = () => {};
</script>

<label class="inline-flex cursor-pointer items-center space-x-1 rounded-lg p-2">
	<input
		on:input={handleInput}
		{checked}
		type="checkbox"
		class="h-4 w-4 rounded text-accent-dark focus:text-accent-dark focus:ring-0"
	/>
	<span class="text-sm text-gray-800">{label}</span>
</label>
