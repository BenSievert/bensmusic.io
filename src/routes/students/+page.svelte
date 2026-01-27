<script lang="ts">
    import Section from '../../components/Section.svelte'
    import SitePage from '../../components/SitePage.svelte'
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
    let students = data.students as unknown as { first_name: string, last_name: string }[]
</script>
<SitePage title="Students">
<Section>
    {#each students as student}
        <div>{student.first_name} {student.last_name}</div>
    {/each}
</Section>
</SitePage>

