<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { guitarists } = data;

	const hrefDate = (date) => {
		const d = new Date(date);
		return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	};
</script>

<SitePage title="Guitarist of the Week Archive">
	<Section>
		<ul>
			{#each guitarists as { name, date }}
				<li>
					<a class="text-primary-dark hover:underline" href="guitarist-of-the-week/{hrefDate(date)}"
						>{new Date(date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})} - {name}</a
					>
				</li>
			{/each}
		</ul>
	</Section>
</SitePage>
