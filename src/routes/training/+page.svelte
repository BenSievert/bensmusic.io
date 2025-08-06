<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Checkbox from '../../components/Checkbox.svelte';

	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`];
	let stringsState = $state([`E`,`A`,`D`,`G`,`B`, `E`]);
	let strings = $derived([...new Set(stringsState.filter(string => string != `None`))])
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
		for (const n of Array.from({ length: maxFret - minFret + 1 }, (_, i) => i)) {
			if (getNextNote(stringIndex , n + minFret) == toBeFound)
				return true;

		}
		return false;

	}

	const getPossible = (string: string) =>
		Array.from({ length: maxFret - minFret + 1 }, (_, i) => i).map(i => getNextNote2(notes.indexOf(string), i + minFret)).filter(value => selectedNotes.includes(value))



	const getNextNote = (note: number, interval = 1) => notes[(((note + interval) % 12) + 12) % 12]
	const getNextNote2 = (note: number, interval = 1) => (((note + interval) % 12) + 12) % 12

	const getRandomNote = (override?: number) => Math.floor(Math.random() * (override ?? 11));
	let note = $state(getRandomNote());
	let interval = $state(p5);
	let string = $state(`A`);
	let ex2Note = $state(0)
	let wrongGuesses = $state<string[]>([]);
	let selectedIntervals = $state([p5]);
	let selectedNotes = $state([0,2,3,5,7,8,10])
	let maxFret = $state(3)
	let minFret = $state(1)
	let challenge = $state(false)
	let seconds = $state(5)
	let showError = $state(false);
	let allPossible = $derived(strings.map(string => {
		return [string, getPossible(string)]

	}).filter(([_, notes]) => notes.length))

	let time = setInterval(() => {
			if (challenge)
				generateEx2Answer()
		}, seconds * 1000);

	const generateEx2Answer = () => {
		let newStringIndex;
		let newString
		let newEx2Note;

		if (allPossible.map(([_, n]) => n).flat().length < 2) {
			showError = true;
			return
		}

		do {
			newStringIndex = getRandomNote(allPossible.length);
			newString = allPossible[newStringIndex][0]
			newEx2Note = allPossible[newStringIndex][1][getRandomNote(allPossible[newStringIndex][1].length)]
		} while (newString == string && newEx2Note == ex2Note)

		showError = false;
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
		<div class="text-secondary-dark text-2xl mb-2 font-bold">Find the Note</div>
		<div class="mb-3">
		<span class="text-primary-dark font-bold text-lg mr-2">Tuning</span>
		{#each Array.from({ length: 6}) as _, i}
			<select
					bind:value={stringsState[i]}
					class="bg-white cursor-pointer w-18 mr-1 text-xs border border-accent-dark rounded-md py-0.5"
			>
				<option value="None">None</option>
				{#each notes as note }
					<option value={note}>{note}</option>
				{/each}
			</select>
		{/each}
		</div>
		<span class="text-primary-dark font-bold text-lg mr-2">Frets</span>
		<div class="text-secondary-dark text-sm inline-block mb-2 mr-2">Lowest
			<input
					type="number"
					min="0"
					max="24"
					class="pl-4 border-primary focus:border-accent focus:ring-accent rounded-sm border text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
					on:change={() =>  {if (minFret > maxFret)
						maxFret = minFret;
					}}
					bind:value={minFret}
			/>
		</div>
		<div class="text-secondary-dark text-sm inline-block">Highest
		<input
			type="number"
			min="0"
			max="24"
			class="pl-4 border-primary focus:border-accent focus:ring-accent rounded-sm border text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
			on:change={() =>  {if (maxFret < minFret)
						minFret = maxFret;
					}}
			bind:value={maxFret}
		/>
		</div>
		<div class="text-primary-dark text-lg font-bold mb-2">Notes
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
		<div class={`${challenge ? `mb-2` : `mb-4`} flex`} >
		<span class="text-primary-dark font-bold text-lg mr-2">Challenge Mode</span>
		<Checkbox
				noPadding={true}
				label=''
				handleInput={() => {
						clearInterval(time);
						if (!challenge) {
							time = setInterval(() => {
								if (challenge)
									generateEx2Answer()
							}, seconds * 1000);
						}
						challenge = !challenge
					}}
		/>
		</div>
		{#if challenge}<div class="mb-4">
			<span class="text-primary-dark font-bold text-lg mr-2">Seconds</span>
			<input
					type="number"
					min="1"
					class="w-16 pl-4 border-primary focus:border-accent focus:ring-accent rounded-sm border text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
					bind:value={seconds}
					on:input={e => {
				clearInterval(time);
				time = setInterval(() => {
					if (challenge)
						generateEx2Answer()
				}, (e.target.value || 1) * 1000);
			}}
			/>
		</div>
		{/if}
		<div class="mb-3 text-3xl">
			Find the <span class="font-bold">{notes[ex2Note]}</span> on the <span class="font-bold">{string}</span> string
		</div>
		{#if showError}
		<div class="text-orange-800 text-sm">
			Not enough notes within current parameters. Please change the settings and try again.
		</div>
		{/if}
		{#if !challenge}
			<button
					on:click={generateEx2Answer}
					class="mt-2 py-2 px-3 bg-primary hover:bg-primary-dark hover:text-white border-2 border-primary-dark rounded-lg">Next</button>

		{/if}



	</Section>
</SitePage>
