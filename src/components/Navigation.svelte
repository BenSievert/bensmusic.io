<script>
	const links = [
		{ name: 'Home', href: '/', color: `bg-highlight-softYellow` },
		{ name: 'Policy and Payment', href: '/policy', color: `bg-highlight-peach` },
		//{ name: 'Student Resources', href: '/resources', color: `bg-highlight-peach` },
		{ name: 'Contact', href: '/contact', color: `bg-highlight-peach` }
	];
</script>

<div class="p-x-4 mb-1 flex justify-between">
	<div class="flex items-center gap-2">
		{#each links as link}
			<a
				href={link.href}
				class=" flex items-center justify-center rounded-xl p-2 text-accent-dark hover:bg-highlight-mintGreen hover:text-rose-700"
			>
				{link.name}
			</a>
		{/each}
	</div>
	<div class="flex items-center text-xl text-primary-dark">Ben's Music Lessons</div>
</div>
<hr class="mb-3 h-[2px] bg-primary-light" />
