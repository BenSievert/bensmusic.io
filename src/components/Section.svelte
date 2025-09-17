<script>
	const { children, theme = 'primary', className, shiftable } = $props();
	const colors = {
		primary: `bg-background-light text-gray-900`,
		secondary: `text-gray-950`,
		tertiary: `bg-sky-50`
	};
</script>

<div class="px-8 py-4 {colors[theme]} {className} {shiftable ? `absolute top-4 md:static` : ``}">
	{@render children()}
</div>
