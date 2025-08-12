<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Checkbox from '../../../components/Checkbox.svelte';

	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`];
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

	const getNextNote = (note: number, interval = 1) => notes[(((note + interval) % 12) + 12) % 12];

	const getRandomNote = (override?: number) => Math.floor(Math.random() * (override ?? 11));
	let note = $state(getRandomNote());
	let selectedIntervals = $state([p5]);
	let wrongGuesses = $state<string[]>([]);

	let interval = $state(p5);

	const parseNote = (note: string) => {
		if (note.length == 1 || note == `` || noteDisplay == `both`) return note;
		else {
			return note.split(`/`)[noteDisplay == `sharps` ? 0 : 1];
		}
	};

	let noteDisplay = $state(`sharps`);

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

<SitePage title="Interval Memorization" subtitle="Games and Exercises">
	<Section>
		<div class="grid w-max grid-cols-3 gap-1 sm:grid-cols-6">
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
			<span class="font-bold">{parseNote(notes[note])}</span>?
		</div>
		{#each notes as note}
			<button
				onclick={() => guess(note)}
				class={`${wrongGuesses.includes(note) ? `bg-gray-300` : `bg-primary`} hover:bg-primary-light mr-4 mb-1 w-16 rounded-md p-2`}
				>{parseNote(note)}</button
			>
		{/each}
	</Section>
	<Section theme="tertiary">
		<span class="text-primary-dark mr-2 text-xl font-bold">Note Display</span>
		<div class="inline-block">
			<div class="mt-4 mb-3 flex">
				<label class="mr-2 flex cursor-pointer items-center">
					<input
						value="sharps"
						bind:group={noteDisplay}
						type="radio"
						class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
					/>
					<span class="text-sm text-rose-700">Sharps</span>
				</label>
				<label class="mr-2 flex cursor-pointer items-center">
					<input
						value="flats"
						bind:group={noteDisplay}
						type="radio"
						class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
					/>
					<span class="text-sm text-rose-700">Flats</span>
				</label>
				<label class="flex cursor-pointer items-center">
					<input
						value="both"
						bind:group={noteDisplay}
						type="radio"
						class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
					/>
					<span class="text-sm text-rose-700">Both</span>
				</label>
			</div>
		</div>
	</Section>
</SitePage>
