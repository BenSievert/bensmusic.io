<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Checkbox from '../../../components/Checkbox.svelte';
	import { PitchDetector } from 'pitchy';

	const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', `D`, `D#/Eb`, `E`, 'F', 'F#/Gb', `G`, `G#/Ab`];
	const allStrings = [`E`, `A`, `D`, `G`, `B`, `E`]
	const highStrings = [``,``,``,`G`,`B`,`E`]
	let stringsState = $state(highStrings);
	let score = $state(0);
	let strings = $derived([...new Set(stringsState.filter((string) => string != ``))]);

	import { onMount } from 'svelte';

	let pitch: number | null = $state(null);
	let clarity: number | null = null;

	let audioContext: AudioContext;
	let analyser: AnalyserNode;
	let dataArray: Float32Array;
	let detector;
	let dedup = $state(false);
	let autoDetect = $state(false);
	let autoDetectInterval;
	const presets = [
		{label: `1st Position - High Strings`, frets: [0, 4], tuning: highStrings},
		{label: `1st Position - All Strings`, frets: [0, 4], tuning: allStrings},
		{label: `3rd Position - High Strings`, frets: [3, 6], tuning: highStrings},
		{label: `3rd Position - All Strings`, frets: [3, 6], tuning: allStrings},
		{label: `5th Position - High Strings`, frets: [5, 8], tuning: highStrings},
		{label: `5th Position - All Strings`, frets: [5, 8], tuning: allStrings},
		{label: `7th Position - High Strings`, frets: [7, 10], tuning: highStrings},
		{label: `7th Position - All Strings`, frets: [7, 10], tuning: allStrings},
		{label: `9th Position - High Strings`, frets: [9, 12], tuning: highStrings},
		{label: `9th Position - All Strings`, frets: [9, 12], tuning: allStrings},
	]

	onMount(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(stream);

			analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			const bufferLength = analyser.fftSize;
			dataArray = new Float32Array(bufferLength);
			detector = PitchDetector.forFloat32Array(bufferLength);
			detector.minVolumeAbsolute = 0.02;
			source.connect(analyser);
		} catch (e) {}
	});

	if (autoDetect)
		autoDetectInterval = setInterval(() => {
			detect();
		}, 250);

	function detect() {
		analyser.getFloatTimeDomainData(dataArray);

		const [detectedPitch, detectedClarity] = detector.findPitch(dataArray, audioContext.sampleRate);
		if (dedup) return;
		if (detectedClarity > 0.92) {
			pitch = detectedPitch;
			clarity = detectedClarity;
		} else {
			pitch = null;
			clarity = null;
		}

		if (!detectedPitch || detectedPitch <= 0) return;

		const midi = Math.round(72 + 12 * Math.log2(detectedPitch / 440));
		const noteIndex = midi % 12;
		if (noteIndex == ex2Note) win();
	}

	const getPossible = (string: string) =>
		Array.from({ length: maxFret - minFret + 1 }, (_, i) => i)
			.map((i) => getNextNote2(notes.indexOf(string), i + minFret))
			.filter((value) => selectedNotes.includes(value));

	const getNextNote = (note: number, interval = 1) => notes[(((note + interval) % 12) + 12) % 12];
	const getNextNote2 = (note: number, interval = 1) => (((note + interval) % 12) + 12) % 12;

	const getRandomNote = (override?: number) => Math.floor(Math.random() * (override ?? 11));
	let string = $state(`A`);
	let ex2Note = $state(0);
	let selectedNotes = $state([0, 2, 3, 5, 7, 8, 10]);
	let maxFret = $state(4);
	let minFret = $state(0);
	let challenge = $state(false);
	let seconds = $state(5);
	let showError = $state(false);
	let noteDisplay = $state(`sharps`);
	let correct = $state(false);
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

	const win = () => {
		correct = true;
		dedup = true;
		clearInterval(time);
		setTimeout(() => {
			dedup = false;
			correct = false;
			score += 1;
			if (challenge) {
				time = setInterval(() => {
					if (challenge) generateEx2Answer();
				}, seconds * 1000);
			}

			generateEx2Answer();
		}, 1000);
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
</script>

<SitePage title="Find the Note" subtitle="Games and Exercises">
	<Section theme="secondary">
		<div class="mb-2 flex-col">
			<div class="text-primary-dark mr-2 text-lg font-bold sm:inline-block">Tuning</div>
			{#each Array.from({ length: 6 }) as _, i}
				<select
					bind:value={stringsState[i]}
					class="mb-1 block cursor-pointer bg-white pl-1 sm:inline-block {noteDisplay == `both`
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
				onchange={() => {
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
				onchange={() => {
					if (maxFret < minFret) minFret = maxFret;
				}}
				bind:value={maxFret}
			/>
		</div>
		<div class="text-primary-dark mb-2 text-lg font-bold">
			Notes
			<div class="grid w-max grid-cols-4 gap-1 sm:grid-cols-6">
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
		<div class="flex">
			<span class="text-primary-dark mr-2 text-lg font-bold">Auto Detect (Beta)</span>
			<Checkbox
				noPadding={true}
				label=""
				handleInput={() => {
					clearInterval(autoDetectInterval);
					if (!autoDetect) {
						autoDetectInterval = setInterval(() => {
							detect();
						}, 250);
					}
					autoDetect = !autoDetect;
				}}
			/>
		</div>
		<div class="mb-4 text-xs text-orange-800">
			This mode is in beta and janky. It will attempt to detect the note you play through your
			microphone. If you try it out let me know how it went.
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
		<span class="text-primary-dark mr-2 text-xl font-bold">Presets</span>
		<select
				class="focus:outline-accent outline-primary cursor-pointer rounded border border-r-8 border-transparent bg-pink-50 outline mb-2"
				oninput={e => {
					const {frets, tuning} = presets[e.target.value]
					minFret = frets[0]
					maxFret = frets[1]
					stringsState = tuning;
				}}
		>
			{#each presets as { label }, i}
				<option value={i}>{label}</option>
			{/each}
		</select>
		{#if challenge}
			<div class="mb-4">
				<span class="text-primary-dark mr-2 text-lg font-bold">Seconds</span>
				<input
					type="number"
					min="1"
					class="border-primary focus:border-accent focus:ring-accent w-16 rounded-sm border pl-4 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
					bind:value={seconds}
					oninput={(e) => {
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
			On the <span class="font-bold">{parseNote(string)}</span> string find
			<span class="font-bold">{parseNote(notes[ex2Note])}</span>
		</div>
		{#if showError}
			<div class="text-sm text-orange-800">
				Not enough notes within current parameters. Please change the settings and try again.
			</div>
		{/if}
		{#if !challenge}
			<button
				onclick={generateEx2Answer}
				class="bg-primary hover:bg-primary-dark border-primary-dark mt-2 rounded-lg border-2 px-3 py-2 hover:text-white"
			>
				Next
			</button>
		{/if}
		{#if autoDetect}
			<div
				class="mb-2 inline-block rounded-md p-2 {correct
					? `bg-green-600 text-white outline-2 outline-green-700`
					: `bg-gray-200 text-gray-300`}"
			>
				Correct
			</div>
			<div class="text-lg">Score: <span class="font-bold">{score}</span></div>
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
