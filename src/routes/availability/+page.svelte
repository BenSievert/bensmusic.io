<script lang="ts">
	import Section from '../../components/Section.svelte';
	import SitePage from "../../components/SitePage.svelte";
	import Checkbox from "../../components/Checkbox.svelte";
	import {onMount} from 'svelte';

	const days = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`];
  const needs = {
    Piano: [
      `Large Room (Studio 10)`,
      `Studio 2`,
      `Studio 3`,
      `Studio 4`,
      `Studio 5`,
      `Studio 6`,
      `Studio 7`,
      `Studio 8`,
      `Studio 9`,
      `Studio 11`,
      `Studio 12`
    ], 'Guitar Amps': [`Studio 1`, `Studio 3`, `Studio 4`, `Studio 5`, `Studio 6`, `Studio 9`, `Studio 11`, `Studio 12`],
    'Drum Kit': [`Studio 5`, `Large Room (Studio 10)`]
  };
  const times = [`8:00 AM`,
    `8:30 AM`,
    `9:00 AM`,
    `9:30 AM`,
    `10:00 AM`,
    `10:30 AM`,
    `11:00 AM`,
    `11:30 AM`,
    `12:00 PM`,
    `12:30 PM`,
    `1:00 PM`,
    `1:30 PM`,
    `2:00 PM`,
    `2:30 PM`,
    `3:00 PM`,
    `3:30 PM`,
    `4:00 PM`,
    `4:30 PM`,
    `5:00 PM`,
    `5:30 PM`,
    `6:00 PM`,
    `6:30 PM`,
    `7:00 PM`,
    `7:30 PM`,
    `8:00 PM`,
    `8:30 PM`,
    `9:00 PM`,
    `9:30 PM`,
    `10:00 PM`] as const;

  let openSchedule = $state({})

  onMount(async () => {
	  openSchedule = await (await fetch('/availability')).json();
  });
  let selectedTimes = $state<string[]>([])
  let selectedNeeds = $state<string[]>([`Piano`])

  let selectedDay = $state(`Monday`);

  let available = $derived(Object.entries(openSchedule[selectedDay] ?? []).map(([studio, openTimes]) =>
    [studio,
		openTimes.filter(time => selectedTimes.includes(time) && selectedNeeds.every(need => needs[need].includes(studio)))
     ]
  ));
</script>

<SitePage title="Hip Cat Schedule" subtitle="Find Open Studios">
	{#if !Object.entries(openSchedule).length}
		<div role="status" class="ml-4">
			<svg aria-hidden="true" class="w-24 h-24 text-gray-200 animate-spin fill-primary-dark" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	{:else}
	<Section>
		<h2 class="mb-2 text-xl font-bold text-primary-dark">Day</h2>
		{#each days as day}
			<button
				on:click={() => (selectedDay = day)}
				class={`${selectedDay === day ? `bg-primary-dark text-white` : `bg-primary`} w-26 mb-1 mr-4 rounded-md p-2 hover:bg-primary-light`}
				>{day}</button
			>
		{/each}
		<div class="mb-4"></div>
		<h2 class="mb-2 text-xl font-bold text-secondary-dark">Times</h2>
		{#each times as time, i}
			<Checkbox
				label={time}
				checked={selectedTimes.includes(time)}
				handleInput={() => {
					if (selectedTimes.includes(time))
						selectedTimes = selectedTimes.filter((selectedTime) => selectedTime !== time);
					else selectedTimes = [...selectedTimes, time];
				}}
			/>
		{/each}
		<div class="mb-4"></div>
		<h2 class="mb-2 text-xl font-bold text-secondary-dark">Needs</h2>
		{#each Object.keys(needs) as need}
			<Checkbox
				label={need}
				checked={selectedNeeds.includes(need)}
				handleInput={() => {
					if (selectedNeeds.includes(need))
						selectedNeeds = selectedNeeds.filter(selectedNeed => selectedNeed !== need);
					else selectedNeeds = [...selectedNeeds, need];
				}}
			/>
		{/each}
	</Section>
	<Section theme="secondary">
		<div class="text-2xl font-bold text-accent-dark">{selectedDay}</div>
		{#each available as [studio, times]}
            {#if times.length}
			<div class="mb-4 text-xl text-primary-dark max-w-1/2">{studio}</div>
                <div class="mb-2 flex flex-wrap">
			{#each times as potentialTime}
				<span class="mb-2 mr-3 rounded-md bg-blue-100 p-2 text-xs">{potentialTime}</span>
			{/each}
                </div>
            {/if}
		{/each}
	</Section>
	{/if}
</SitePage>
