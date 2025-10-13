<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Input from '../../../components/Input.svelte';
	import Checkbox from '../../../components/Checkbox.svelte';
	import Button from '../../../components/Button.svelte';
	import { tick } from 'svelte';
	let totalTime = $state(20);
	let taskTime = $state(10);
	let timeLeft = $state(20 * 60);
	let tilNext = $state(10 * 60);
	const blueTheme = { bg: `bg-blue-100`, text: `text-primary-dark` };
	const greenTheme = { bg: `bg-green-100`, text: `text-green-800` };
	const nextContent = {
		title: `Change Tasks`,
		desc: `Time to start working on something else.`,
		button: true,
		...blueTheme
	};
	let totalInterval;
	let nextInterval;
	let paused = $state(true);
	let changeState = $state(false);
	let suggestion = $state(``);
	let audioEnabled = $state(false);

	let changeContent = $state(nextContent);
	const changeStates = [];

	const playAlarm = () => {
		if (audioEnabled) document.getElementById('alarmSound').play();
	};

	const resetNext = (next: number, sentPause = paused) => {
		clearInterval(nextInterval);
		tilNext = next;
		if (!sentPause)
			tick().then(() => {
				nextInterval = setInterval(() => {
					if (tilNext == 0) {
						changeState = true;
						changeContent = nextContent;
						playAlarm();
						clearInterval(nextInterval);
						return;
					}
					tilNext -= 1;
				}, 1000);
			});
	};

	let resetTimer = (left: number, next: number, sentPause = paused) => {
		clearInterval(totalInterval);
		clearInterval(nextInterval);
		timeLeft = left;
		tilNext = next;

		if (!sentPause)
			tick().then(() => {
				totalInterval = setInterval(() => {
					if (timeLeft == 0) {
						clearInterval(totalInterval);
						clearInterval(nextInterval);
						playAlarm();
						changeState = true;
						changeContent = {
							title: `Done`,
							desc: `You've completed the amount of practice you set.`,
							...greenTheme
						};
						return;
					}
					timeLeft -= 1;
				}, 1000);

				resetNext(next, sentPause);
			});
	};

	const suggestions = [
		[`Easy`, [`slower`, `faster`, `louder`, `quieter`, `staccato`, `legato`, `with even dynamics`]],
		[
			`Medium`,
			[
				`emphasizing weak beats`,
				`in a different position`,
				`crescendo`,
				`decrescendo`,
				`swung`,
				`without looking at your hands`,
				`with a metronome`,
				`fast but quiet`,
				`quiet but fast`
			]
		],
		[
			`Hard`,
			[
				`in a different key`,
				`twice as fast`,
				`in a different time signature`,
				`with ornamentation`,
				`in a different mode`,
				`with different chord extensions`
			]
		]
	];

	const steps = [
		{
			title: `Plan`,
			desc: `Think about what you're about to do.`,
			bg: `bg-orange-100`,
			text: `text-orange-800`
		},
		{ title: `Play`, desc: `Execute on what you want to do.`, ...greenTheme },
		{ title: `Reflect`, desc: `Did it go well or poorly? Why did it go that way?`, ...blueTheme }
	];

	const secondsToMinutes = (time: number, none = false) => {
		const minutes = Math.floor(time / 60);
		const seconds = time - minutes * 60;

		return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};
</script>

