<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import TimeOrganizer from '../../components/TimeOrganizer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { groupedArticles } = data;
</script>

<SitePage title="Blog">
	<TimeOrganizer grouped={groupedArticles} path="blog" />
</SitePage>
