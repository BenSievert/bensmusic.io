<script>
	import SitePage from '../components/SitePage.svelte';
	import Section from '../components/Section.svelte';
	import Link from '../components/Link.svelte';
	let permanent = $state(true);
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
		<h3 class="text-primary-dark text-xl">Do I really need a guitar teacher?</h3>
		<p>
			No, but you'll advance faster with one. There are numerous online resources that can tell you
			anything you'd like to know about playing the guitar. Many exceptional guitar players have
			been entirely self-taught. There are no magic secrets that are revealed in my lessons. There
			is no smoking gun I'm going to give you that will make you a master in a matter of weeks. The
			only way to get good is to put in the work.
		</p>
	</Section>
	<Section theme="tertiary">
		<h3 class="text-primary-dark text-xl">What does a teacher provide then?</h3>
		<ul>
			<li>
				Answers questions. There's a lot of info online but figuring out what the important
				information is is hard on your own. I can clarify points before moving on to new topics.
			</li>
			<li>
				Corrects mistakes. Teachers correct your mistakes and stop you from developing bad habits.
			</li>
			<li>
				Helps you learn efficiently. There are good and bad ways to practice and knowing how to
				practice effectively helps you advance faster.
			</li>
			<li>Broadens your horizons. I do my best to expose my students to different genres.</li>
		</ul>
	</Section>
</SitePage>
