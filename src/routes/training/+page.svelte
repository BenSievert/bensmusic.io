<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Checkbox from '../../components/Checkbox.svelte';

	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`];
	let stringsState = $state([`E`, `A`, `D`, `G`, `B`, `E`]);
	let strings = $derived([...new Set(stringsState.filter((string) => string != ``))]);
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

	const getPossible = (string: string) =>
		Array.from({ length: maxFret - minFret + 1 }, (_, i) => i)
			.map((i) => getNextNote2(notes.indexOf(string), i + minFret))
			.filter((value) => selectedNotes.includes(value));

	const getNextNote = (note: number, interval = 1) => notes[(((note + interval) % 12) + 12) % 12];
	const getNextNote2 = (note: number, interval = 1) => (((note + interval) % 12) + 12) % 12;

	const getRandomNote = (override?: number) => Math.floor(Math.random() * (override ?? 11));
	let note = $state(getRandomNote());
	let interval = $state(p5);
	let string = $state(`A`);
	let ex2Note = $state(0);
	let wrongGuesses = $state<string[]>([]);
	let selectedIntervals = $state([p5]);
	let selectedNotes = $state([0, 2, 3, 5, 7, 8, 10]);
	let maxFret = $state(3);
	let minFret = $state(1);
	let challenge = $state(false);
	let seconds = $state(5);
	let showError = $state(false);
	let noteDisplay = $state(`sharps`);
	let allPossible = $derived(
		strings
			.map((string) => {
				return [string, getPossible(string)];
			})
			.filter(([_, notes]) => notes.length)
	);

	let time = setInterval(() => {
		if (challenge) generateEx2Answer();
	}, seconds * 1000);

	const parseNote = (note: string) => {
		if (note.length == 1 || note == `` || noteDisplay == `both`) return note;
		else {
			return note.split(`/`)[noteDisplay == `sharps` ? 0 : 1];
		}
	};

	const generateEx2Answer = () => {
		let newStringIndex;
		let newString;
		let newEx2Note;

		if (allPossible.map(([_, n]) => n).flat().length < 2) {
			showError = true;
			return;
		}

		do {
			newStringIndex = getRandomNote(allPossible.length);
			newString = allPossible[newStringIndex][0];
			newEx2Note =
				allPossible[newStringIndex][1][getRandomNote(allPossible[newStringIndex][1].length)];
		} while (newString == string && newEx2Note == ex2Note);

		showError = false;
		string = newString;
		ex2Note = newEx2Note;
	};
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
		<div class="text-primary-dark mb-2 text-2xl font-bold">Interval Memorization</div>
		<div class="grid grid-cols-3 sm:grid-cols-6 gap-1 w-max">
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
				on:click={() => guess(note)}
				class={`${wrongGuesses.includes(note) ? `bg-gray-300` : `bg-primary`} hover:bg-primary-light mr-4 mb-1 w-16 rounded-md p-2`}
				>{parseNote(note)}</button
			>
		{/each}
	</Section>
	<Section theme="secondary">
		<div class="text-secondary-dark mb-2 text-2xl font-bold">Find the Note</div>
		<div class="mb-2 flex-col">
			<div class="text-primary-dark mr-2 text-lg sm:inline-block">Tuning</div>
			{#each Array.from({ length: 6 }) as _, i}
				<select
					bind:value={stringsState[i]}
					class="block sm:inline-block mb-1 pl-1 cursor-pointer bg-white {noteDisplay == `both`
						? `w-18`
						: `w-12`} border-accent-dark mr-1 rounded-md border py-0.5 text-xs"
				>
					<option value=""></option>
					{#each notes as note}
						<option value={note}>{parseNote(note)}</option>
					{/each}
				</select>
			{/each}
		</div>
		<span class="text-primary-dark mr-2 text-lg font-bold">Frets</span>
		<div class="text-secondary-dark mr-2 mb-2 inline-block text-sm">
			Lowest
			<input
				type="number"
				min="0"
				max="24"
				class="border-primary focus:border-accent focus:ring-accent rounded-sm border pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
				on:change={() => {
					if (minFret > maxFret) maxFret = minFret;
				}}
				bind:value={minFret}
			/>
		</div>
		<div class="text-secondary-dark inline-block text-sm">
			Highest
			<input
				type="number"
				min="0"
				max="24"
				class="border-primary focus:border-accent focus:ring-accent rounded-sm border pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
				on:change={() => {
					if (maxFret < minFret) minFret = maxFret;
				}}
				bind:value={maxFret}
			/>
		</div>
		<div class="text-primary-dark mb-2 text-lg font-bold">
			Notes
			<div class="grid grid-cols-4 sm:grid-cols-6 gap-1 w-max">
			{#each notes as note, noteIndex}
				<Checkbox
					label={parseNote(note)}
					checked={selectedNotes.includes(noteIndex)}
					handleInput={() => {
						if (selectedNotes.includes(noteIndex))
							selectedNotes = selectedNotes.filter((i) => i !== noteIndex);
						else selectedNotes = [...selectedNotes, noteIndex];
					}}
				/>
			{/each}
			</div>
		</div>
		<div class={`${challenge ? `mb-2` : `mb-4`} flex`}>
			<span class="text-primary-dark mr-2 text-lg font-bold">Challenge Mode</span>
			<Checkbox
				noPadding={true}
				label=""
				handleInput={() => {
					clearInterval(time);
					if (!challenge) {
						time = setInterval(() => {
							if (challenge) generateEx2Answer();
						}, seconds * 1000);
					}
					challenge = !challenge;
				}}
			/>
		</div>
		{#if challenge}
			<div class="mb-4">
				<span class="text-primary-dark mr-2 text-lg font-bold">Seconds</span>
				<input
					type="number"
					min="1"
					class="border-primary focus:border-accent focus:ring-accent w-16 rounded-sm border pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
					bind:value={seconds}
					on:input={(e) => {
						clearInterval(time);
						time = setInterval(
							() => {
								if (challenge) generateEx2Answer();
							},
							(e.target.value || 1) * 1000
						);
					}}
				/>
			</div>
		{/if}
		<div class="mb-3 text-3xl">
			Find the <span class="font-bold">{parseNote(notes[ex2Note])}</span> on the
			<span class="font-bold">{parseNote(string)}</span> string
		</div>
		{#if showError}
			<div class="text-sm text-orange-800">
				Not enough notes within current parameters. Please change the settings and try again.
			</div>
		{/if}
		{#if !challenge}
			<button
				on:click={generateEx2Answer}
				class="bg-primary hover:bg-primary-dark border-primary-dark mt-2 rounded-lg border-2 px-3 py-2 hover:text-white"
			>
				Next
			</button>
		{/if}
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
