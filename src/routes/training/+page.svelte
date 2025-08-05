<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Checkbox from '../../components/Checkbox.svelte';

	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`];
	const strings = [`E`,`B`,`G`,`D`,`A`];
	const intervals = [
		`Unison`,
		'Minor 2nd',
		`Major 2nd`,
		`Minor 3rd`,
		`Major 3rd`,
		`Perfect 4th`,
		`Tritone`,
		`Perfect 5th`,
		`Minor 6th`,
		`Major 6th`,
		`Minor 7th`,
		`Major 7th`
	];
	const p5 = 7;

	const getIsPossible = (string, note) => {
		const toBeFound = notes[note];
		const stringIndex = notes.indexOf(strings[string])
		for (const n of Array.from({ length: maxFret }, (_, i) => i)) {
			if (getNextNote(stringIndex, n + 1) == toBeFound)
				return true;

		}
		return false;

	}
	const getNextNote = (note: number, interval = 1) => notes[(((note + interval) % 12) + 12) % 12]

	const getRandomNote = (override?: number) => Math.floor(Math.random() * (override ?? 11));
	let note = $state(getRandomNote());
	let interval = $state(p5);
	let string = $state(0);
	let ex2Note = $state(0)
	let wrongGuesses = $state<string[]>([]);
	let selectedIntervals = $state([p5]);
	let selectedNotes = $state([0,2,3,5,7,8,10])
	let maxFret = $state(3)

	const generateEx2Answer = () => {
		let newString;
		let newEx2Note;
		do {
			newString = getRandomNote(strings.length);
			newEx2Note = selectedNotes[getRandomNote(selectedNotes.length)]
		} while (!getIsPossible(newString, newEx2Note) || newString == string && ex2Note == newEx2Note)
		string = newString;
		ex2Note = newEx2Note
	}
	generateEx2Answer();

	let answer = $derived(getNextNote(note, interval));
	const guess = (guess: string) => {
		if (guess == answer) {
			let newNote;
			do {
				newNote = getRandomNote();
			} while (newNote == note);
			interval = selectedIntervals[getRandomNote(selectedIntervals.length)];
			wrongGuesses = [];
			note = newNote;
		} else wrongGuesses = [...wrongGuesses, guess];
	};
</script>

<SitePage title="Training" subtitle="Games and Exercises">
	<Section>
		<div class="text-primary-dark text-2xl mb-2 font-bold">Interval Memorization</div>
		<div>
			{#each intervals as interval, intervalIndex}
				<Checkbox
					label={interval}
					checked={selectedIntervals.includes(intervalIndex)}
					handleInput={() => {
						if (selectedIntervals.includes(intervalIndex))
							selectedIntervals = selectedIntervals.filter((i) => i !== intervalIndex);
						else selectedIntervals = [...selectedIntervals, intervalIndex];
					}}
				/>
			{/each}
		</div>
		<div class="mb-2 text-lg">
			What is the <span class="font-bold">{intervals[interval]}</span> of
			<span class="font-bold">{notes[note]}</span>?
		</div>
		{#each notes as note}
			<button
				on:click={() => guess(note)}
				class={`${wrongGuesses.includes(note) ? `bg-gray-300` : `bg-primary`} hover:bg-primary-light mr-4 mb-1 w-16 rounded-md p-2`}
				>{note}</button
			>
		{/each}
	</Section>
	<Section theme="secondary">
		<div class="text-secondary-dark text-2xl mb-2 font-bold">Find the note</div>
		<div class="text-primary-dark text-lg">Highest Fret
		<input
			type="number"
			min="0"
			max="12"
			class="ml-2 pl-4 border-primary focus:border-accent focus:ring-accent rounded-sm border text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
			bind:value={maxFret}
		/>
		</div>
		<div class="text-primary-dark text-lg">Notes
		{#each notes as note, noteIndex}
			<Checkbox
					label={note}
					checked={selectedNotes.includes(noteIndex)}
					handleInput={() => {
						if (selectedNotes.includes(noteIndex))
							selectedNotes = selectedNotes.filter((i) => i !== noteIndex);
						else selectedNotes = [...selectedNotes, noteIndex];
					}}
			/>
		{/each}
		</div>
		<div class="mb-2"></div>
		<div class="mb-3 text-lg">
			Find the <span class="font-bold">{notes[ex2Note]}</span> on the <span class="font-bold">{strings[string]}</span> string
		</div>
		<button
				on:click={generateEx2Answer}
				class="py-2 px-3 bg-primary hover:bg-primary-dark hover:text-white border-2 border-primary-dark rounded-lg">Next</button>
	</Section>
</SitePage>
