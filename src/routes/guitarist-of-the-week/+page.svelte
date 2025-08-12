<script lang="ts">
	import GuitaristOfTheWeek from '../../components/GuitaristOfTheWeek.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<GuitaristOfTheWeek {...data}></GuitaristOfTheWeek>
