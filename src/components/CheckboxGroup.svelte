<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	let { boxes, value = $bindable(), checkClass = `` }: { boxes: string[] } = $props();
</script>

{#each boxes as box, boxIndex}
	<Checkbox
		className="text-xs sm:text-sm md:text-base {checkClass}"
		label={box}
		checked={value.includes(boxIndex)}
		handleInput={() => {
			if (value.includes(boxIndex)) value = value.filter((i) => i !== boxIndex);
			else value = [...value, boxIndex];
		}}
	/>
{/each}
