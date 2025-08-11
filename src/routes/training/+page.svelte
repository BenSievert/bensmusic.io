<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	const games = [{title: `Interval Memorization`, link: `interval-memorization`, desc: `Choose the note the correct interval apart from the given note.`}, {title: `Find the Note`, link: `find-the-note`, desc: `Find the correct note on your guitar or bass on a given string.`}]

</script>

<SitePage title="Training" subtitle="Games and Exercises">
	<Section>
		<div class="py-4">
		{#each games as game}
			<div class="mb-3">
			<a
					href="training/{game.link}"
					class="border border-primary inline-block text-xl p-4 bg-blue-100 shadow-softBlue text-blue-700 hover:bg-highlight-mintGreen hover:text-primary md:rounded-md"
			>
				<div class="flex items-center justify-between">
					<div class="mr-4">
						{game.title}
						<div class="text-xs max-w-48">{game.desc}</div>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
					</svg>


				</div>
			</a>
			</div>
		{/each}
		</div>
	</Section>

</SitePage>
