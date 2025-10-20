<script lang="ts">
	const { questions } = $props();
	let answers = $state([]);
	let submitted = $state(false);
	let incomplete = $state(false);
	let numberCorrect = $state(0);
</script>

<div>
	{#if submitted}
		<div class="mb-4">
			<div class="text-secondary-dark text-2xl">Quiz Complete</div>
			<div class>
				You got <span class="font-bold">{numberCorrect}</span> out of
				<span class="font-bold">{questions.length}</span> correct.
			</div>
			{#if numberCorrect / questions.length < 0.75}
				<div>You should go back and review what we've learned or ask me questions.</div>
			{/if}
			{#if numberCorrect / questions.length >= 0.9}
				<div>Great Job!</div>
			{/if}
		</div>
	{/if}
	{#each questions as question, i}
		<div class="mb-3">
			<div class="text-primary-dark mb-1 font-bold">{i + 1}) {@html question.question}</div>
			{#each question.choices as choice, j}
				<label class="mr-2 mb-1 flex cursor-pointer items-center">
					<input
						value={j}
						bind:group={answers[i]}
						type="radio"
						class="accent-accent-dark mr-1 mb-[2px] cursor-pointer focus:ring-0 focus:ring-offset-0"
					/>
					<span class="text-sm">{@html choice}</span>
				</label>
			{/each}
			{#if submitted}
				<div class="mt-4 mb-6">
					<span
						class="rounded-md px-1.5 py-0.5 {answers[i] == question.answer
							? `bg-green-300 text-green-800`
							: `bg-red-300 text-red-800`}"
						>{answers[i] == question.answer ? `Correct` : `Incorrect`}</span
					>
					- {question.explanation}
				</div>
			{/if}
		</div>
	{/each}
	{#if !submitted}
		<div>
			<button
				onclick={async () => {
					if (!questions.every((_, i) => answers.hasOwnProperty(i))) incomplete = true;
					else {
						numberCorrect = questions.filter(({ answer }, i) => answer == answers[i]).length;


						submitted = true;
						window.scrollTo(0, 0);
					}
				}}
				class="bg-primary-dark hover:bg-primary disabled:bg-primary m-1 cursor-pointer rounded-md px-3 py-1 text-white disabled:cursor-default"
				>Submit</button
			>
			{#if incomplete}
				<div class="text-sm text-orange-800">Please fill out all the questions.</div>
			{/if}
		</div>
	{/if}
</div>
