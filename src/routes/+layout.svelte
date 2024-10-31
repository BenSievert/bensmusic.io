<script lang="ts">
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<Navigation />
	{@render children()}
</div>
