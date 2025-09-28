<script lang="ts">
	let { onclick, text, className = `` } = $props();
</script>

<button
	class="{className} bg-primary-dark hover:bg-primary m-1 cursor-pointer rounded-md px-3 py-1 text-white"
	{onclick}
>
	{text}
</button>
