<script>
	import Stepper from '../../../components/Stepper.svelte';
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	const buttonClass = `bg-primary-dark hover:bg-primary rounded-md px-3 py-1 text-white m-1 cursor-pointer`;
</script>

{#snippet note(synth)}
	<button class={buttonClass} onclick={() => synth.triggerAttackRelease('C4', '8n')}
		>Click here to hear a note!</button
	>
{/snippet}

{#snippet intervals(synth, tone)}
	<div>
		<button
			onclick={() => {
				const now = tone.now();
				synth.triggerAttackRelease('C4', '8n', now);
				synth.triggerAttackRelease('E4', '8n', now + 0.5);
			}}
			class={buttonClass}>Ascending</button
		>
		<button
			onclick={() => {
				const now = tone.now();
				synth.triggerAttackRelease('E4', '8n', now);
				synth.triggerAttackRelease('C4', '8n', now + 0.5);
			}}
			class={buttonClass}>Descending</button
		>
		<button
			onclick={() => {
				const now = tone.now();
				synth.triggerAttackRelease(['C4', 'E4'], '8n', now);
			}}
			class={buttonClass}>Simultaneous</button
		>
	</div>
{/snippet}

{#snippet scale(synth, tone)}
	<button
		class={buttonClass}
		onclick={() => {
			const now = tone.now();
			for (const [i, note] of [`C`, `D`, `E`, `F`, `G`, `A`, `B`].entries())
				synth.triggerAttackRelease([`${note}4`], '8n', now + i * 0.4);
		}}
	>
		Hear the major scale
	</button>
{/snippet}

{#snippet scaleDegrees(synth, tone)}
	{#each [`C`, `D`, `E`, `F`, `G`, `A`, `B`] as note, i}
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease([`${note}4`], '8n');
			}}>{i + 1}</button
		>
	{/each}
{/snippet}

{#snippet scaleDegreesExpanded(synth, tone)}
	{#each [`3`, `4`, `5`] as octave}
		{#each [`C`, `D`, `E`, `F`, `G`, `A`, `B`] as note, i}
			<button
				class={buttonClass}
				onclick={() => {
					synth.triggerAttackRelease([`${note}${octave}`], '8n');
				}}>{i + 1}</button
			>
		{/each}
	{/each}
{/snippet}

{#snippet chords(synth, tone)}
	{#each [{ name: `I`, notes: [`C4`, `E4`, `G4`] }, { name: `ii`, notes: [`D4`, `F4`, `A4`] }, { name: `iii`, notes: [`E4`, `G4`, `B4`] }, { name: `IV`, notes: [`F4`, `A4`, `C5`] }, { name: `V`, notes: [`G4`, `B4`, `D5`] }, { name: `vi`, notes: [`A4`, `C5`, `E5`] }, { name: `vii°`, notes: [`B4`, `D5`, `F5`] }] as chord}
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(chord.notes, '8n');
			}}>{chord.name}</button
		>
	{/each}
{/snippet}

<SitePage title="Learning" subtitle="Introduction to Music Theory Part 1" hide>
	<Section theme="secondary" shiftable>
		<Stepper
			steps={[
				{
					title: `Notes`,
					subSteps: [
						`A note is a <span class="font-bold">sound</span> with a <span class="font-bold">pitch</span>.`,
						`If you've played music before, you'll know that notes have names. Maybe you've seen notes named 'A' or 'G#' or 'Cb'.`,
						`Naming our notes right now will only confuse us. For now, the names of our notes are unimportant.`,
						note,
						`Music would be pretty boring if all we had was one note. We're going to need more.`
					]
				},
				{
					title: `Scales`,
					subSteps: [
						`One of the ways we can get more notes is to take them from a scale. A scale is a collection of notes of different pitches.`,
						`The scale we'll learn first is called the major scale. It's best to hear it for right now and not think about how we got all the notes in it.`,
						scale,
						`Since we don't have names for our notes yet, we'll number them. These are called <span class="font-bold">scale degrees</span>.`,
						scaleDegrees,
						`Try clicking on the buttons in this order - 1 1 5 5 6 6 5 4 4 3 3 2 2 1`,
						`This is the melody to Twinkle Twinkle Little Star. If you stop playing the song on the second to last note you'll notice that it sounds unfinished.`,
						`The different notes of our scale each have a different feeling. The first note is also called the tonic. It's the one that most feels like it doesn't want to go anywhere else.`,
						`Knowing how a note functions in the scale is more important than knowing its letter name. This is why I have not revealed any of the names of the notes.`
					]
				},
				{
					title: `Generic Intervals`,
					subSteps: [
						`You'll also notice that some of the jumps we made in Twinkle Twinkle were larger than others.`,
						`Going from 1 to 5 is larger than going from 5 to 6.`,
						`The distance between any two degrees of our scale is called a generic interval.`,
						`Moving between consecutive notes is what we call a 2nd. degree 1 to 2 is a 2nd, degree 2 to 3 is a 2nd, and so on.`,
						`If we move by two notes instead we call it a 3rd. degree 1 to 3 is a 3rd, degree 4 to 2 is a 3rd, degree 3 to 5 is a 3rd and so on.`,
						`This pattern follows for all notes in our scale. A distance of 3 notes is a 4th, 4 notes is a 5th, and so on.`
					]
				},
				{
					title: `Octaves`,
					subSteps: [
						`You may notice that we cannot play every interval with the buttons I've provided. How can we play a 5th above degree 6 if our scale ends at degree 7?`,
						`Scales go up and down forever - The major scale repeats its pattern every 7 notes.`,
						`Here is a larger number of notes to play with.`,
						scaleDegreesExpanded,
						`Now we have three '1's. Some sound lower than others, but they all function the same. You can play Twinkle Twinkle starting on any '1'.`,
						`We now see that degree the 5th above degree 6 is the degree 3 above it.`
					]
				},
				{
					title: `Chords`,
					subSteps: [
						`Chords are built from scales in 3rds. If we take 3 notes in our scale each a 3rd from the next and play them all at once we get a chord.`,
						`Chords also have generic intervals in them. The first note of a chord is called the root. The second is called the 3rd, and the third is called the 5th.`,
						`Degrees 1, 3, and 5 form the first chord. 2, 4, and 6 the second chord and so on until we have 7 different chords.`,
						`We've already used numbers for our scale degrees, so we're going to use roman numerals for our chords.`,
						chords,
						`These are labeled as uppercase or lowercase, and the last one even has a degree symbol.`,
						`That's because our major scale forms different types of chords. We'll explore these differences in the next lesson.`,
						`Like our scale degrees, our chords also feel a particular way. Play the chords I, IV, V, I.`,
						`Playing chords in sequence like this forms what we call a <span class="font-bold">chord progression</span>.`,
						`You can experiment with making your own chord progressions before moving on but try to start and end on the I chord for now.`
					]
				},
				{
					title: `Review`,
					subSteps: [
						`Here are the main takeaways you should get from this lesson.`,
						`A note is a <span class="font-bold">sound</span> with a <span class="font-bold">pitch</span>.`,
						`Notes of different pitches can be formed into scales.`,
						`The letter names of notes are not as important to us as how the note is functioning within the scale.`,
						`The distance between two scale degrees is called a generic interval.`,
						`We can form chords from our scale by building them in 3rds.`,
						`Playing chords in a sequence forms a <span class="font-bold">chord progression</span>.`
					]
				}
			]}
		/>
	</Section>
</SitePage>
