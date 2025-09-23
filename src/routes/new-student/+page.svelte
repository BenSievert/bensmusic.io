<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Checkbox from '../../components/Checkbox.svelte';
	import Spinner from '../../components/Spinner.svelte';
	import RadioGroup from '../../components/RadioGroup.svelte';
	let name = $state(``);
	let favorites = $state(``);
	let teacherExpectations = $state(``);
	let misc = $state(``);
	let practiceIntent = $state(``);
	let experience = $state(``);
	let selectedAreasOfInterest = $state([]);
	let myGoals = $state(``);
	let formSubmitting = $state(false);
	let responseOk = $state();

	const teacherExpectationsOptions = [
		'Relaxed lessons at an easy going pace',
		'Balanced lessons with some accountability',
		'Structured lessons with consistent practice goals and weekly accountability',
		'Not sure yet'
	];
	const experienceOptions = [
		`Absolute beginner`,
		`Some experience but still fairly new`,
		`New to guitar but not new to music`,
		`Intermediate`,
		`Advanced`
	];
	const areasOfInterest = [
		`Music theory`,
		`Technique`,
		`Sight reading`,
		`Writing music`,
		`Covering songs`,
		`Relaxation`,
		`Recording`,
		`Music history`,
		`Gear`,
		`Perform live`,
		`Improvisation`,
		`Lead guitar`,
		`Rhythm guitar`,
		`Audition prep`,
		`Ear training`,
		`Singing`,
		`Other`,
		`Don't know yet`
	];
	let goalsOptions = [
		`I don't know what I want to do yet or where I want to go`,
		`I have some goals but I'm also open to guidance and being exposed to new things`,
		`I already know what I want to do and have clear and specific goals`
	];

	const practiceIntentOptions = [
		`I don't really play outside of lessons`,
		`A few minutes sporadically throughout the week`,
		`5-10 minutes per day`,
		`15-30 minutes per day`,
		`45-60 minutes per day`,
		`an hour or more`,
		`Not sure how much time I'm going to dedicate yet`
	];

	const onSubmit = async () => {
		formSubmitting = true;
		const response = await fetch(`/new-student`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				teacherExpectations,
				experience,
				myGoals,
				practiceIntent,
				misc,
				favorites,
				selectedAreasOfInterest: selectedAreasOfInterest.join(`, `)
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		responseOk = response.ok;
	};
</script>

<SitePage title="New Student Form">
	{#if responseOk !== undefined}
		<div
			class="{responseOk
				? `bg-green-200 text-green-800`
				: `bg-red-200 text-red-800`} py-16 text-center"
		>
			{responseOk
				? `Form Received and I've been notified.`
				: `Something went wrong, please try again or contact Ben.`}
		</div>
	{:else}
		<Section theme="secondary">
			{#if formSubmitting}
				<Spinner divClass="ml-4" svgClass="fill-primary-dark size-24" />
			{:else}
				<form onsubmit={onSubmit}>
					<label>
						<div class="text-primary-dark text-left text-lg">*Student name</div>
						<input
							class="placeholder-primary-dark border-primary focus:border-accent focus:ring-accent mr-1 mb-3 w-52 rounded border px-4 py-2 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
							bind:value={name}
						/>
					</label>
					<RadioGroup
						required
						title="Experience"
						choices={experienceOptions}
						bind:value={experience}
					/>
					<RadioGroup
						required
						title="Lesson Pace Preference"
						choices={teacherExpectationsOptions}
						bind:value={teacherExpectations}
					/>
					<RadioGroup
						required
						title="Direction and Goals"
						choices={goalsOptions}
						bind:value={myGoals}
					/>
					<RadioGroup
						required
						title="Practice Time"
						choices={practiceIntentOptions}
						bind:value={practiceIntent}
					/>
					<div class="text-primary-dark mt-4 text-left text-lg">
						Areas of interest <span class="text-sm">(Select all that apply)</span>
						<div class="grid w-max grid-cols-2 gap-1 text-xs md:grid-cols-3 md:text-base">
							{#each areasOfInterest as areaOfInterest}
								<Checkbox
									label={areaOfInterest}
									checked={selectedAreasOfInterest.includes(areaOfInterest)}
									handleInput={() => {
										if (selectedAreasOfInterest.includes(areaOfInterest))
											selectedAreasOfInterest = selectedAreasOfInterest.filter(
												(interest) => interest !== areaOfInterest
											);
										else selectedAreasOfInterest = [...selectedAreasOfInterest, areaOfInterest];
									}}
								/>
							{/each}
						</div>
					</div>
					<div class="text-primary-dark mt-4 text-left text-lg">
						Favorite genres, bands, or musicians
					</div>
					<textarea
						bind:value={favorites}
						class="w-full bg-white p-2"
						placeholder="Tell me about your favorite music."
					/>
					<div class="text-primary-dark mt-4 text-left text-lg">Additional Comments</div>

					<textarea
						bind:value={misc}
						class="min-h-32 w-full bg-white p-2"
						placeholder="Write anything else here you'd like me to know."
					/>
					<button
						disabled={!name ||
							!teacherExpectations ||
							!experience ||
							!myGoals ||
							!practiceIntent ||
							formSubmitting}
						class="shadow-pastel bg-primary-dark mt-4 cursor-pointer rounded-md px-5 py-2 text-lg text-white hover:bg-blue-700 disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-600 disabled:shadow-none"
						>Submit</button
					>
				</form>
				<div class="h-[200px]"></div>
			{/if}
		</Section>
	{/if}
	<button
		onclick={() => {
			console.log({ name, experience, myGoals, practiceIntent });
		}}>Click me</button
	>
</SitePage>
