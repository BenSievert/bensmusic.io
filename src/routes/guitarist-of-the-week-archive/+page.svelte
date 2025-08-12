<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import type { PageData } from './$types';
	import {formatDate} from "../../functions";

	let { data }: { data: PageData } = $props();
	let { guitarists } = data;

</script>

<SitePage title="Guitarist of the Week Archive">
	<Section>
		<ul>
			{#each guitarists as { name, date }}
				<li>
					<a class="text-primary-dark hover:underline" href="guitarist-of-the-week/{date}"
						>{formatDate(date)} - {name}</a
					>
				</li>
			{/each}
		</ul>
	</Section>
</SitePage>
