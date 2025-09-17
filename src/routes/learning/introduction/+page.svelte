<script>
	import Stepper from '../../../components/Stepper.svelte';
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	const buttonClass = `bg-primary-dark hover:bg-primary rounded-md px-3 py-1 text-white m-1`
</script>




{#snippet note(synth)}
<button class={buttonClass} onclick={() => synth.triggerAttackRelease("C4", "8n")}>Click here to hear a note!</button>
{/snippet}

{#snippet intervals(synth, tone)}
<div>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease("C4", "8n", now);
		synth.triggerAttackRelease("E4", "8n", now + 0.5);
	}} class={buttonClass}>Ascending</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease("E4", "8n", now);
		synth.triggerAttackRelease("C4", "8n", now + 0.5);
	}} class={buttonClass}>Descending</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "E4"], "8n", now);
	}} class={buttonClass}>Simultaneous</button>
</div>
{/snippet}

{#snippet scale(synth, tone)}
<button
		class={buttonClass}
		onclick={() => {
			const now = tone.now()
			for (const [i, note] of [`C`, `D`, `E`, `F`, `G`, `A`, `B`].entries())
				synth.triggerAttackRelease([`${note}4`, ], "8n", now + i * .4);
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
				synth.triggerAttackRelease([`${note}4`, ], "8n");

		}}
	>{i + 1}</button>
{/each}
{/snippet}



{#snippet scaleDegreesExpanded(synth, tone)}
{#each [`3`,`4`,`5`] as octave}
{#each [`C`, `D`, `E`, `F`, `G`, `A`, `B`] as note, i}
	<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease([`${note}${octave}`, ], "8n");

		}}
	>{i + 1}</button>
{/each}
{/each}
{/snippet}


{#snippet allIntervals(synth, tone)}
<div>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "C#4"], "8n", now);
	}} class={buttonClass}>Minor 2nd</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "D4"], "8n", now);
	}} class={buttonClass}>Major 2nd</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "Eb4"], "8n", now);
	}} class={buttonClass}>Minor 3rd</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "E4"], "8n", now);
	}} class={buttonClass}>Major 3rd</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "F4"], "8n", now);
	}} class={buttonClass}>Perfect 4th</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "F#4"], "8n", now);
	}} class={buttonClass}>Tritone</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "G4"], "8n", now);
	}} class={buttonClass}>Perfect 5th</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "G#4"], "8n", now);
	}} class={buttonClass}>Minor 6th</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "A4"], "8n", now);
	}} class={buttonClass}>Major 6th</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "A#4"], "8n", now);
	}} class={buttonClass}>Minor 7th</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "B4"], "8n", now);
	}} class={buttonClass}>Major 7th</button>
	<button onclick={() => {
		const now = tone.now()
		synth.triggerAttackRelease(["C4", "C5"], "8n", now);
	}} class={buttonClass}>Octave</button>
</div>
{/snippet}

{#snippet chords(synth, tone)}
{#each [
	{name: `I`, notes: [`C4`, `E4`, `G4`]},
	{name: `ii`, notes: [`D4`, `F4`, `A4`]},
	{name: `iii`, notes: [`E4`, `G4`, `B4`]},
	{name: `IV`, notes: [`F4`, `A4`, `C5`]},
	{name: `V`, notes: [`G4`, `B4`, `D5`]},
	{name: `vi`, notes: [`A4`, `C5`, `E5`]},
	{name: `vii°`, notes: [`B4`, `D5`, `F5`]}
] as chord }
	<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(chord.notes, "8n");

		}}
	>{chord.name}</button>
{/each}
{/snippet}

<SitePage title="Learning" subtitle="Introduction to Music Theory">
	<Section theme="secondary">
		<Stepper
			steps={[
				{title: `Notes`,
				subSteps: [
					`A note is a <span class="font-bold">sound</span> with a <span class="font-bold">pitch</span>.`,
					`If you've played music before, you'll know that notes have names. Maybe you've seen notes named 'A' or 'G#' or 'Cb'.`,
					`We're not concerned with naming our notes yet. We're going to start off with a single note. Its name is unimportant to us right now.`,
					note,
					`Music would be pretty boring if all we had was one note. We're going to need some more notes.`
				]},
				{title: `Scales`, subSteps: [
						`A scale is a collection of notes of different pitches.`,
						`We'll start by learning the major scale. It's best to just hear it for right now and not think about how we chose the pitches in it.`,
						scale,
						`We don't have names for our notes yet, so we'll number them. These are called <span class="font-bold">scale degrees</span>`,
						scaleDegrees,
						`Try clicking on the buttons in this order - 1 1 5 5 6 6 5 4 4 3 3 2 2 1`,
						`This is the melody to Twinkle Twinkle Little Star. If you stop playing the song when you play 2 you'll notice that it sounds unfinished.`,
						`The different notes of our scale each have a different feeling. The first note is also called the tonic. It's the one that most feels like it doesn't want to go anywhere else.`,
						`Knowing how a note functions in the scale is more important than knowing its letter name. This is why I have not revealed any of the names of the notes.`
				]},
				{title: `Generic Intervals`, subSteps: [
						`You'll also notice that some of the jumps we made in Twinkle Twinkle were larger than others.`,
						`Going from 1 to 5 is larger than going from 5 to 6.`,
						`The distance between any two degrees of our scale is called a generic interval.`,
						`Moving between consecutive notes is what we call a 2nd. 1 to 2 is a 2nd, 2 to 3 is a 2nd, and so on`,
						`If we move by two notes instead we call it a 3rd. 1 to 3 is a 3rd, 4 to 2 is a 3rd, 3 to 5 is a 3rd and so on`,
						`This pattern follows for all notes in our scale. A distance of 3 notes is a 4th, 4 notes is a 5th, and so on.`,
				]},
				{title: `Octaves`,
				subSteps: [
						`You may notice that we cannot play every interval with the buttons I've provided. How can we play a 5th above degree 6 if our scale ends at 7?`,
						`Scales go up and down forever - The major scale repeats its pattern every 7 notes.`,
						`Here is a larger number of notes to play with.`,
						scaleDegreesExpanded,
						`Now we have three '1's. Some sound lower than others, but they all function the same. You can play Twinkle Twinkle starting on any '1'.`,
						`We now see that degree the 5th above degree 6 is the degree 3 above it. The degree 3 below that 6 is a 4th.`
				]
				},
				{title: `Chords`, subSteps: [
						`Chords are built from scales in 3rds. If we take 3 notes in our scale a 3rd apart and play them all at once we get a chord`,
						`Degrees 1, 3, 5 and form the first chord. 2, 4, and 6 the second chord and so on until we have 7 different chords`,
						`We've already used numbers for our scale degrees, so we're going to use roman numerals for our chords`,
						chords,
						`Some of these I've labeled as uppercase or lowercase, and the last one even has a degree symbol.`,
						`That's because our major scale forms what are called major, minor, and diminished chords. We'll figure out why we get different types of chords and their differences in the next lesson.`,
						`Like our scale degrees, our chords also feel a particular way. Play the chords I, IV, V, I.`,
						`Playing chords in sequence like this forms what we call a <span class="">chord progression</span>`,
						`Some chords go into other chords more easily than others, you can experiment with making your own chord progressions before moving on but try to start and end on the I chord for now.`
				] }
				,

			]}
		/>
	</Section>
</SitePage>
