<script>
	let { choices, value = $bindable(), required = false, title, bindI = false } = $props();
</script>

<div class="text-primary-dark text-left text-lg">{required ? `*` : ``}{title}</div>
{#each choices as choice, i}
	<label class="mr-2 mb-1 flex cursor-pointer items-center">
		<input
			value={bindI ? i : choice}
			bind:group={value}
			type="radio"
			class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
		/>
		<span class="text-sm">{@html choice}</span>
	</label>
{/each}
