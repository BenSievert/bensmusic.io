<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Button from '../../../components/Button.svelte';
	import type { PageData } from './$types';
	let newNotes = $state(``);

	let { data }: { data: PageData } = $props();
	const {
		student: { first_name, last_name, phone, id },
		notes
	} = data;

	const submit = async (isInternal: boolean) => {
		const response = await fetch(`/my-students`, {
			method: 'POST',
			body: JSON.stringify({
				notes: newNotes,
				id,
				isInternal
			})
		});
		if (response.ok) window.location.reload();
	};
</script>

<SitePage title="{first_name} {last_name}" subtitle={phone}>
	<Section theme="secondary">
		<div class="text-secondary-dark text-xl">Notes</div>
		{#each notes as { notes, date_created, internal }}
			<div class="mb-6">
				<div class="text-primary-dark text-lg font-bold">
					{date_created} <span class="text-primary">{internal ? ` (Internal)` : ``}</span>
				</div>
				<div class="rounded border-b border-gray-300 pt-1">
					<pre>{notes}</pre>
				</div>
			</div>
		{/each}
	</Section>
	<Section>
		<textarea bind:value={newNotes} class="my-4 min-h-32 w-full bg-white p-2"></textarea>
		<Button text="Submit" onClick={() => submit(false)} />
		<Button text="Internal" onClick={() => submit(true)} theme="secondary" />
	</Section>
</SitePage>
