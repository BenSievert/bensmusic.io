<script>
	import Section from './Section.svelte';
	let { grouped, path } = $props();
</script>

<Section>
	{#each grouped as [year, months]}
		<div class="text-primary-dark mb-1 text-2xl font-bold">{year}</div>
		{#each Object.entries(months) as [month, byMonth]}
			<div class="text-secondary-dark mb-1.5 text-lg">
				{month}
				<ul>
					{#each byMonth as { id, name }}
						<li class="mb-1 text-base">
							<a class="text-primary-dark hover:underline" href="{path}/{id}">{name}</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{/each}
</Section>
