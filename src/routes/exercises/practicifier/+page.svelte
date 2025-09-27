<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Input from "../../../components/Input.svelte";
	import Checkbox from "../../../components/Checkbox.svelte";
	import Button from "../../../components/Button.svelte";
	import { tick } from 'svelte';
	let totalTime = $state(20);
	let taskTime = $state(10)
	let currentStep = $state(0)
	let timeLeft = $state(20 * 60)
	let tilNext = $state(10 * 60);
	let showTimer = $state(false)
	let totalInterval;
	let nextInterval
	let paused = $state(false)
	let done = $state(false)

	const resetNext = (next: number) => {
		clearInterval(nextInterval)
		tilNext = next;
		tick().then(() => {
			nextInterval = setInterval(() => {
				if (tilNext == 0) {
					if (steps.length != 4)
						steps[3] = {title: `Change Tasks`, desc: `Time to start working on something else.`, bg: `bg-primary-dark`, text: `text-white`, button: `hover:text-gray-300 hover:border-gray-300`}
					clearInterval(nextInterval)
					return;
				}
				tilNext -= 1
			}, 1000)
		})
	}
	let resetTimer = (left: number, next: number) => {
		clearInterval(totalInterval);
		clearInterval(nextInterval)
		timeLeft = left;
		tilNext = next;
		tick().then(() => {
			totalInterval = setInterval(() => {

				if (timeLeft == 0) {
					clearInterval(totalInterval)
					done = true;
					steps[3] = {title: `Done`, desc: `You've completed the amount of practice you set.`,  bg: `bg-green-700`, text: `text-white`};
					return;
				}
				timeLeft -= 1


			}, 1000)

			resetNext(next)

		});
	}


	/*
	const suggestions = {
		easy: [
				`slower`,
				`faster`,
				`louder`,
				`quieter`,
				`staccato`,
				`legato`
		],
		medium: [`crescendo`,
		`decrescendo`,
		`swung`, `without looking at your hands`, `with a metronome`],
		hard: [`in a different key`, `twice as fast`, `in a different time signature`, `add ornamentation`]

	}

	 */

	const steps = $state([
		{title: `Plan`, desc: `Think about what you're about to do.`,  bg: `bg-orange-100`, text: `text-orange-800`, button: `hover:text-orange-600 hover:border-orange-600`},
		{title: `Play`, desc: `Execute on what you want to do.`, bg: `bg-green-100`, text: `text-green-800`, button: `hover:text-green-600 hover:border-green-600`},
		{title: `Reflect`, desc: `Did it go well or poorly? Why did it go that way?`,  bg: `bg-blue-100`, text: `text-primary-dark`, button: `hover:text-primary hover:border-primary`},
	]);

	let step = $derived(steps[currentStep])


	const secondsToMinutes = (time: number, none = false) => {
		const minutes = Math.floor(time / 60);
		const seconds = time - minutes * 60;


		return `${minutes < 10 ? `0${minutes}` : minutes }:${seconds < 10 ? `0${seconds}` : seconds}`

	}

</script>

<SitePage title="Practicifier" subtitle="Games and Exercises">
	<Section theme="secondary">
		<label class="flex mb-2">
			<span class="text-primary-dark mr-2 text-lg font-bold">Show Timer</span>
			<Checkbox
					checked={showTimer}
					handleInput={() => {
						if (showTimer) {
							clearInterval(totalInterval);
						}
						else if (!paused)
							resetTimer(timeLeft, tilNext)
						showTimer = !showTimer;
					}}
			></Checkbox>
		</label>
		{#if showTimer}
		<div class="mb-2 inline-block">

		<Input label="Total (min)" className="mb-2" bind:value={totalTime} onchange={(event) => {
			let value = event.target.value
			resetTimer(value * 60, taskTime * 60);

		}}/>
			<Input label="Per Activity (min)"  bind:value={taskTime} onchange={(event) => {
			let value = event.target.value
			resetTimer(timeLeft, value * 60);

		}}/>
		</div>
		<div class="text-center text-xl text-primary-dark grid-cols-2 mt-4 flex justify-center">
			<div class="flex items-center">
				<button class="rounded-lg border-2 shadow {paused ? `border-green-800 bg-green-50 text-green-800` : `text-secondary-dark border-secondary-dark bg-rose-50`} mr-4 p-1" onclick={() => {
				if (paused)
					resetTimer(timeLeft, tilNext)
				else {
					clearInterval(totalInterval);
					clearInterval(nextInterval)
				}
				paused = !paused;
			}}>
					{#if paused}
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
						</svg>
					{/if}


				</button>
			<div>
			<div class="flex justify-between"><div class="mr-1">Total:</div>{secondsToMinutes(timeLeft)}</div>
				{#if timeLeft > tilNext}<div class="flex justify-between"><div class="mr-1">Next:</div> {secondsToMinutes(tilNext)}</div>{/if}
			</div>
			</div>
		</div>
		{/if}
	</Section>
	<Section disableTheme className="{step.bg} {step.text} py-12" >
		<div class="text-center {step.bg}">
		<div>
			<div class="text-2xl">{step.title}</div>
			{@html step.desc}
		</div>
			{#if steps[currentStep].title != `Done`}
			<button class="mt-8 border py-1 px-2 rounded  hover:shadow {steps[currentStep].button}"
					onclick={() => {
			if (steps[currentStep].title == `Done`)
				return;
			if (currentStep == steps.length -1)
				currentStep = 0
			else currentStep += 1

			if (currentStep == 0 && steps.length == 4) {
				steps.pop();
				let newTime = taskTime * 60
				resetTimer(timeLeft, newTime > timeLeft ? timeLeft : newTime)
				currentStep += 1;
			}
		}}>Next</button>
				{/if}
		</div>
	</Section>
	<section theme="secondary">
		<div class="text-center mt-2">


		</div>
	</section>
</SitePage>
