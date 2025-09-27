<script>
	const { children, theme = 'primary', className, shiftable, disableTheme = false } = $props();
	const colors = {
		primary: `bg-background-light text-gray-900`,
		secondary: `text-gray-950`,
		tertiary: `bg-[#f2f7fc]`
	};
</script>

<div
	class="px-8 py-4 {disableTheme ? `` : colors[theme]} {className} {shiftable
		? `absolute top-4 md:static`
		: ``}"
>
	{@render children()}
</div>
