<script>
	import SitePage from '../components/SitePage.svelte';
	import Section from '../components/Section.svelte';
	import Link from '../components/Link.svelte';
</script>

<SitePage title="Ben's Music Lessons" subtitle="Guitar Lessons in Bloomington-Normal">
	<Section>
		<h3 class="text-xl text-primary-dark">About Me</h3>
		<p>
			My name is Ben Sievert and I teach guitar lessons at <Link
				href="https://www.hipcatmusicschool.com/home"
				text="Hip Cat Music School"
			/>
			in Bloomington-Normal. I've been playing the guitar for 17 years in a wide variety of genres and
			styles. I've studied the guitar as well as other instruments with several teachers. I've also performed
			in multiple bands. I've done everything from playing classical music to playing in a funk-rock
			band.
		</p></Section
	>
	<Section theme="secondary">
		<h3 class="text-xl text-accent-dark">Teaching Philosophy</h3>
		<p>
			My job is to help my students make the music that they want to make.
			<br />
			<br />
			I am here to help my students, not make them feel bad about themselves. There are no report cards
			or grades. There is no course we have to get through in some arbitrary time frame. All lessons
			are tailored for the individual student's needs.
			<br />
			<br />
			Being good at music absolutely requires lots of practice and dedication. I want my students to
			be the best musicians they can and I think very carefully about my teaching methods and how I can
			best serve my students. That being said, it's easy to forget that making music is supposed to be
			fulfilling and enjoyable.
		</p>
	</Section>
	<Section>
		I believe that I'm a good teacher because I've struggled myself. I am one of the least naturally
		gifted musician alive. My skills come from hours of dedication. I believe this makes me better
		suited to teaching because I am able to explain concepts to people who don't immediately "get"
		it.
	</Section>
</SitePage>
