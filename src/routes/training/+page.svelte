<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`]
	const intervals = [`Unison`, 'Minor 2nd', `Major 2nd`, `Minor 3rd`, `Major 3rd`, `Perfect 4th`, `Tritone`, `Perfect 5th`, `Minor 6th`, `Major 6th`, `Minor 7th`, `Major 7th`]
	const p5 = 7

	const getRandomNote = (override?: number) => Math.floor(Math.random() * (override ?? 11));
	let note = $state(getRandomNote());
	let interval = $state(p5)
	let wrongGuesses = $state<string[]>([]);
	let selectedIntervals = $state([p5])


	let answer = $derived(notes[((note+interval) % 12 + 12) % 12])
	const guess = (guess: string) => {
		if (guess == answer) {
			let newNote;
			do {
				newNote = getRandomNote()
			} while (newNote == note)
			interval = selectedIntervals[getRandomNote(selectedIntervals.length)]
			wrongGuesses = []
			note=newNote;
		}
		else wrongGuesses = [...wrongGuesses, guess]
	}
</script>

<SitePage title="Training" subtitle="Games and Exercises">
	<Section>
		<div>
			{#each intervals as interval, intervalIndex}
				<label class="inline-flex items-center space-x-2 p-2 rounded-lg cursor-pointer">
					<input on:input={() => {
						if (selectedIntervals.includes(intervalIndex))
							selectedIntervals = selectedIntervals.filter(i => i !== intervalIndex)
						else
							selectedIntervals = [...selectedIntervals, intervalIndex]
					}} checked={selectedIntervals.includes(intervalIndex)} type="checkbox" class="h-4 w-4 text-accent-dark rounded focus:text-accent-dark focus:ring-0" />
					<span class="text-gray-800 text-sm">{interval}</span>
				</label>
			{/each}
		</div>
		<div class="mb-2 text-lg">
			What is the <span class="font-bold">{intervals[interval]}</span> of <span class="font-bold">{notes[note]}</span>?
		</div>
		{#each notes as note}
			<button on:click={() => guess(note)} class={`${wrongGuesses.includes(note) ? `bg-gray-300` : `bg-primary`} w-16 hover:bg-primary-light p-2 rounded-md mr-4 mb-1`}>{note}</button>
		{/each}

	</Section>
</SitePage>
