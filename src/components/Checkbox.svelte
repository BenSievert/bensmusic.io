<script lang="ts">
	export let label = '';
	export let checked = false;
	export let noPadding = false;
	export let handleInput = () => {};
</script>

<label class={`inline-flex cursor-pointer items-center space-x-1 ${noPadding ? `` : `p-2`} mr-1`}>
	<input
		on:input={handleInput}
		{checked}
		type="checkbox"
		class="accent-accent-dark focus:text-accent-dark h-4 w-4 cursor-pointer rounded-full focus:ring-0"
	/>
	<span class="text-sm text-gray-800">{label}</span>
</label>
