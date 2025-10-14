<script lang="ts">
	let { onClick, text, className = ``, theme = `base`, href } = $props();

	const themes = {
		base: `bg-primary-dark hover:bg-primary`,
		danger: `bg-red-500 hover:bg-red-400`
	};
	const sharedClasses = `${className} ${themes[theme]} m-1 cursor-pointer rounded-md px-3 py-1 text-white`
</script>

{#if href}
	<a class={sharedClasses}
	   href={href}
	>
		{text}
	</a>
	{:else}
	<button
			class={sharedClasses}
			onclick={onClick}
	>
		{text}
	</button>
{/if}

