<script lang="ts">
	import Section from '../../components/Section.svelte';
	import SitePage from '../../components/SitePage.svelte';
	import Checkbox from '../../components/Checkbox.svelte';
	import Modal from '../../components/Modal.svelte';
	import Spinner from '../../components/Spinner.svelte';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();

	const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];

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
		],
		'Guitar Amps': [
			`Studio 1`,
			`Studio 3`,
			`Studio 4`,
			`Studio 5`,
			`Studio 6`,
			`Studio 9`,
			`Studio 11`,
			`Studio 12`
		],
		'Drum Kit': [`Studio 5`, `Large Room (Studio 10)`]
	};
	const times = [
		`8:00 AM`,
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
		`10:00 PM`
	] as const;

	let openSchedule = $state({});
	let errorMessage = $state(``);
	let permanent = $state(true);

	onMount(async () => {
		openSchedule = await (await fetch(`/availability?auth=${data.auth}`)).json();
	});
	let selectedTimes = $state<string[]>([]);
	let selectedNeeds = $state<string[]>([]);
	let showModal = $state(false);
	let selectedCell = $state();
	let initials = $state();
	let formSubmitting = $state(false);
	let savedCells = $state([]);
	const next4Months = (day: number) => {
		const dates = [];
		const weeksIn4Months = 17;
		const date = new Date();
		if (date.getDay() == day)
			dates.push({
				value: `${date.getMonth() + 1}/${date.getDate()}`,
				label: `${date.toLocaleDateString(undefined, { month: `long`, day: `numeric` })} (Today)`
			});
		for (const _ of [...Array(weeksIn4Months)]) {
			date.setDate(date.getDate() + ((day + 7 - date.getDay()) % 7 || 7));
			dates.push({
				value: `${date.getMonth() + 1}/${date.getDate()}`,
				label: date.toLocaleDateString(undefined, { month: `long`, day: `numeric` })
			});
		}
		return dates;
	};
	next4Months(0);
	let selectedDay = $state(0);
	let possibleDates = $derived(next4Months(selectedDay));
	let selectedDate = $state();

	let available = $derived(
		Object.entries(openSchedule[days[selectedDay]] ?? []).map(([studio, openTimes]) => [
			studio,
			openTimes.filter(
				({ time, cell }) =>
					selectedTimes.includes(time) &&
					selectedNeeds.every((need) => needs[need].includes(studio)) &&
					!savedCells.includes(cell)
			)
		])
	);

	const handleSubmit = async () => {
		formSubmitting = true;
		const response = await fetch(`/availability`, {
			method: 'POST',
			body: JSON.stringify({
				auth: data.auth,
				date: permanent && selectedDate == possibleDates[0].value ? `now` : selectedDate,
				initials,
				cell: selectedCell.cell,
				permanent
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { message } = await response.json();
		formSubmitting = false;
		if (response.status == 200) {
			savedCells.push(selectedCell.cell);
			showModal = false;
		} else if (response.status == 403) {
			savedCells.push(selectedCell.cell);
			alert(message);
			showModal = false;
		} else errorMessage = `Error: ${message}`;
	};
</script>

<SitePage title="Hip Cat Scheduler" subtitle="Find Open Studios">
	{#if !Object.entries(openSchedule).length}
		<Spinner divClass="ml-4" svgClass="fill-primary-dark size-24" />
	{:else}
		<Section>
			<h2 class="text-primary-dark mb-2 text-xl font-bold">Day</h2>
			{#each days as day}
				<button
					onclick={() => (selectedDay = days.indexOf(day))}
					class={`${selectedDay === days.indexOf(day) ? `bg-primary-dark ring-primary-dark text-white ring-1 ring-offset-2` : `bg-primary`} hover:bg-primary-light mr-4 mb-2 w-26 cursor-pointer rounded-md p-2`}
					>{day}</button
				>
			{/each}
			<div class="mb-4"></div>
			<h2 class="text-secondary-dark mb-2 text-xl font-bold">Times</h2>
			<div class="grid grid-cols-3 sm:grid-cols-6 gap-1 w-max">
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
			</div>
			<div class="mb-4"></div>
			<h2 class="text-secondary-dark mb-2 text-xl font-bold">Needs</h2>
			{#each Object.keys(needs) as need}
				<Checkbox
					label={need}
					checked={selectedNeeds.includes(need)}
					handleInput={() => {
						if (selectedNeeds.includes(need))
							selectedNeeds = selectedNeeds.filter((selectedNeed) => selectedNeed !== need);
						else selectedNeeds = [...selectedNeeds, need];
					}}
				/>
			{/each}
		</Section>
		<Section theme="secondary">
			<div class="text-accent-dark text-2xl font-bold ">{days[selectedDay]}</div>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-8 w-auto sm:w-max">
			{#each available as [studio, times]}
				{#if times.length}
					<div>
					<div class="text-primary-dark mb-2 text-xl">{studio == `Large Room (Studio 10)` ? `Large Room` : studio}</div>
					<div class="mb-2">
						{#each times as { time, cell }}
							<button
								onclick={() => {
									selectedCell = { time, cell, studio };
									selectedDate = possibleDates[0]?.value;
									showModal = true;
								}}
								class="mr-3 mb-2 flex cursor-pointer items-center rounded-md bg-blue-200 p-2 text-xs text-blue-900 shadow hover:bg-blue-100"
								>{time}<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="mb-[2px] ml-2 size-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
							</button>
						{/each}
					</div>
					</div>
				{/if}
			{/each}
			</div>
		</Section>
	{/if}
	<Modal
		bind:showModal
		disabled={!initials || formSubmitting}
		loading={formSubmitting}
		confirm={handleSubmit}
	>
		<h2 class="text-primary-dark text-2xl font-extrabold">{selectedCell?.studio}</h2>
		<div class="mb-3 text-rose-700">
			{days[selectedDay]}{#if permanent}s{/if} at {selectedCell?.time}
		</div>
		<form onsubmit={handleSubmit}>
			<input
				class="placeholder-primary-dark border-primary focus:border-accent focus:ring-accent mr-1 mb-3 w-full rounded-2xl border bg-pink-50 px-4 py-2 text-gray-600 shadow-sm focus:ring-1 focus:outline-none"
				placeholder="Initials"
				oninput={() => (errorMessage = ``)}
				bind:value={initials}
			/>
			<label class="mt-1 block text-gray-600">
				<div class="text-primary-dark text-left text-lg">
					{#if permanent}Start{/if} Date
				</div>
				<select
					bind:value={selectedDate}
					class="focus:outline-accent outline-primary w-full cursor-pointer rounded-xl border border-r-8 border-transparent bg-pink-50 px-3 py-2 outline"
				>
					{#each possibleDates as { value, label }}
						<option {value}>{label}</option>
					{/each}
				</select>
			</label>
			<div class="mt-4 mb-3 flex">
				<label class="mr-2 flex cursor-pointer items-center">
					<input
						value={true}
						bind:group={permanent}
						type="radio"
						class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
					/>
					<span class="text-sm text-rose-700">Permanent</span>
				</label>
				<label class="flex cursor-pointer items-center">
					<input
						value={false}
						bind:group={permanent}
						type="radio"
						class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
					/>
					<span class="text-sm text-rose-700">One-Time</span>
				</label>
			</div>
			<div class="mt-2 text-xs text-orange-800">{errorMessage}</div>
		</form>
	</Modal>
</SitePage>
