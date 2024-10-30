<script lang="ts">
	import '../app.css';
    import Navigation from '../components/Navigation.svelte';
	let { children } = $props();
</script>
<div class="min-h-screen bg-background-light px-6 py-4">
    <Navigation />
    {@render children()}
</div>