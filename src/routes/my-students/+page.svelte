<script lang="ts">
	import Section from '../../components/Section.svelte';
	import SitePage from '../../components/SitePage.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let students = data.students as unknown as {
		first_name: string;
		last_name: string;
		id: number;
	}[];
</script>

<SitePage title="Students">
	<Section>
		{#each students as { first_name, last_name, id }}
			<a class="text-primary-dark hover:text-primary hover:underline block mb-3" href="/my-students/{id}"
				>{first_name} {last_name}</a
			>
		{/each}
	</Section>
</SitePage>
