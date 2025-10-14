<script lang="ts">
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
	import type { PageData } from './$types';

	let { data, children }: { data: PageData, children } = $props();
	let { session } = data;

</script>

<div class="min-h-screen bg-gray-50">
	<Navigation loggedIn={session?.user} />
	{@render children()}
</div>
