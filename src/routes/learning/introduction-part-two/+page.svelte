<script>
	import Stepper from '../../../components/Stepper.svelte';
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Quiz from '../../../components/Quiz.svelte';
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
	{#each [{ name: `A`, tone: `A4` }, { name: `A#/Bb`, tone: `A#4` }, { name: `B`, tone: `B4` }, { name: `C`, tone: `C5` }, { name: `C#/Db`, tone: `C#5` }, { name: `D`, tone: `D5` }, { name: `D#/Eb`, tone: `D#5` }, { name: `E`, tone: `E5` }, { name: `F`, tone: `F5` }, { name: `F#/Gb`, tone: `F#5` }, { name: `G`, tone: `G5` }, { name: `G#/Ab`, tone: `G#5` }] as note}
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(`${note.tone}`, '8n');
			}}>{note.name}</button
		>
	{/each}
{/snippet}

{#snippet keySignatures(synth, tone)}
	<div>
		<div>
			<button
				class={buttonClass}
				onclick={() => {
					const now = tone.now();
					synth.triggerAttackRelease(['C4', `E4`, `G4`], '8n', now);
					synth.triggerAttackRelease([`F4`, `A4`, `C5`], '8n', now + 0.5);
					synth.triggerAttackRelease([`G4`, `B4`, `D5`], '8n', now + 1);
					synth.triggerAttackRelease(['C4', `E4`, `G4`], '4n', now + 1.5);
				}}
			>
				Establish C Major
			</button>
			<button
				class={buttonClass}
				onclick={() => {
					const now = tone.now();
					synth.triggerAttackRelease(['G4', `B4`, `D5`], '8n', now);
					synth.triggerAttackRelease([`C5`, `E5`, `G5`], '8n', now + 0.5);
					synth.triggerAttackRelease([`D5`, `F#5`, `A5`], '8n', now + 1);
					synth.triggerAttackRelease(['G4', `B4`, `D5`], '4n', now + 1.5);
				}}
			>
				Establish G Major
			</button>
		</div>
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(`C4`, '4n');
			}}>C</button
		>
		<button
			class={buttonClass}
			onclick={() => {
				synth.triggerAttackRelease(`G4`, '4n');
			}}>G</button
		>
	</div>
{/snippet}

