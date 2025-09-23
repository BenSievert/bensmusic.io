<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import TimeOrganizer from '../../components/TimeOrganizer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { groupedGuitarists } = data;
</script>

<SitePage title="Guitarist of the Week Archive">
	<TimeOrganizer grouped={groupedGuitarists} path="guitarist-of-the-week" />
</SitePage>
