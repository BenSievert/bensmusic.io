<script>
	import SitePage from '../../components/SitePage.svelte';
	import Section from '../../components/Section.svelte';
	import Link from '../../components/Link.svelte';
</script>

<SitePage title="Policy and Payment" subtitle="Payment info and lesson policy">
	<Section>
		<h3 class="text-xl text-primary-dark">Payment</h3>

		<p>
			Payment for lessons is due at the beginning of each month and is $25 per half hour lesson.
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
		<h3 class="text-xl text-accent-dark">Cancellations</h3>
		<p>My policies are in line with those from Hip Cat Music School</p>
		<br />

		<p>
			In the event that you need to cancel a lesson we will try to reschedule for another time.
			<br />
			Students are allowed two last minute cancellations per calendar year. Serious illness, vacation,
			and inclement weather do not count towards this limit. Life happens and I'm happy to be flexible
			with long term and reliable students.
			<br />
			<br />
			If we cancel for one of these reasons and cannot reschedule, you will be given a credit toward
			next month's tuition.
		</p>
		<p></p>
	</Section>
</SitePage>