<SitePage title="Practicifier" subtitle="Games and Exercises">
	<audio id="alarmSound" src="/audio/alarm.wav" preload="auto"></audio>

	<Section theme="secondary">
		<div class="mb-2 inline-block">
			<Input
				label="Total (min)"
				className="mb-2"
				bind:value={totalTime}
				onchange={(event) => {
					console.log(`talk to the moon`);
					let value = event.target.value;
					resetTimer(value * 60, taskTime * 60);
				}}
			/>
			<Input
				label="Per Activity (min)"
				bind:value={taskTime}
				onchange={(event) => {
					let value = event.target.value;
					resetTimer(timeLeft, value * 60);
				}}
			/>
		</div>
		<div class="mb-2">
			<label class="text-primary-dark mr-2 inline-block text-lg font-bold">
				<div class="flex items-center">
					<span class="mr-1">Enable Audio</span><Checkbox
						checked={audioEnabled}
						handleInput={() => (audioEnabled = !audioEnabled)}
					/>
				</div>
			</label>
		</div>
		<div>
			<div class="text-primary-dark flex items-center">
				<button
					class="cursor-pointer rounded-lg border-2 shadow {paused
						? `border-green-700 text-green-700`
						: `text-secondary-dark border-secondary-dark`} mr-4 p-0.5"
					onclick={() => {
						if (paused) resetTimer(timeLeft, tilNext, !paused);
						else {
							clearInterval(totalInterval);
							clearInterval(nextInterval);
						}
						paused = !paused;
					}}
				>
					{#if paused}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 5.25v13.5m-7.5-13.5v13.5"
							/>
						</svg>
					{/if}
				</button>
				<div>
					<div class="text-primary-dark flex justify-between">
						<div class="mr-1">Total:</div>
						{secondsToMinutes(timeLeft)}
					</div>
					{#if timeLeft > tilNext}<div class="flex justify-between">
							<div class="mr-1">Next:</div>
							{secondsToMinutes(tilNext)}
						</div>{/if}
				</div>
			</div>
		</div>
	</Section>
	<Section theme="secondary" className="inline-block">
		<div class="relative">
			<div
				class="{changeContent.bg} {changeContent.text} absolute top-22 right-0 bottom-22 left-0 flex items-center justify-center rounded-lg shadow md:w-1/2 {changeState
					? `z-30 opacity-100`
					: `z-10 opacity-0`} transition-opacity duration-300 ease-in"
			>
				<div class="text-center">
					<div class="text-2xl md:text-3xl">{changeContent.title}</div>
					<div class="px-3 text-lg">{changeContent.desc}</div>
					{#if changeContent.button}
						<Button
							className="mt-2"
							onclick={() => {
								resetNext(taskTime * 60);
								changeState = false;
							}}
							text="Continue"
						></Button>
					{/if}
				</div>
			</div>
			<div
				class="mb-3 rounded-lg bg-purple-100 px-2 py-2 text-center text-purple-800 shadow md:w-1/2 {changeState
					? `z-10 opacity-0`
					: `z-50 opacity-100`} transition-opacity duration-400 ease-in"
			>
				<div>
					Need Inspiration? Generate a challenge.
					<div>
						{#each suggestions as [difficulty, challenges], i}
							<button
								class="relative z-40 mt-1 mr-2 cursor-pointer rounded-md border px-2 shadow hover:border-purple-600 hover:text-purple-600"
								onclick={() => {
									let newSuggestion;
									do {
										const randomInt = Math.floor(Math.random() * challenges.length);
										newSuggestion = challenges[randomInt];
									} while (newSuggestion == suggestion);
									suggestion = newSuggestion;
								}}>{difficulty}</button
							>
						{/each}
					</div>
					{#if suggestion}
						<div class="mt-2">Try playing {suggestion}</div>
					{/if}
				</div>
			</div>
			{#each steps as { bg, text, title, desc }, i}
				<div
					class="shadow {bg} {text} mb-3 rounded-lg px-2 py-5 md:w-1/2 {changeState
						? `z-10 opacity-0`
						: `z-50 opacity-100`} transition-opacity duration-400 ease-in"
				>
					<div class="text-center">
						<div class="justify-between-between grid grid-cols-2 items-center">
							<span class="mr-6 text-2xl whitespace-nowrap md:text-3xl">{i + 1}) {title}</span>
							<span class="text-left md:text-lg">{@html desc}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Section>
</SitePage>
