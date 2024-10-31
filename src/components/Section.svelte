<script>
	const { children, theme = 'primary' } = $props();
	const colors = {
		primary: `bg-background-light text-gray-900`,
		secondary: `text-gray-950`
	};
</script>

<div class="px-8 py-10 {colors[theme]}">
	{@render children()}
</div>
