<script>
	import Stepper from '../../../components/Stepper.svelte';
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	const buttonClass = `bg-primary-dark hover:bg-primary rounded-md px-3 py-1 text-white m-1 cursor-pointer`;
</script>


<SitePage title="Effective Practice" subtitle="Making the most of your time" hide>
	<Section theme="secondary" shiftable>
		<Stepper
			noEnable
			steps={[
				{
					title: `Intro`,
					subSteps: [
						`Practice is what actually makes you better at playing music.`,
						`It's even more important than having a music teacher.`,
						`But how do you practice?`,
						`Many advanced musicians don't know the most effective practice methods themselves, they just repeat what their teacher told them who in turn repeat what their teachers told them.`,
						`But there are better and worse ways to practice.`,
						`The following information is taken from Noa Kageyama's course BulletProof Musician.`,
						`Noa is a highly respected performance psychologist and the beginning of the course focuses on how to practice effectively.`,
					]
				},
				{
					title: `Deliberate Practice`,
					subSteps: [
						`Deliberate practice is <span class="italic">thoughtful, analytical,</span> and <span class="italic">mindful</span>.`,
						`Mindless practice may work in the short term, but will lead to plateauing`,
						`When you practice, you should have a very specific goal in mind before beginning.`,
						`Afterwards, you should reflect on what happened.`,
						`This will cause you to make specific adjustments and allow you to better reflect on what went right or wrong.`,
						`When you practice like this it creates a feedback loop where you're always reflecting and making adjustements.`,
						`Example of good practice:`,
						`Before: When I play this passage, I'm going to make sure my pinky is not flying all over the place.`,
						`After: I didn't keep my pinky in, so my movement was not that efficient.`,
						`Example of bad practice:`,
						`Before: When I play this passage, Im going to play it good.`,
						`After: I didn't try hard enough, so I didn't do good.`
					]
				},
				{
					title: `Retrieval Practice`,
					subSteps: [
						`The ability to retrieve your skills is just as important as having them.`,
						`There's a difference in how you're performing in a given moment and how much you've actually <span class="italic">learned</span>.`,
						`This means that you may have started the day performing poorly, worked on something, and by the end of the day been performing pretty well.`,
						`The next day you may find you've lost the progress you made the day before.`,
						`Most musicians practice to maximize <span class="italic">performance</span> and not <span class="italic">learning</span>.`,
						`So how can we maximize learning?`
					]},
					{
					title: `Retrieval Practice Continued`,
					subSteps: [
						`Spacing your practice out throughout the day helps you practice retrieving information.`,
						`30 minutes in the morning and 30 minutes in the evening is better than one hour in the morning`,
						`The more often you switch the thing you're working on during practice, the better you'll learn.`,
						`Working on Song A for 15 minutes and then Song B for 15 minutes is not as switching between them more often`,
						`Try to change the variables often as you play. Play it loud, then soft. Play it slow then fast. This will make you flexible.`
					]},
					{
					title: `Performance Practice`,
					subSteps: [
						`This section is for those who wish to perform live. If you'd like to record pieces in fewer takes this is also helpful.`,
						`In preparation for a performance you're giving, you should run through the entire piece as early as possible.`,
						`Even if you do not feel all the individual parts are ready, this helps acclimate you to pressure and getting it right the first time.`,
						`It's good to practice one day, then record a run through the beginning of the next day.`
					]}

			]}
		/>
	</Section>
</SitePage>
