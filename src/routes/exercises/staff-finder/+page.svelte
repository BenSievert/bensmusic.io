<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import { getRandom } from '$lib/shared-functions';
	import Button from '../../../components/Button.svelte';

	const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`];
	const notes = {
		E1: `top-[31px]`,
		F1: `top-[25px]`,
		G1: `top-[19px]`,
		A1: `top-[13px]`,
		B1: `top-[7px]`,
		C1: `top-[1px]`,
		D1: `top-[-5px]`,
		E2: `top-[-11px]`,
		F2: `top-[-17px]`
	};
	let noteNames = Object.keys(notes);
	let wrongGuesses = $state([]);

	const getRandomNote = () => noteNames[getRandom(noteNames.length)];

	let note = $state(getRandomNote());
	let score = $state(0)
</script>

<SitePage title="Name the Note on the Staff" subtitle="Games and Exercises">
	<Section>
		<div class="relative mb-4 w-[120px] p-2">
			<span class="absolute left-1 z-10 text-7xl">𝄞</span>
			<svg
				class="absolute left-12 {notes[note]}"
				width="25"
				height="52"
				viewBox="0 0 64 128"
				xmlns="http://www.w3.org/2000/svg"
			>
				<!-- Note stem -->
				<rect x="40" y="10" width="5" height="80" fill="black" />

				<!-- Note head -->
				<ellipse cx="30" cy="92" rx="18" ry="12" fill="black" transform="rotate(-20 30 90)" />
			</svg>

			<div class="">
				{#each [0, 1, 2, 3, 4] as _}
					<div class="h-3 border-b"></div>
				{/each}
			</div>
		</div>
		<div class="font-bold mb-2">
			Score: {score}
		</div>
		{#each letters as letter}
			<Button
				disabled={wrongGuesses.includes(letter)}
				text={letter}
				onClick={() => {
					if (letter == note[0]) {
						let newNote = note;
						while (newNote == note) {
							newNote = getRandomNote();
						}
						note = newNote;
						if (!wrongGuesses.length)
							score += 1;
						wrongGuesses = [];
					} else {
						wrongGuesses.push(letter);
					}
				}}
			></Button>
		{/each}
	</Section>
	<Section disableTheme className="bg-green-50">
		<h2 class="text-2xl font-extrabold text-green-800">Instructions</h2>
		This exercise is meant to help you quickly read notes on the staff.
		<br /> You'll be shown a note  and you must select its correct name on the blue buttons.
		<br /> <br />
		Your score will only go up if your first guess is correct.
	</Section>
</SitePage>
