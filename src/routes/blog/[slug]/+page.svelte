<script lang="ts">
  import type {PageData} from './$types';
  import SitePage from '../../../components/SitePage.svelte'
  import Section from '../../../components/Section.svelte'

  let {data}: { data: PageData } = $props();
  const { name, date, html} = data
</script>


<SitePage title={name} subtitle={date}>
    <Section theme="tertiary">
<div class="prose prose-headings:text-primary-dark prose-headings:font-normal">
        {@html html}
</div>
    </Section>
</SitePage>
