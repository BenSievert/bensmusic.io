<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Quiz from '../../components/Quiz.svelte';
	import Section from '../../components/Section.svelte';
</script>

<SitePage title="Quiz" subtitle="Music Theory Review">
	<Section theme="secondary">
		<Quiz
			questions={[
				{
					question: `What are all the notes in A Major?`,
					explanation: `According to the Circle of 5ths, A Major has 3 sharps and the order of sharps is FCGDAEB`,
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
					explanation: `The order of chords in a scale is I, ii, iii, IV, V, vi, vii° and G is the 5th note in the scale..`,
					answer: 2,
					choices: [`F Major`, `C Major`, `G Major`, `A minor`]
				},
				{
					question: `Which one of these chords is <span class="font-bold">NOT</span> in G major?`,
					explanation: `G major contains B Minor not B major because it's the iii chord.`,
					answer: 1,
					choices: [`A Minor`, `B Major`, `C Major`, `E Minor`]
				},
				{
					question: `A major third is a larger interval than a minor third.`,
					explanation: `a major 3rd is 4 half steps and a minor 3rd is 3.`,
					answer: 0,
					choices: [`True`, `False`]
				},
				{
					question: `What note is at the 5th fret of the D string?`,
					explanation: `G is at the 5th fret of the D string.`,
					answer: 3,
					choices: [`A`, `E`, `F`, `G`]
				},
				{
					question: `These notes typically create the least tension when creating a melody.`,
					choices: [`Chord tones`, `Diatonic non chord tones`, `Chromatic non chord tones`],
					answer: 0,
					explanation: `While it's not a hard and fast rule. Chord tones tend to produce the least tension.`
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
					explanation: `The major scale forms three different three note chords - Major, Minor, and Diminished`
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
	</Section>
</SitePage>
