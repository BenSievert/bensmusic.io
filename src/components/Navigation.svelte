<script>
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	const links = [
		{ name: 'Home', href: '/', color: `bg-highlight-softYellow` },
		{ name: 'Policy and Payment', href: '/policy', color: `bg-highlight-peach` },
		{ name: 'Contact', href: '/contact', color: `bg-highlight-peach` },
		{ name: `Training`, href: `/training`, color: `bg-highlight-peach` }
	];
</script>

<nav class="flex items-center justify-end px-4 pt-4">
	<button
		class="bg-primary cursor-pointer rounded-lg text-2xl px-[3px] py-[2px] text-gray-700 md:hidden"
		on:click={toggleMenu}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
		</svg>
	</button>
	<div class="hidden space-x-4 md:flex">
		{#each links as link}
			<a
				href={link.href}
				class="text-accent-dark hover:bg-highlight-mintGreen p-2 hover:text-rose-700 md:rounded-md"
			>
				{link.name}
			</a>
		{/each}
	</div>
	<div
		class="menu bg-primary-light absolute top-14 right-0 w-48 flex-col rounded-md md:hidden {isOpen
			? 'flex'
			: 'hidden'}"
	>
		{#each links as link}
			<a
				on:click={toggleMenu}
				href={link.href}
				class="hover:bg-highlight-mintGreen p-2 text-rose-700"
			>
				{link.name}
			</a>
			<hr class="text-blue-200">

		{/each}
	</div>
</nav>

<style>
	.menu.open {
		display: flex;
	}
</style>
