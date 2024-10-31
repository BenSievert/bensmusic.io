<script>
	const { title, subtitle = ``, children = () => {} } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div class="p-4">
	<h1 class="font-display text-3xl text-primary-dark md:text-5xl">{title}</h1>

	<h2 class="mb-4 max-w-lg text-lg text-secondary-dark md:text-xl">{subtitle}</h2>
</div>
<div class="bg-background-light font-body text-gray-900">
	{@render children()}
</div>
