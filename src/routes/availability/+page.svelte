<script lang="ts">
  import type {PageData} from './$types';
  import Section from '../../components/Section.svelte';
  import SitePage from "../../components/SitePage.svelte";
  import Checkbox from "../../components/Checkbox.svelte";

  const {data}: { data: PageData } = $props();
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
    `10:00 PM`];
  let selectedTimes = $state<string[]>([])
  let selectedNeeds = $state<string[]>([`Piano`])

  let selectedDay = $state(`Monday`);

  let available = $derived(Object.entries(data.openSchedule[selectedDay]).map(([studio, times]) =>
    [studio,
      times.filter(time => selectedTimes.includes(time) && selectedNeeds.every(need => needs[need].includes(studio)))
     ]
  ));
</script>

<SitePage title="Hip Cat Schedule" subtitle="Find Open Studios">
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
</SitePage>
