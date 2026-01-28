<script lang="ts">
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
	import type { PageData } from './$types';

	let { data, children }: { data: PageData; children } = $props();
	let { session, isRoot } = data;
</script>

<div class="min-h-screen bg-gray-50">
	<Navigation loggedIn={session?.user} {isRoot} />
	{@render children()}
</div>
