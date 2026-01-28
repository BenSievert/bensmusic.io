<script lang="ts">
	import SitePage from './SitePage.svelte';
	import Section from './Section.svelte';
	import Youtube from 'svelte-youtube-embed';

	const {
		name,
		img,
		about,
		date,
		videos,
		whatToListenFor,
		gear
	}: {
		name: string;
		img: string;
		about: string;
		date: string;
		videos: { id: string }[];
		whatToListenFor: string;
		gear?: string;
	} = $props();
	const src = `/assets/${img}`;
</script>

<SitePage
	title={name}
	subtitle={date}
	pageTitle="Guitarist of the Week - {date}"
	extra={`<a data-sveltekit-reload href="/guitarist-of-the-week-archive" class=" text-center py-1 px-2 text-xs sm:text-sm rounded bg-primary-dark hover:bg-primary text-white">
			View Previous Entries
		</a>`}
>
	<Section theme="tertiary">
		<div class="flex justify-center py-6">
			<img {src} alt="some alt text" class="mb-4 rounded sm:max-w-1/2" />
		</div>
		<h2 class="text-primary-dark text-2xl">About</h2>
		<p class="mb-4">{about}</p>
		<h2 class="text-primary-dark text-2xl">What to listen for</h2>
		<p class="mb-4">{whatToListenFor}</p>
		{#if gear}
			<a
				class="text-primary-dark hover:text-primary mb-4 flex cursor-pointer items-center gap-1.5 text-2xl"
				href={gear}
				target="_blank"
			>
				Steal their Tone
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
					/>
				</svg>
			</a>
		{/if}
		<h2 class="text-primary-dark mb-2 text-2xl">Examples</h2>
		{#each videos as { id }}
			<div class="mb-12 rounded bg-blue-100 p-2 shadow sm:p-6 md:max-w-3/4">
				<Youtube {id}></Youtube>
			</div>
		{/each}
	</Section>
</SitePage>
