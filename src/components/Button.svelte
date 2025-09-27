<script lang="ts">
	let { onclick, text } = $props();
</script>

<button
	class="bg-primary-dark hover:bg-primary m-1 cursor-pointer rounded-md px-3 py-1 text-white"
	{onclick}
>
	{text}
</button>
