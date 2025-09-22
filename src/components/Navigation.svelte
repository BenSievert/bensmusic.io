<script>
	import { page } from '$app/state';
	let isOpen = $state(false);

	let path = $derived(page.url.pathname);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Policy and Payment', href: `/policy` },
		{ name: 'Contact', href: '/contact' },
		{ name: `Exercises`, href: `/exercises` },
		{ name: `Learning`, href: `/learning` },
		{ name: `Guitarist of the Week`, href: `/guitarist-of-the-week` }
	];
</script>

<nav class="z-10 flex items-center justify-end px-4 pt-4">
	<button
		class="bg-primary z-30 cursor-pointer rounded-lg px-[6px] py-[5px] text-2xl text-gray-700 lg:hidden"
		on:click={toggleMenu}
	>
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
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	</button>
	<div class="hidden space-x-4 lg:flex">
		{#each links as link}
			<a
				href={link.href}
				class="{path == link.href
					? `bg-pink-100 text-rose-700`
					: `text-accent-dark`} rounded p-2 hover:bg-pink-100 hover:text-rose-700"
			>
				{link.name}
			</a>
		{/each}
	</div>
	<div
		class="menu bg-primary-light absolute top-14 right-0 z-30 w-48 flex-col rounded-md lg:hidden {isOpen
			? 'flex'
			: 'hidden'}"
	>
		{#each links as link}
			<a
				on:click={toggleMenu}
				href={link.href}
				class="p-2 text-rose-700 {path == link.href ? `bg-blue-200` : ``}"
			>
				{link.name}
			</a>
			<hr class="text-blue-200" />
		{/each}
	</div>
</nav>

<style>
	.menu.open {
		display: flex;
	}
</style>
