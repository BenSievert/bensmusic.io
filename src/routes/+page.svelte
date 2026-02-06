<script>
	import SitePage from '../components/SitePage.svelte';
	import Section from '../components/Section.svelte';
	import Link from '../components/Link.svelte';
</script>

<SitePage title="Ben's Music Lessons" subtitle="Guitar Lessons in Bloomington-Normal">
	<Section>
		<h3 class="text-primary-dark text-xl">About Me</h3>
		<p>
			My name is Ben Sievert and I teach guitar lessons at <Link
				href="https://www.hipcatmusicschool.com/home"
				text="Hip Cat Music School"
			/>
			in Bloomington-Normal. I've been playing the guitar for 18 years in a wide variety of genres and
			styles. I've studied the guitar as well as other instruments with several teachers. I've also performed
			in multiple bands. I've done everything from playing classical music to playing in a funk-rock
			band.
		</p></Section
	>
	<Section theme="secondary">
		<h3 class="text-accent-dark text-xl">Teaching Philosophy</h3>
		<p>
			My job is to help my students make the music that they want to make.
			<br /><br />
			I am here to help. Lessons are tailored for the individual student's needs so they can advance
			at the fastest rate.

			<br /><br />
			Being good at music requires practice and dedication. I want my students to be the best musicians
			they can and I think very carefully about my teaching methods and how I can best serve my students.
			It's easy to forget that making music is supposed to be fulfilling and enjoyable.
		</p>
	</Section>
	<Section>
		<h3 class="text-primary-dark text-xl">Payment</h3>
		<p>
			Payment for lessons is due at the beginning of each month and is $25 per half hour lesson. Hip Cat's policy is changing April 1st and will move to a more subscription based model.
			<br />
			<br />
			I accept Venmo, Cashapp, and I keep a card reader on me. I have links to my payment profiles below.
		</p>
		<ul class="mt-4">
			<li>Venmo: <Link href="https://www.venmo.com/u/bensmusic" text="@bensmusic" /></li>
			<li>Cashapp: <Link href="https://cash.app/$bensmusiclessons" text="$bensmusiclessons" /></li>
		</ul>
	</Section>
	<Section theme="secondary">
		<h3 class="text-accent-dark text-xl">Contact</h3>
		<p>
			The best way to contact me is to text me at (217) 379-1821.
			<br />
			You can also email me at <Link
				href="mailto:sievertbenjamin@gmail.com"
				text="sievertbenjamin@gmail.com"
		/>
			<br />
			<br />
			I'll get back to you as soon as I can.
		</p>
	</Section>
</SitePage>
