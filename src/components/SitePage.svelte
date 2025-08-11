<script>
	const { title, subtitle = ``, children = () => {} } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div class="px-4 py-1">
	<h1 class="font-display text-primary-dark text-3xl md:text-5xl">{title}</h1>

	<h2 class="text-secondary-dark mb-4 max-w-lg text-lg md:text-xl">{subtitle}</h2>
</div>
<div class="font-body text-gray-900">
	{@render children()}
</div>
