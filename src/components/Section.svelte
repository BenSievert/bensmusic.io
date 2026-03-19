<script>
	const { children, theme = 'primary', className, shiftable, disableTheme = false } = $props();
	const colors = {
		primary: {tw: `text-gray-900 bg-blue-200/30` },
		secondary: {tw: `text-gray-950 bg-rose-200/30`},
		tertiary: {tw: `bg-[#f2f7fc]`}
	};
</script>

<div
		style={colors[theme]?.style}
	class="px-8 py-4 {disableTheme ? `` : colors[theme].tw} {className} {shiftable
		? `absolute top-4 md:static`
		: ``}"
>
	<div class="rounded b">
	{@render children()}
	</div>
</div>