{#snippet quiz()}
	<Quiz
		questions={[
			{
				question: `What are all the notes in A Major?`,
				explanation: `According to the Circle of 5ths, A Major has 3 sharps and the order of sharps is FCGDAEB.`,
				answer: 2,
				choices: [
					`A, B, C#, D#, E, F#, G#`,
					`A, B, C#, D#, E, F, G#`,
					`A, B, C#, D, E, F#, G#`,
					`A, B, C, D, E, F, G`
				]
			},
			{
				question: `A generic interval refers to the distance between notes in a scale`,
				explanation: `Generic intervals refer to distances between notes in a scale. Specific intervals refer to exact relationships.`,
				answer: 0,
				choices: [`True`, `False`]
			},
			{
				question: `Which one of these is the V chord in the key of C major?`,
				explanation: `The order of chords in a scale is I, ii, iii, IV, V, vi, vii° and G is the 5th note in the scale.`,
				answer: 2,
				choices: [`F Major`, `C Major`, `G Major`, `A minor`]
			},
			{
				question: `Which one of these chords is <span class="font-bold">NOT</span> in G major?`,
				explanation: `G major contains B Minor not B major as the iii chord.`,
				answer: 1,
				choices: [`A Minor`, `B Major`, `C Major`, `E Minor`]
			},
			{
				question: `What are the types of three note chords formed by the major scale?`,
				choices: [
					`Major`,
					`Major and Minor`,
					`Major, Minor, and Diminished`,
					`Major, Minor, and Augmented`
				],
				answer: 2,
				explanation: `The major scale forms three different three note chords - major, minor, and diminished`
			},
			{
				question: `B and E do not have sharps, and you will never see B# or E# written in music'`,
				choices: [`True`, `False`],
				answer: 1,
				explanation: `B and E do have sharps - They're enharmonically equivalent with C and F respectively. You'll see both B# and E# in the key of C# major.`
			},
			{
				question: `Which specific interval(s) in a minor chord is/are different than in a major chord? Example: C Major vs C minor `,
				choices: [`The fifth`, `The third`, `The third and fifth`],
				answer: 1,
				explanation: `Both major and minor chords have a perfect fifth. But major chords have a major third and minor chords have a minor third.`
			}
		]}
	/>
{/snippet}

<SitePage title="Learning" subtitle="Introduction to Music Theory Part 2" hide>
	<Section theme="secondary" shiftable>
		<Stepper
			steps={[
				{
					title: `Specific Intervals`,
					subSteps: [
						`In the last lesson we learned about generic intervals.`,
						`It turns out that every step of our scale is not equal. Some of the intervals are bigger than others despite having the same generic name.`,
						`For instance, degree 1 to degree 2 is a larger distance than degree 3 to degree 4.`,
						`See if you can hear the difference`,
						scaleDegrees,
						`This is true for the other generic intervals as well. Degree 1 to degree 3 is larger than degree 2 to degree 4.`,
						`There are 12 different specific intervals that can appear in music. Give each one a listen.`,
						allIntervals,
						`Specific intervals refer to exact ratios between notes. Generic intervals refer to differences between steps in a scale. This distinction is important.`,
						`In our major scale, degree 1 to degree 2 is a generic 2nd. The specific interval it is is a major 2nd.`,
						`Degree 3 to degree 4 is also a generic 2nd, but the specific interval it is is a minor 2nd.`
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
				},
				{
					title: `Named Notes in Scales`,
					subSteps: [
						`Since we have 12 pitches in our music, we have 12 major scales that start on a different pitch.`,
						`We also have scales that are enharmonically equivalent. The F# major scale uses the same pitches as the Gb major scale`,
						`Choosing whether to call the key you're in F# major or Gb major is often a personal preference. Some instruments also are easier to play in either sharp or flat keys more.`,
						`How do we figure out what notes are in a scale?`,
						`Every major scale we have will use the <span class="italic">letters</span> A,B,C,D,E,F,and G in some order without exception.`,
						`C major happens to have the notes C,D,E,F,G,A,B`,
						`G major happens to have the notes G,A,B,C,D,E,F#,G`,
						`Notice Im talking about <span class="italic">letters</span> and not notes. Both C and G contain the letter F in their scale but C major contains an F natural and G major contains an F#`,
						`When a note has a # or a b sign after it, we call that an accidental.`,
						`C major has no accidentals - G major has 1.`
					]
				},
				{
					title: `Named Notes in Scales Continued`,
					subSteps: [
						`We have a chart to figure out the notes in any scale, it's called the Circle of 5ths.`,
						`<img src="/assets/circleoffifths.png" class="w-[260px]" />`,
						`I recommend printing this out and keeping it for reference. If you're one of my students, I've probably printed this out and given it to you.`,
						`This chart is a lot to take in, but we'll learn it piece by piece.`
					]
				},
				{
					title: `Exploring the Circle of 5ths`,
					subSteps: [
						`The red ring of notes are the names of the major scales. we'll ingore the inner band of green notes for now.`,
						`Inside the gray band are the number of accidentals in that key signature.`,
						`G major has 1 #, F major has 1 b`,
						`At the bottom of the page are the enharmonic keys. Db major has 5b's and C# major has 7#'s`,
						`Outside of the red letters are what are called <span class="font-bold">key signatures</span>. They tell you what notes are sharp of flat in a given key.`,
						`If you can't read music, you're not out of luck. There's a way to figure out which notes will be sharp or flat without knowing how to read music.`
					]
				},
				{
					title: `The Sharp Keys`,
					subSteps: [
						`You'll notice that if we start on C and go clockwise around the circle (at least for the first half) The number of sharps goes up by one at each key signature.`,
						`G major has 1 sharp, D Major has two, and so on.`,
						`G major has one sharp, it's F#. D major has two, it's F# and C#. A major has F#, C#, and G#`,
						`Seeing a pattern? Once we have a sharp in our key, that sharp will also be in our next key as we go clockwise.`,
						`There's an order the sharps appear in. First F# will appear, then F#, and C# and so on in the order of FCGDAEB.`,
						`We can remember this order with the mnemonic device "Fat Cats Go Down Alleys Eating Birds".`,
						`The key signature with four sharps can be remembered as "Fat Cats Go Down" - it'll contain the notes F#, C#, G#, and D#. as well as E, A, and B.`,
						`Let's put this into practice. If we want to find the notes in B major we'll find it on our Circle of 5ths and see that is has 5#'s`,
						`We'll take the first 5 words of our mnemonic device and see that it will contain F#, C#, G#, D#, and A#`,
						`Remember that I said all major scales will contain 7 letters?`,
						`B major obviously starts on B so there's our first note. The letter after B is C but our device tells us it will be a C#.`,
						`If we continue we'll see that our scale is B, C#, D#, E, F#, G#, and A#`
					]
				},
				{
					title: `The Flat Keys`,
					subSteps: [
						`Not all of our keys contain sharps, so how do we figure out the notes in those.`,
						`If we start on C and go counter clockwise around the circle of 5ths we'll see that the number of flats increase by one`,
						`The order the flats appear in is actually the reverse order the sharps appear in. It'll be BEADGCF`,
						`I remember this by the word Bead GCF, but some people use Before Eating A Donut Get Coffee First.`,
						`Let's figure out the notes in Bb major. It'll have two flats, B and E will be flat.`,
						`Our scale will be Bb, C, D, Eb, F, G, and A `
					]
				},
				{
					title: `Keys`,
					subSteps: [
						`So we have all these different major scales but what's the point? Do they sound different?`,
						`What we're about to discover is our major scales connection to key signatures.`,
						`Remember when we discussed scale degrees in the first lesson and all our different scale degrees sounded different?`,
						`When a note sounds like the first scale degree- we say we are in the key of that note.`,
						`When the note C, sounds like degree 1, we're in C major.`,
						`The key of G major also has the note C in it. But in G major, G will sound like degree 1, and C will sound like degree 4.`,
						`This isn't a very intuitive concept, so let's hear it.`,
						`The buttons on the top will establish the key in your ear. This means after playing 'Establish C Major' the note C should feel like degree 1.`,
						`After playing 'Establish C Major' clicking on the C below should feel like and clicking on G should not.`,
						`Clicking on 'Establish G major' and then clicking on G below should feel like home but clicking on C should not.`,
						keySignatures,
						`Yes the pitches in G major are higher in this example but try not to focus on that. Try to hear how the notes <span class="italic">feel</span> in the two different keys.`
					]
				},
				{
					title: `Review`,
					subSteps: [
						`There was a lot we learned this lesson but here are the main things you should remember.`,
						`Specific intervals refer to actual relationships between two pitches whereas generic intervals refer to steps in a scale.`,
						`The three different chords we learned contain different specific intervals.`,
						`There are 12 different pitches we have in music to use, some of which have multiple names.`,
						`A key signature tells us how the notes in that key function.`,
						`The Circle of 5ths can tell us the names of the notes in any key.`
					]
				},
				{ title: `Quiz`, subSteps: [quiz] }
			]}
		/>
	</Section>
</SitePage>
