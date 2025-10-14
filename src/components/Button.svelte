<script lang="ts">
	let { onClick, text, className = ``, theme = `base` } = $props();

	const themes = {
		base: `bg-primary-dark hover:bg-primary`,
		danger: `bg-red-500 hover:bg-red-400`
	};
</script>

<button
	class="{className} {themes[theme]} m-1 cursor-pointer rounded-md px-3 py-1 text-white"
	onclick={onClick}
>
	{text}
</button>
