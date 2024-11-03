<script>
	const { children, theme = 'primary' } = $props();
	const colors = {
		primary: `bg-background-light text-gray-900`,
		secondary: `text-gray-950`
	};
</script>

<div class="px-8 py-6 {colors[theme]}">
	{@render children()}
</div>
