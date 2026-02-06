<script lang="ts">
	let { onClick, text, className = ``, theme = `base`, href = false, disabled } = $props();

	const themes = {
		base: `bg-primary-dark hover:bg-primary`,
		danger: `bg-red-500 hover:bg-red-400`,
		secondary: `bg-secondary-dark hover:bg-secondary`
	};
	const sharedClasses = `${className} ${themes[theme]} m-1 cursor-pointer rounded-md px-3 py-1 text-white disabled:bg-gray-300 disabled:cursor-default`;
</script>

{#if href}
	<a class={sharedClasses} {href}>
		{text}
	</a>
{:else}
	<button class={sharedClasses} onclick={onClick} {disabled}>
		{text}
	</button>
{/if}
