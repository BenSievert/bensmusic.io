<script lang="ts">
  import SitePage from '../../components/SitePage.svelte';
  import Section from '../../components/Section.svelte';
  const lessons = [
    {
      title: `Introduction to Music Theory`,
      link: `introduction`,
      desc: `Introduction to music theory starting from what a note is.`
    }
  ];
</script>

<SitePage title="Learning" subtitle="Online guides">
    <Section>
        <div class="py-4">
            {#each lessons as lesson}
                <div class="mb-3 w-72">
                    <a
                            href="learning/{lesson.link}"
                            class="border-primary shadow-softBlue hover:bg-highlight-mintGreen hover:text-primary inline-block w-full rounded-md border bg-blue-100 p-4 text-xl text-blue-700"
                    >
                        <div class="flex items-center justify-between">
                            <div class="mr-4">
                                {lesson.title}
                                <div class="max-w-48 text-xs">{lesson.desc}</div>
                            </div>
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                            >
                                <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </Section>
</SitePage>
