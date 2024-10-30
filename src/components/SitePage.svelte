<script>
    const {title, subtitle = ``, children = () => {}} = $props();
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>
<div class="p-2">
<h1 class="font-display text-3xl text-primary-dark md:text-5xl">{title}</h1>

<h2 class="mb-8 max-w-lg text-secondary-dark text-lg md:text-xl">{subtitle}</h2>
</div>
<div class="font-body text-gray-900">
{@render children()}
</div>
