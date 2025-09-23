<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import ButtonLinks from '../../components/ButtonLinks.svelte';
	const games = [
		{
			title: `Interval Memorization`,
			link: `interval-memorization`,
			desc: `Choose the note the correct interval apart from the given note.`
		},
		{
			title: `Find the Note`,
			link: `find-the-note`,
			desc: `Find the correct note on your guitar or bass on a given string.`
		},
		{
			title: `Spell the Mode`,
			link: `spell-the-mode`,
			desc: `List all the notes for a given mode.`
		}
	];
</script>

<SitePage title="Exercises" subtitle="Games and Exercises">
	<ButtonLinks path="exercises" buttons={games} />
</SitePage>
