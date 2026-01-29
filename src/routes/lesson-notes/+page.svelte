<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Button from '../../components/Button.svelte';
	import type { PageData } from './$types';
	let newNotes = $state(``);

	let { data }: { data: PageData } = $props();
	const {
		student: { first_name, last_name },
		notes
	} = data;
</script>

<SitePage title="Lesson Notes" subtitle="{first_name} {last_name}">
	<Section theme="secondary">
		<div class="text-secondary-dark text-xl">Notes</div>
		{#each notes as { notes, date_created }}
			<div class="mb-6">
				<div class="text-primary-dark text-lg font-bold">{date_created}</div>
				<div class="rounded border-b border-gray-300 pt-1">
					<pre>{notes}</pre>
				</div>
			</div>
		{/each}
	</Section>
</SitePage>
