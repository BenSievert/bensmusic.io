<script>
	import Stepper from '../../../components/Stepper.svelte';
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	const buttonClass = `bg-primary-dark hover:bg-primary rounded-md px-3 py-1 text-white m-1 cursor-pointer`;
</script>

{#snippet allIntervals(synth, tone)}
	{#each [{ note: 'C#4', name: `Minor 2nd` }, { note: 'D4', name: `Major 2nd` }, { note: 'Eb4', name: `Minor 3rd` }, { note: 'E4', name: `Major 3rd` }, { note: 'F4', name: `Perfect 4th` }, { note: 'F#4', name: `Tritone` }, { note: 'G4', name: `Perfect 5th` }, { note: 'G#4', name: `Minor 6th` }, { note: 'A4', name: `Major 6th` }, { note: 'A#4', name: `Minor 7th` }, { note: 'B4', name: `Major 7th` }, { note: 'C5', name: `Octave` }] as note}
		<button
			onclick={() => {
				const now = tone.now();
				synth.triggerAttackRelease('C4', '8n', now);
				synth.triggerAttackRelease(note.note, '8n', now + 0.4);
			}}
			class={buttonClass}>{note.name}</button
		>
	{/each}
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

{#snippet chords(synth, tone)}
	{#each [{ name: `Major`, notes: [`C4`, `E4`, `G4`] }, { name: `Minor`, notes: [`C4`, `Eb4`, `G4`] }, { name: `Diminished`, notes: [`C4`, `E4`, `Gb4`] }] as chord}
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(chord.notes, '8n');
			}}>{chord.name}</button
		>
	{/each}
{/snippet}

{#snippet chordProgressions(synth, tone)}
	{#each [{ name: `I`, notes: [`C4`, `E4`, `G4`] }, { name: `ii`, notes: [`D4`, `F4`, `A4`] }, { name: `iii`, notes: [`E4`, `G4`, `B4`] }, { name: `IV`, notes: [`F4`, `A4`, `C5`] }, { name: `V`, notes: [`G4`, `B4`, `D5`] }, { name: `vi`, notes: [`A4`, `C5`, `E5`] }, { name: `vii°`, notes: [`B4`, `D5`, `F5`] }] as chord}
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(chord.notes, '8n');
			}}>{chord.name}</button
		>
	{/each}
{/snippet}

{#snippet notes(synth, tone)}
{#each [{name:`A`, tone: `A4`}, {name:`A#/Bb`, tone: `A#4`}, {name:`B`, tone: `B4`}, {name:`C`, tone: `C5`}, {name:`C#/Db`, tone: `C#5`}, {name:`D`, tone: `D5`}, {name:`D#/Eb`, tone: `D#5`}, {name:`E`, tone: `E5`}, {name:`F`, tone: `F5`}, {name:`F#/Gb`, tone: `F#5`}, {name:`G`, tone: `G5`}, {name:`G#/Ab`, tone: `G#5`}] as note}
	<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(`${note.tone}`, '8n');
			}}>{note.name}</button
	>
{/each}
{/snippet}

<SitePage title="Learning" subtitle="Introduction to Music Theory Part 2" hide>
	<Section theme="secondary" shiftable>
		<Stepper
			steps={[
				{
					title: `Specific Intervals`,
					subSteps: [
						`In the last lesson we learned about generic intervals.`,
						`It turns out that every step of our scale is not qual. Some of the intervals are bigger than others despite having the same generic name.`,
						`For instance, degree 1 to degree 2 is a larger distance than degree 3 to degree 4.`,
						`See if you can hear the difference`,
						scaleDegrees,
						`This is true for the other generic intervals as well. Degree 1 to degree 3 is larger than degree 2 to degree 4.`,
						`There are 12 different specific intervals that can appear in music. Give each one a listen.`,
						allIntervals,
						`Specific intervals refer to exact ratios between notes. Generic intervals refer to differences between steps in a scale`,
						`In our major scale, degree 1 to degree 2 is a generic 2nd. The specific interval it is is a major 2nd.`,
						`Degree 3 to degree 4 is also a generic 2nd, but the specific interval it is is a minor 2nd.`,
						`Minor 2nds are also known as half steps and major 2nds are also known as whole steps. We can create a major scale by alternating whole and half steps.`,
						`We'll use 'w' for whole step and 'h' for half step.`,
						`The pattern is w w h w w w h`
					]
				},
				{
					title: `Chords Revisited`,
					subSteps: [
						`In the last lesson when I introduced chords I made some capital and some lowercase.`,
						`Chords that were capitalized are called major and chords that are lowercase are called minor. The chord with the degree symbol is called a diminished chord.`,
						`Listen to the differences between them.`,
						chords,
						`As we learned in the last lessons, chords have a root, 3rd, and 5th.`,
						`A major chord contains the root, a major 3rd above the root, and a perfect 5th above the root.`,
						`A minor chord contains the root, a minor 3rd above the root, and a perfect 5th above the root.`,
						`A diminished chord contains the root, a minor 3rd above the root, and a tritone above the root.`,
						`Try to hear the differences between the chords of the major scale.`,
						chordProgressions
					]
				},
				{
					title: `Named Notes`,
					subSteps: [
						`We're finally ready to reveal the names of all of our notes.`,
						`In our current system of music we can think of all the notes possible as being separated by half steps.`,
						`Notes of the same name up an octave are double that frequency and notes of the same name down an octave are half that frequency.`,
						notes,
						`Hold on a minute, why do some notes have a single letter name and some seem to have two names with a 'b' or '#'?`,
						`b is called the flat symbol and # is called the sharp symbol.`,
						`A# and Bb are the same pitch. On your instrument they're played exactly the same way. So why do we need two names for the same pitch?`,
						`This is what we call enharmonic equivalence, it's when two different names can refer to the same pitch.`,
						`There will be times when it's appropriate to call a note Bb and not A# even though they're the same pitch.`,
						`But why don't B and E have sharps? B and E do have sharps and you'll see them in music. They're enharmonically equivalent to C and F respectively.`
					]
				}
			]}
		/>
	</Section>
</SitePage>
