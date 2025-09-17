<script lang="ts">
	import { tick } from 'svelte'
	let { steps } = $props();
	let selectedStep = $state(0);
	let selectedSubStep = $state(0);
	let stepsLength = $derived(steps.length);
	let subStepsLength = $derived(steps[selectedStep].subSteps.length);
	let currentStep = $derived(steps[selectedStep])
	import * as Tone from 'tone';
	let synth;
	let now;
	let audioEnabled = $state(false);
</script>
{#if audioEnabled}
<div>
	<div class="mb-2">
		<button
				disabled={selectedStep == 0 && selectedSubStep == 0}
				onclick={async () => {
				if (selectedSubStep != 0) selectedSubStep -= 1;
				else {
					selectedSubStep = 0;
					await tick();
					setTimeout(() => {
						selectedStep -= 1;
					}, 300)
				}
			}}
				class="text-primary-dark disabled:text-primary hover:text-primary mr-6 text-lg">Previous</button
		>
		<button
				onclick={async () => {

				if (selectedSubStep < subStepsLength -1) selectedSubStep += 1;
				else {
					selectedSubStep = 0;
					await tick();
					setTimeout(() => {
						selectedStep += 1;
					}, 300)


			}}}
				class="text-primary-dark disabled:text-primary hover:text-primary text-lg">Next</button
		>
	</div>

	<div class="text-primary-dark text-lg font-bold">{currentStep.title}</div>
	<div>
		{#each steps[selectedStep].subSteps as subStep, i}
			<div class="{i <= selectedSubStep ? `opacity-100` : `opacity-0`} transition-opacity ease-in duration-300 mb-2">
				{#if typeof subStep == `function`}
				{@render subStep(synth, Tone)}
				{:else}
					{@html subStep}
				{/if}
			</div>
		{/each}
	</div>
</div>
	{:else}
		<button
				class="text-primary-dark hover:text-primary"
				onclick={async () => {
			await Tone.start();
			synth = new Tone.PolySynth().toDestination();
			audioEnabled = true;
		}}>Click to enable audio</button
		>
	{/if}
