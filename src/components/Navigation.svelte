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
		class="bg-primary cursor-pointer rounded-lg px-1 text-lg text-gray-900 md:hidden"
		on:click={toggleMenu}
	>
		&#9776;
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
				class="text-accent-dark hover:bg-highlight-mintGreen p-2 hover:text-rose-700"
			>
				{link.name}
			</a>
		{/each}
	</div>
</nav>

<style>
	.menu.open {
		display: flex;
	}
</style>
