<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`]
	const p5 = 7

	const getRandomNote = () => Math.floor(Math.random() * 11);
	let note = $state(getRandomNote());
	let wrongGuesses = $state<string[]>([]);

	let answer = $derived(notes[((note+p5) % 12 + 12) % 12])
	const guess = (guess: string) => {
		if (guess == answer) {
			let newNote;
			do {
				newNote = getRandomNote()
			} while (newNote == note)
			wrongGuesses = []
			note=newNote;
		}
		else wrongGuesses = [...wrongGuesses, guess]
	}
</script>

<SitePage title="Training" subtitle="Games and Exercises">
	<Section>
		<div class="mb-2 text-lg">
			What is the perfect 5th of <span class="font-bold">{notes[note]}</span>?
		</div>
		{#each notes as note}
			<button on:click={() => guess(note)} class={`${wrongGuesses.includes(note) ? `bg-gray-300` : ``} w-16 bg-primary hover:bg-primary-light p-2 rounded-md mr-4 mb-1`}>{note}</button>
		{/each}

	</Section>
</SitePage>
