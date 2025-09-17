<script>
	const {
		title,
		subtitle = ``,
		pageTitle = ``,
		extra,
		children = () => {},
		hide = false
	} = $props();
</script>

<svelte:head>
	<title>{pageTitle || title}</title>
</svelte:head>
<div class="flex items-center justify-between px-4 py-1">
	<div class="mr-4 {hide ? `invisible absolute md:visible md:static` : ``}">
		<h1 class="font-display text-primary-dark text-3xl md:text-5xl">{title}</h1>
		<h2 class="text-secondary-dark mb-4 max-w-lg text-lg md:text-xl">{subtitle}</h2>
	</div>
	{@html extra}
</div>
<div class="font-body text-gray-900">
	{@render children()}
</div>
