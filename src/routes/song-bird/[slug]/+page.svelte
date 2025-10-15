<script lang="ts">
	import SitePage from '../../../components/SitePage.svelte';
	import Section from '../../../components/Section.svelte';
	import Button from '../../../components/Button.svelte';
	import Input from '../../../components/Input.svelte';
	import Spinner from '../../../components/Spinner.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { session } = data;
	let permanent = $state(true);
	let sections = $state(data.sections ?? []);
	let songTitle = $state(data.title ?? ``);
	let showEditor = $state(false);
	let newLyrics = $state(``);
	let sectionTitle = $state(``);
	let selectedSection = $state(``);
	let key = $state(data.key_signature ?? ``);
	let time = $state(data.time ?? ``);
	let order = $state(data.section_order ?? []);
	let editing = $state(null);
	let editingIndex = $derived(sections.findIndex(({ title }) => title == editing));
	let formSubmitting = $state(false);
	let notes = $state(data.notes ?? ``)
	let existing = $state(data?.id);
	const annotate = (lyrics: string) => {
		let openPosition = lyrics.indexOf(`{`);
		let closePosition = lyrics.indexOf(`}`);
		while (openPosition != -1 && closePosition != -1) {
			const chord = lyrics.substring(openPosition + 1, closePosition);
			const character = lyrics[closePosition + 1] ?? ` `;
			const start = lyrics.slice(0, openPosition);
			const end = lyrics.slice(closePosition + 2);

			const replacement = `<span class="relative"><span class="absolute text-primary-dark font-bold bottom-1.5">${chord}</span>${character}</span>`;
			lyrics = start + replacement + end;

			openPosition = lyrics.indexOf(`{`);
			closePosition = lyrics.indexOf(`}`);
		}

		return lyrics;
	};
</script>

<SitePage title="Song Bird" subtitle="Write and Arrange Songs">
	{#if session}
		<Section theme="secondary">
			<div class="sm:grid md:grid-cols-2 lg:grid-cols-3">
			<Input
				bind:value={songTitle}
				label="Song Title"
				labelClass="block"
				className="mb-2 block"
				inputClassName="w-52"
				type="text"
			/>
			<Input
				bind:value={key}
				label="Key"
				labelClass="block"
				className="mb-2 block"
				inputClassName="w-24"
				type="text"
			/>
			<Input
				bind:value={time}
				label="Time Signature"
				labelClass="block"
				className="mb-2 block"
				inputClassName="w-16"
				type="text"
			/>
			</div>
			<textarea
					bind:value={notes}
					class="my-4 min-h-32 w-full bg-white p-2"
					placeholder="Write any notes here"
			></textarea>
		</Section>
		{#if showEditor}
			<Section theme="tertiary">
				<Input
					bind:value={sectionTitle}
					label="Section Title"
					className="w-full mb-2"
					inputClassName="w-52"
					type="text"
				/>
				<textarea
					bind:value={newLyrics}
					class="my-4 min-h-32 w-full bg-white p-2"
					placeholder={`Write your lyrics here. \nTip: Insert a chord symbol by writing it between "{}"\nExample: {B9}lyric`}
				></textarea>
				<div>
					<pre class="leading-[3]">{@html annotate(newLyrics)}</pre>
				</div>
				<button
					class="text-primary-dark hover:text-primary cursor-pointer text-lg mr-2 py-1 px-2 border border-primary rounded-md"
					onclick={() => {
						showEditor = false;

						if (editing) {
							sections[editingIndex] = { title: sectionTitle, lyrics: newLyrics };
						} else sections.push({ title: sectionTitle, lyrics: newLyrics });
					}}
				>{editing ? `Update` : `Create`}</button>
				{#if editing}
					<button
						class="text-secondary-dark hover:text-secondary cursor-pointer text-lg py-1 px-2 border border-secondary rounded-md"
						onclick={() => {
							showEditor = false;
							sections.splice(editingIndex, 1);
							order = order.filter((title) => title != sectionTitle);
						}}
					>Delete</button>
				{/if}
			</Section>
		{/if}
		<Section theme="secondary">
			<div>
				{#each sections as section}
					<div>
						<span class="text-secondary-dark mr-2 text-lg">{section.title}</span>
						<button
							class="text-gray-600 hover:text-gray-500"
							onclick={() => {
								sectionTitle = section.title;
								newLyrics = section.lyrics;
								showEditor = true;
								editing = section.title;
							}}>Edit</button
						>
					</div>
				{/each}
			</div>
			{#if !showEditor}
			<button
				onclick={() => {
					editing = null;
					showEditor = true;
					newLyrics = ``;
					sectionTitle = ``;
				}}
			class="text-primary-dark hover:text-primary cursor-pointer text-lg flex items-center"

			><span class="text-2xl mr-1.5">+</span> Create New Section</button>

			{/if}
		</Section>
		<Section theme="tertiary">
			<div class="text-primary-dark text-xl font-extrabold">Arrange</div>
			<div>
				{#each order as arranged, i}
					<div class="mb-6">
						<div class="text-secondary-dark mb-3 text-2xl">
							{arranged}
							<button
								class=" ml-2 text-gray-500 hover:text-gray-400"
								onclick={() => {
									order.splice(i, 1);
								}}>x</button
							>
						</div>
						<div>
							<pre class="leading-[3]">{@html annotate(
									sections.find(({ title }) => title == arranged).lyrics
								)}</pre>
						</div>
					</div>
				{/each}
			</div>
			{#if sections.length}
				<select
					class="focus:outline-accent cursor-pointer rounded border border-r-8 border-transparent bg-white outline outline-none"
					bind:value={selectedSection}
				>
					{#each sections as { title }}
						<option value={title}>{title}</option>
					{/each}
				</select>
				<button
					class="text-primary-dark hover:text-primary ml-2 cursor-pointer text-xl font-bold"
					onclick={() => {
						if (selectedSection) order.push(selectedSection);
					}}>+</button
				>
			{/if}
		</Section>
		<Section theme="tertiary">
			<button
				disabled={formSubmitting}
				class="bg-primary-dark hover:bg-primary cursor-pointer rounded-md p-2 text-white"
				onclick={async () => {
					formSubmitting = true;
					const response = await fetch(`/song-bird-crud`, {
						method: 'POST',
						body: JSON.stringify({
							title: songTitle,
							key,
							time,
							sections,
							order,
							notes,
							action: existing ? `update` : `create`,
							id: existing
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					formSubmitting = false;
					if (!existing && response.ok) {
						const responseId = (await response.json()).id;
						existing = responseId;
						history.replaceState(null, ``, `/song-bird/${responseId}`);
					}
				}}
				>{#if formSubmitting}<Spinner svgClass="size-4 fill-white" />{:else}Save{/if}
			</button>
		</Section>
	{:else}
		<Section class="secondary">You must be logged in to use this page.</Section>
	{/if}
</SitePage>
