<script>
	import SitePage from './SitePage.svelte';
	import Section from './Section.svelte';
	import Youtube from 'svelte-youtube-embed';

	const { name, img, about, date, videos, whatToListenFor, fromArchive = false } = $props();
	let src = `/static/assets/${img}`;
	let parsedDate = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
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
		<div class="flex justify-center">
			<img {src} alt="some alt text" class="mb-4 rounded sm:max-w-3/4" />
		</div>
		<h2 class="text-secondary-dark text-2xl">About</h2>
		<p class="mb-4">{about}</p>
		<h2 class="text-secondary-dark text-2xl">What to listen for</h2>
		<p class="mb-4">{whatToListenFor}</p>
		<h2 class="text-secondary-dark text-2xl">Listen</h2>
		{#each videos as video}
			<div class="mb-6 md:max-w-3/4">
				<Youtube id={video} width="5px"></Youtube>
			</div>
		{/each}
	</Section>
</SitePage>
