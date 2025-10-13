<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Button from '../../components/Button.svelte';
	import Input from '../../components/Input.svelte';
	let permanent = $state(true);
	let sections = $state([]);
	let songTitle = $state(``);
	let showEditor = $state(false);
	let newLyrics = $state(``);
	let sectionTitle = $state(``);
	let selectedSection = $state(``);
	let key = $state(``);
	let time = $state(``);
	let order = $state([]);
	let editing = $state(null);
	let editingIndex= $derived(sections.findIndex(({title}) => title == editing))
	const annotate = (lyrics: string) => {
		const relative = `<span class="relative">`;
		const absolute = `<span class="absolute ">`;
		const close = `</span>`;
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
	<Section className="sm:grid md:grid-cols-2 lg:grid-cols-3">
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
				placeholder="Write your lyrics here"
			/>
			<div>
				<pre class="leading-[3]">{@html annotate(newLyrics)}</pre>
			</div>
			<Button
				text={editing ? `Update` : `Create`}
				onClick={() => {
					showEditor = false;

					if (editing) {

						console.log({editingIndex, sections, editing})
						sections[editingIndex] = { title: sectionTitle, lyrics: newLyrics }
					}
					else sections.push({ title: sectionTitle, lyrics: newLyrics });
				}}
			/>
			{#if editing}
				<Button
						theme="danger"
						text="Delete"
						onClick={() => {
						showEditor = false;
						sections.splice(editingIndex, 1)
						order.filter(title => title != sectionTitle)
				}}
				/>
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
							editing = section.title
						}}>Edit</button
					>
				</div>
			{/each}
		</div>
		<Button onClick={() => {
		editing = null;
		showEditor = true;
		newLyrics = ``;
		sectionTitle = ``;
		}} text="Create New Section"></Button>
	</Section>
	<Section theme="tertiary">
		<div class="text-primary-dark text-xl font-extrabold">Arrange</div>
		<div>
			{#each order as arranged, i}
				<div class="mb-6">
					<div class="text-2xl mb-3 text-secondary-dark">{arranged} <button class=" ml-2 text-gray-500 hover:text-gray-400"
					onclick={() => {
						order.splice(i, 1)
					}}>x</button>
					</div>
					<div>
						<pre class="leading-[3]">{@html annotate(sections.find(({title}) => title == arranged).lyrics)}</pre>
					</div>
				</div>
			{/each}
		</div>
		{#if sections.length}
			<select
				class="bg-white focus:outline-accent cursor-pointer rounded border border-r-8 border-transparent outline outline-none"
				bind:value={selectedSection}
			>
				{#each sections as { title }}
					<option value={title}>{title}</option>
				{/each}
			</select>
			<button
				class="ml-2 text-primary-dark hover:text-primary cursor-pointer text-xl font-bold"
				onclick={() => {
					if (selectedSection)
						order.push(selectedSection);
				}}>+</button
			>
		{/if}
	</Section>
</SitePage>
