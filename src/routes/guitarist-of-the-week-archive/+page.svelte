<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { groupedGuitarists } = data;
</script>

<SitePage title="Guitarist of the Week Archive">
	<Section>
			{#each groupedGuitarists as [year, months]}
				<div class="font-bold text-2xl text-primary-dark mb-1">{year}</div>
				{#each Object.entries(months) as [month, guitarists]}
					<div class="text-lg text-secondary-dark mb-1.5">{month}
						<ul>
					{#each guitarists as {id, name}}
						<li class="mb-1 text-base">
							<a class="text-primary-dark hover:underline" href="guitarist-of-the-week/{id}"
							>{name}</a>
						</li>
					{/each}
						</ul>
					</div>
				{/each}
			{/each}
	</Section>
</SitePage>
