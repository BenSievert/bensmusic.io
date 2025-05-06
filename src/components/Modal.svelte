<script>
	import Spinner from './Spinner.svelte';
	let { showModal = $bindable(), children, disabled, confirm, loading } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
		else dialog.close();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	class="bg-background-light text-center"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="">
		{@render children?.()}
		<div class="mt-4 flex justify-center">
			<button
				class="shadow-pastel mr-4 rounded-md bg-red-300 px-3 py-1 text-red-800 hover:bg-red-200 cursor-pointer"
				onclick={() => dialog.close()}>Cancel</button
			>
			<button
				type="submit"
				onclick={confirm}
				disabled={disabled || loading}
				class="shadow-pastel rounded-md bg-green-300 px-5 py-2 text-lg text-green-800 hover:bg-green-200 disabled:bg-gray-200 disabled:text-gray-600 disabled:shadow-none cursor-pointer disabled:cursor-default"
				>{#if loading}<Spinner svgClass="size-4 fill-gray-600" />
				{:else}Confirm
				{/if}</button
			>
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 36em;
		border-radius: 0.4em;
		border: none;
		padding: 0;
		margin: auto !important;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
