<script lang="ts">
	import '../app.css';
    import Navigation from '../components/Navigation.svelte';
	let { children } = $props();
</script>
<div class="min-h-screen bg-background-light py-4 px-6">
    <Navigation />
    {@render children()}
</div>