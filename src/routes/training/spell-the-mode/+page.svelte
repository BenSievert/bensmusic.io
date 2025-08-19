<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Checkbox from '../../../components/Checkbox.svelte';
	const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`];
	const modes = [`Ionian`, `Dorian`, `Phrygian`, `Lydian`, `Mixolydian`, `Aeolian`, `Locrian`];
	let selectedModes = $state([0, 5]);
	let focusedIndex = $state(0);
	const accidentals = [`b`, ``, `#`];
	const accidentalOrder = [`F`, `C`, `G`, `D`, `A`, `E`, `B`];
	const presets = [
		{label: `No Accidentals`, keys: [`C`]},
		{ label: `All Sharps`, keys: [`C`, `G`, `D`, `A`, `E`, `B`, `F#`]},
		{ label: `All Flats`, keys: [`C`, `F`, `Bb`, `Eb`, `Ab`, `Db`, `Gb`]},
		{ label: `One Accidental`, keys: [`C`, `F`, `G`]},
		{ label: `Two Accidentals`, keys: [`C`, `F`, `G`, `Bb`, `D`]},
		{ label: `Three Accidentals`, keys: [`C`, `F`, `G`, `Bb`, `D`, `Eb`, `A`]},
		{ label: `Four Accidentals`, keys: [`C`, `F`, `G`, `Bb`, `D`, `Eb`, `A`, `Ab`, `E`]},
		{ label: `Five Accidentals`, keys: [`C`, `F`, `G`, `Bb`, `D`, `Eb`, `A`, `Ab`, `E`, `Db`, `B`]},
		{ label: `Six Accidentals`, keys: [`C`, `F`, `G`, `Bb`, `D`, `Eb`, `A`, `Ab`, `E`, `Db`, `B`, `Gb`, `F#`]},

	]

	const keys = {
		Ab: { flats: 4 },
		A: { sharps: 3 },
		Bb: { flats: 2 },
		B: { sharps: 5 },
		C: {},
		Db: { flats: 5 },
		D: { sharps: 2 },
		Eb: { flats: 3 },
		E: { sharps: 4 },
		F: { flats: 1 },
		'F#': { sharps: 6 },
		Gb: { flats: 6 },
		G: { sharps: 1 }
	};
	const getNextLetter = (letter) => letters[(((letters.indexOf(letter) + 1) % 7) + 7) % 7];
	const sanitizeNote = (note) => note.replaceAll(/[b#]/g, ``);

	let correct = $state(false);
	const getNotesInKey = (key) => {
		let keySignature = keys[key];
		const { sharps, flats } = keySignature;
		const firstNote = key;
		let currentLetter = sanitizeNote(key);
		const notesInKey = [firstNote];
		let affectedAccidentals = [];
		let nextLetter;
		if (sharps) affectedAccidentals = accidentalOrder.slice(0, sharps);
		if (flats) affectedAccidentals = accidentalOrder.slice(-flats);

		for (const _ of letters.slice(0, -1)) {
			nextLetter = getNextLetter(currentLetter);
			if (affectedAccidentals.includes(nextLetter)) {
				notesInKey.push(`${nextLetter}${sharps ? `#` : `b`}`);
			} else notesInKey.push(nextLetter);
			currentLetter = nextLetter;
		}
		return notesInKey;
	};

	const keysWithNotes = Object.fromEntries(
		Object.keys(keys).map((key) => [key, getNotesInKey(key)])
	);
	let selectedKeys = $state([`C`]);

	const getRandom = (limit) => Math.floor(Math.random() * limit);

	let guesses = $state([``, ``, ``, ``, ``, ``, ``]);
	let mode = $state(selectedModes[getRandom(selectedModes.length)]);
	let key = $state(selectedKeys[getRandom(selectedKeys.length)]);

	let currentScale = $derived(keysWithNotes[key]);
	let currentScaleDegree = $derived(currentScale[(((mode + focusedIndex) % 7) + 7) % 7]);

	const win = () => {
		correct = true;
		setTimeout(() => {
			focusedIndex = 0;
			guesses.fill(``);
			correct = false;
			let newMode = mode;
			let newKey = key;
			while (newMode == mode && newKey == key) {
				newMode = selectedModes[getRandom(selectedModes.length)];
				newKey = selectedKeys[getRandom(selectedKeys.length)];
			}
			mode = newMode;
			key = newKey;
		}, 1000);
	};

	const attemptWin = () => {
		const sortedGuesses = guesses.slice();
		const sortedScale = currentScale.slice();
		sortedGuesses.sort();
		sortedScale.sort();

		if (sortedScale.every((guess, i) => guess === sortedGuesses[i])) {
			win();
		}
	};
</script>

<SitePage title="Spell the Mode" subtitle="Games and Exercises">
	<Section>
		<span class="text-primary-dark mr-2 text-xl font-bold">Included Modes</span>
		{#each modes as mode, i}
			<Checkbox
				checked={selectedModes.includes(i)}
				label={mode}
				className="mr-2"
				handleInput={() => {
					if (selectedModes.includes(i)) selectedModes = selectedModes.filter((mode) => mode !== i);
					else selectedModes = [...selectedModes, i];
				}}
			/>
		{/each}
		<div class="mb-2">
			<span class="text-primary-dark mr-2 text-xl font-bold">Included Keys</span>
			{#each Object.keys(keys) as key}
				<Checkbox
					checked={selectedKeys.includes(key)}
					label={key}
					className="mr-2"
					handleInput={() => {
						if (selectedKeys.includes(key))
							selectedKeys = selectedKeys.filter((selectedKey) => selectedKey !== key);
						else selectedKeys = [...selectedKeys, key];
					}}
				/>
			{/each}
		</div>
		<span class="text-primary-dark mr-2 text-xl font-bold">Presets</span>
		<select
				class="focus:outline-accent outline-primary cursor-pointer rounded border border-r-8 border-transparent bg-pink-50 outline"
				oninput={e => selectedKeys = presets[e.target.value].keys}
		>
			{#each presets as { label }, i}
				<option value={i}>{label}</option>
			{/each}
		</select>
		<div class="text-secondary-dark my-3 text-2xl">
			Spell {keysWithNotes[key][mode]}
			{modes[mode]}
		</div>
		<div class="mb-2">
			{#each guesses as guess, i}
				<input
					disabled={correct}
					class="placeholder-primary-dark border-primary focus:border-accent focus:ring-accent mr-1 mb-3 w-16 rounded-2xl border bg-pink-50 px-4 py-2 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
					bind:value={guesses[i]}
					onfocus={() => (focusedIndex = i)}
					onchange={attemptWin}
				/>
			{/each}
		</div>
		<div class="mb-4">
			{#each accidentals as accidental}
				<button
					class={`bg-primary hover:bg-primary-light mr-4 mb-1 w-16 rounded-md p-2`}
					disabled={correct}
					onclick={() => {
						guesses[focusedIndex] = `${sanitizeNote(currentScaleDegree)}${accidental}`;
						if (focusedIndex < 6) focusedIndex += 1;
						attemptWin();
					}}>{sanitizeNote(currentScaleDegree)}{accidental}</button
				>
			{/each}
		</div>
		<div
			class="mb-2 inline-block rounded-md p-2 {correct
				? `bg-green-600 text-white outline-2 outline-green-700`
				: `bg-gray-200 text-gray-300`}"
		>
			Correct
		</div>
	</Section>
</SitePage>
