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
			been entirely self-taught. There are no magic secrets that are revealed in my lessons. There's
			no trick you'll learn in my lessons that will transform you into a guitar god over night. The
			only way to get good is to put in the work.
		</p>
	</Section>
	<Section theme="tertiary">
		<h3 class="text-primary-dark text-xl">What does a teacher provide then?</h3>
		<ul>
			<li>
				<span class="font-bold">Answers questions and guides you.</span> There's a lot of info online
				but figuring what's important is difficult. I can clarify points before moving on to new topics.
				I also make sure you're learning what's important. Even if those things aren't always the most
				fun.
			</li>
			<li>
				<span class="font-bold">Corrects mistakes.</span> Teachers correct your mistakes and stop you
				from developing bad habits. We also figure out where you need to go next.
			</li>
			<li>
				<span class="font-bold">Helps you learn efficiently.</span>There are good and bad ways to
				practice and knowing how to practice effectively helps you advance faster. Effective
				practice is even a topic many advanced musicians don't know about.
			</li>
			<li>
				<span class="font-bold">Broadens your horizons.</span> I do my best to expose my students to
				different genres, cultures, and ways of thinking.
			</li>
		</ul>
	</Section>
</SitePage>
