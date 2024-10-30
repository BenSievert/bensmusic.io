<script>
    const {title, subtitle = ``, children = () => {}} = $props();
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>
<h1 class="font-display text-3xl text-primary-dark md:text-5xl">{title}</h1>

<h2 class="mb-8 max-w-lg text-xl text-secondary-dark md:text-xl">{subtitle}</h2>
<div class="rounded-lg bg-gray-50 shadow-pastel p-4">
{@render children()}
</div>