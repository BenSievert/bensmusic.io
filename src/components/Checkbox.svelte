<script lang="ts">
	export let label = '';
	export let checked = false;
	export let className = ``;
	export let handleInput = () => {};
</script>

<label class={`inline-flex cursor-pointer items-center space-x-1 p-1 ${className ? className : ``}`}>
	<input
		on:input={handleInput}
		{checked}
		type="checkbox"
		class="accent-accent-dark focus:text-accent-dark h-4 w-4 cursor-pointer rounded-full focus:ring-0"
	/>
	<span class="text-sm text-gray-800">{label}</span>
</label>
