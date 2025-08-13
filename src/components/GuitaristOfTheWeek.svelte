<script>
	import SitePage from './SitePage.svelte';
	import Section from './Section.svelte';
	import Youtube from 'svelte-youtube-embed';
	import {formatDate} from "../functions.js";

	const { name, img, about, date, videos, whatToListenFor } = $props();
	const src = `/assets/${img}`;
	const parsedDate = formatDate(date);
</script>

<SitePage
	title={name}
	subtitle={parsedDate}
	pageTitle="Guitarist of the Week - {parsedDate}"
	extra={`<a href="/guitarist-of-the-week-archive" class=" text-center py-1 px-2 text-xs sm:text-sm rounded bg-secondary-dark hover:bg-secondary text-white">
			View Previous Entries
		</a>`}
>
	<Section theme="tertiary">
		<div class="flex justify-center py-6">
			<img {src} alt="some alt text" class="mb-4 rounded  sm:max-w-1/2" />
		</div>
		<h2 class="text-secondary-dark text-2xl">About</h2>
		<p class="mb-4">{about}</p>
		<h2 class="text-secondary-dark text-2xl">What to listen for</h2>
		<p class="mb-4">{whatToListenFor}</p>
		<h2 class="text-secondary-dark text-2xl mb-2">Examples</h2>
		{#each videos as {id, description}}
			<div class="mb-12 md:max-w-3/4 p-2 sm:p-6 bg-blue-100 rounded shadow">
				<p class="mb-3">{description}</p>
				<Youtube id={id}></Youtube>
			</div>
		{/each}
	</Section>
</SitePage>