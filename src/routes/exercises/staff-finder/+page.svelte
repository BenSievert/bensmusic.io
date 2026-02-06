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
						wrongGuesses = [];
					} else {
						wrongGuesses.push(letter);
					}
				}}
			></Button>
		{/each}
	</Section>
</SitePage>
