<script lang="ts">
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
	import type { PageData } from './$types';

	let { data, children }: { data: PageData; children } = $props();
	let { session, isRoot, student } = data;
</script>

<div class="min-h-screen"  style="background-image:url('bg/bg.png'); background-color: rgba(255, 255, 255, 0.85);
  background-blend-mode: lighten;">
	<Navigation loggedIn={session?.user} {isRoot} {student} />
	{@render children()}
</div>
