<script lang="ts">
	import SitePage from '../../components/SitePage.svelte';
	import ButtonLinks from '../../components/ButtonLinks.svelte';
	const lessons = [
		{
			title: `Introduction to Music Theory Part 1`,
			link: `introduction-part-one`,
			desc: `Introduction to music theory starting from what a note is.`
		},
		{
			title: `Introduction to Music Theory Part 2`,
			link: `introduction-part-two`,
			desc: `Continuing learning the basics of music theory.`
		},
		{
			title: `Effective Practice`,
			link: `effective-practice`,
			desc: `Learn how to practice effectively and make the most of your time.`
		}
	];
</script>

<SitePage title="Learning" subtitle="Online guides">
	<ButtonLinks buttons={lessons} path="learning" />
</SitePage>
