<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Button from '../../components/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { session, songs } = data;
	const headers = [
		[`Title`, `title`],
		[`Created`, `date_created`],
		[`Last Updated`, `last_updated`],
		[``, `id`]
	];
</script>

<SitePage title="Song Bird" subtitle="Write and Arrange">
	<Section theme="secondary">
		{#if session}
			<a
				href="/song-bird/new"
				class="text-primary-dark hover:text-primary flex cursor-pointer items-center text-lg"
				><span class="mr-1.5 text-2xl">+</span> New</a
			>
			<div class="relative">
				<table class="invisible absolute mt-2 w-full table-auto md:visible">
					<thead class="text-primary-dark text-lg">
						<tr>
							{#each headers as [header]}
								<th class=" p-1 text-left">{header}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each songs as { title, date_created, last_updated, id }}
							<tr class="transition-colors hover:bg-gray-100">
								<td class="p-1">{title}</td>
								<td class="p-1">{date_created}</td>
								<td class="p-1">{last_updated}</td>
								<td class="p-1"
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
				<div
					class="visible absolute mt-2 grid w-full grid-cols-1 content-center text-sm md:invisible"
				>
					{#each songs as song}
						<a
							class="mb-4 flex items-center justify-between gap-8 rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow"
							href="/song-bird/{song.id}"
						>
							<div class="w-full">
								{#each headers.slice(0, -1) as [header, key]}
									<div class="mb-2 flex items-center justify-between gap-2">
										<div class="text-primary-dark flex-1 font-bold">{header}</div>
										<div class="flex-1 text-left">{song[key]}</div>
									</div>
								{/each}
							</div>
							<div class="text-primary-dark">
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
							</div>
						</a>
					{/each}
				</div>
			</div>
		{:else}
			You must be logged in to see this page.
		{/if}
	</Section>
</SitePage>
