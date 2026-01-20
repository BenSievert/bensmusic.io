<script lang="ts">
	import Section from '../../components/Section.svelte';
	import SitePage from '../../components/SitePage.svelte';
	import Checkbox from '../../components/Checkbox.svelte';
	import Modal from '../../components/Modal.svelte';
	import Spinner from '../../components/Spinner.svelte';
	import { onMount } from 'svelte';

	const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];

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

	let mySchedule = $state({});
	let errorMessage = $state(``);
	let showGaps = $state()
	let showStudio = $state(true)
	let showContent = $state()
	let name = $state(``)

	onMount(async () => {
		const data = await (await fetch(`/my-reservations`)).json();
		mySchedule = data.mySchedule
		name = data.name
	});

	let showModal = $state(false);
	let selectedCell = $state();
	let formSubmitting = $state(false);

	const size = $derived.by(() => {
		if (showContent)
			return `w-[100px] h-[100px]`
		const length = [showStudio, showContent].filter(truthy => truthy).length
		if (length == 0)
			return `w-[62px] h-[30px]`
		if (length == 1)
			return `w-[70px] h-[46px]`
	})

	const getAllTimes = (day: string) => {
		const formatted = times.map(time => mySchedule[day]?.find(reservation => reservation.time == time) ?? {time})
		if (showGaps)
			return formatted
		else return formatted.filter(reservation => reservation.content)
	}


	const handleSubmit = async () => {
		formSubmitting = true;
		const response = await fetch(`/my-reservations`, {
			method: 'POST',
			body: JSON.stringify({
				cell: selectedCell.cell
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { message } = await response.json();
		formSubmitting = false;
		if (response.status == 200) {
			mySchedule[selectedCell.day] = mySchedule[selectedCell.day].filter(reservation => reservation.cell != selectedCell.cell)
			showModal = false;
		} else errorMessage = `Error: ${message}`;
	};
</script>

<SitePage title={name} subtitle="My Reservations">
	{#if !name}
		<Spinner divClass="ml-4" svgClass="fill-primary-dark size-24" />
	{:else}
		<Section>
			<Checkbox
					className="mr-2"
					label="Show Studio"
					checked={showStudio}
					handleInput={() => {
						showStudio = !showStudio
					}}
			/>
			<br />
			<Checkbox
					className="mr-2"
					label="Show Content"
					checked={showContent}
					handleInput={() => {
						showContent = !showContent
					}}
			/>
			<br />
			<Checkbox
					className="mr-2"
					label="Show Empty Times"
					checked={showGaps}
					handleInput={() => {
						showGaps = !showGaps
					}}
			/>

		</Section>
		<Section theme="secondary">
			<div
				class="grid w-auto grid-cols-2 content-center gap-x-2 gap-y-1.5 md:w-max md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"
			>
				{#each days as day}
					<div class="text-center text-primary-dark">
						<span class="font-bold sticky top-2 z-10 bg-white rounded px-2 py-1 shadow">{day.slice(0,3)}</span>
						<div class="flex flex-col items-center mt-4">
							{#each getAllTimes(day) as possible}
								<div class="mb-1.5">
								{#if possible.cell }
									<button
											onclick={() => {
											selectedCell = { time: possible.time, cell: possible.cell, studio: possible.studio, day, content: possible.content};
											showModal = true;
										}}
											class="{size} cursor-pointer items-center justify-between rounded-md {possible.content.split(` `).length > 1 ? `bg-orange-200 text-orange-900 hover:bg-orange-100` : `bg-blue-200 text-blue-900 hover:bg-blue-100`} text-xs  shadow"
									>{showStudio ? possible.studio == `Large Room (Studio 10)` ? `Studio 10` :  possible.studio : ``} <div class="text-nowrap">{possible.time}</div>
										<div>{showContent ? possible.content : ``}</div>
									</button>
									{:else }
									<button disabled class="text-gray-700 {size} bg-gray-200 shadow items-center justify-between text-xs rounded-md"><div>{possible.time}</div></button>
								{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</Section>
	{/if}
	<Section disableTheme className="bg-green-50">
		<h2 class="text-green-800 text-2xl font-extrabold">Instructions</h2>
		This application shows you all of your studio reservations at Hip Cat.
		<br /><br />
		In order to use this page, you must create an account. The email used to create your account must match the one listed in Hip Cat's spreadsheet.
		<br /><br />
		Reservations shown in blue are cells in the spreadsheet that only contain your initials.
		<br />
		Cells in orange are cells where you've written something additional like a starting date
		<br /><br />
		Clicking on one of the cells opens a pop up showing the content of that cell and asking if you'd like to remove it. Choosing "Confirm" will delete the reservation out of the spread sheet.
		<br /><br />
		The checkbox at the top labeled "Show Empty Times" allows you to also see times where you do not currently have any reservations.
		<br /> <br />
		The other two checkboxes let you adjust what you see about a particular time. This is so if you're looking at a smaller screen it's easier to read.
		<br/> <br/>
		<span class="text-lg">If you have any issues, please email <a class="text-secondary-dark" href="mailto:sievertbenjamin@gmail.com">sievertbenjamin@gmail.com</a></span>
	</Section>
	<Modal
		bind:showModal
		loading={formSubmitting}
		confirm={handleSubmit}
	>
		<h2 class="text-primary-dark text-2xl font-extrabold">{selectedCell?.studio}</h2>
		<div class="mb-3 text-rose-700">
			{selectedCell?.day}s at {selectedCell?.time}
		</div>
		<div class="text-primary-dark">Content</div>
		<div class="text-secondary-dark text-lg">{selectedCell?.content}</div>
		<form onsubmit={handleSubmit}>
			<div class="mt-8 mb-3 flex text-red-800">
				Delete this reservation?
			</div>
			<div class="mt-2 text-xs text-orange-800">{errorMessage}</div>
		</form>
	</Modal>
</SitePage>
