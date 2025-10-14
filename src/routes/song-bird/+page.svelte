<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { session, songs } = data;
	const headers = [`Title`, `Created`, `Last Updated`, ``];
</script>

<SitePage title="Song Bird" subtitle="Write and Arrange Songs">
	<Section theme="secondary">
		{#if session}
			<table>
				<thead class="text-primary-dark text-lg">
					<tr>
						{#each headers as header}
							<th>{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each songs as { title, date_created, last_updated, id }}
						<tr>
							<td>{title}</td>
							<td>{date_created}</td>
							<td>{last_updated}</td>
							<td
								><a href="/song-bird/{id}" class="text-primary-dark hover:text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="mb-[2px] size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
										/>
									</svg>
								</a></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			You must be logged in to see this page.
		{/if}
	</Section>
</SitePage>
