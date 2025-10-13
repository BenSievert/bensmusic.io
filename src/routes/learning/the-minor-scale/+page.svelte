<script>
	import Stepper from '../../../components/Stepper.svelte';
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Button from '../../../components/Button.svelte';
</script>

{#snippet majorScale(synth, tone)}
	<Button
		onClick={() => {
			const now = tone.now();
			for (const [i, note] of [`C4`, `D4`, `E4`, `F4`, `G4`, `A4`, `B4`, `C5`].entries())
				synth.triggerAttackRelease([note], '8n', now + i * 0.4);
		}}
		text="1 2 3 4 5 6 7 1"
	></Button>
{/snippet}

{#snippet chordProgressions(synth, tone)}
	{#each [{ name: `i`, notes: [`C4`, `Eb4`, `G4`] }, { name: `ii°`, notes: [`D4`, `F4`, `Ab4`] }, { name: `bIII`, notes: [`Eb4`, `G4`, `Bb4`] }, { name: `iv`, notes: [`F4`, `Ab4`, `C5`] }, { name: `v`, notes: [`G4`, `Bb4`, `D5`] }, { name: `bVI`, notes: [`Ab4`, `C5`, `Eb5`] }, { name: `bVII`, notes: [`Bb4`, `D5`, `F5`] }] as chord}
		<Button
			text={chord.name}
			onClick={() => {
				synth.triggerAttackRelease(chord.notes, '8n');
			}}
		></Button>
	{/each}
{/snippet}

{#snippet compare(synth, tone)}
	<Button
		onClick={() => {
			const now = tone.now();
			for (const [i, note] of [`C4`, `D4`, `E4`, `F4`, `G4`, `A4`, `B4`, `C5`].entries())
				synth.triggerAttackRelease([note], '8n', now + i * 0.4);
		}}
		text="Major Scale"
	></Button>
	<Button
		onClick={() => {
			const now = tone.now();
			for (const [i, note] of [`C4`, `D4`, `Eb4`, `F4`, `G4`, `Ab4`, `Bb4`, `C5`].entries())
				synth.triggerAttackRelease([note], '8n', now + i * 0.4);
		}}
		text="Parallel Minor"
	></Button>
{/snippet}

{#snippet minorScale(synth, tone)}
	<Button
		onClick={() => {
			const now = tone.now();
			for (const [i, note] of [`A4`, `B4`, `C5`, `D5`, `E5`, `F5`, `G5`, `A5`].entries())
				synth.triggerAttackRelease([note], '8n', now + i * 0.4);
		}}
		text="6 7 1 2 3 4 5 6"
	></Button>
{/snippet}

{#snippet scaleDegrees(synth, tone)}
	{#each [[`C`, `1`], [`D`, `2`], [`Eb`, `b3`], [`F`, `4`], [`G`, `5`], [`Ab`, `b6`], [`Bb`, `b7`]] as note, i}
		<Button
			text={note[1]}
			onClick={() => {
				synth.triggerAttackRelease([`${note[0]}4`], '8n');
			}}
		></Button>
	{/each}
{/snippet}

<SitePage title="Learning" subtitle="The Minor Scale" hide>
	<Section theme="secondary" shiftable>
		<Stepper
			steps={[
				{
					title: `What is the Minor Scale?`,
					subSteps: [
						`Everything we've learned so far has been based around the major scale.`,
						`We're now going to explore a different scale called Natural Minor.`,
						`Natural minor is a mode of the major scale, but what does that mean.`
					]
				},
				{
					title: `Modes`,
					subSteps: [
						`Before we get into the way modes sound, let's discuss how we can make one.`,
						`Remember our major scale?`,
						majorScale,
						`What if we started and ended on 6 instead of one?`,
						minorScale,
						`The notes played in a different order give us a different feeling.`
					]
				},
				{
					title: `Naming things in minor`,
					subSteps: [
						`How is this scale different than major if it uses all the same notes?`,
						`What we just heard was called the relative minor of the major scale.`,
						`Without changing the pitches we used and simply changing the order we created a different sound`,
						`But what if we take the relationships between the notes we created and transposed them down to the starting pitch of major?`,
						compare,
						`It's much easier to hear how they're different now. The 3rd, 6th, and 7th notes are different. In minor they're a half step lower`,
						scaleDegrees,
						`For this reason, we label the notes in minor like this.`,
						`Try playing twinkle twinkle little star with - 1 1 5 5 b6 b6 5 4 4 b3 b3 2 2 1`,
						`It sounds darker than the major version.`
					]
				},
				{
					title: `Chords`,
					subSteps: [
						`Our chords in minor are similarly named.`,
						chordProgressions,
						`Try playing a i, iv, v in minor`,
						`Remember that is is just a reordering of our chords from major`,
						`If you play bIII, bVI, bVII itll sound just like I, IV, V does in major`,
						`We want to avoid doing that and instead treat "i" like home.`
					]
				},
				{
					title: `Altered Scales`,
					subSteps: [
						`When we use the word minor, we're usually referring to Natural Minor. There are two other minor scales worth discussing though.`,
						`Harmonic `
					]
				}
			]}
		/>
	</Section>
</SitePage>
