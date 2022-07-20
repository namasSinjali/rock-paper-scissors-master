<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Select from '$lib/Select.svelte';
	import Result from '$lib/Result.svelte';
	import Rules from '$lib/Rules.svelte';

	let showRule = false;
	let selection: Symbols | null = null;
</script>

<div class="body">
	<div class="layout">
		<Header logoSrc="images/logo.svg" />

		<main>
			{#if selection === null}
				<Select
					on:select={(e) => {
						selection = e.detail;
					}}
				/>
			{:else}
				<Result
					{selection}
					on:playAgain={() => {
						selection = null;
					}}
				/>
			{/if}
		</main>
	</div>
	<button
		on:click={() => {
			showRule = true;
		}}
	>
		rules
	</button>
</div>
{#if showRule}
	<div class="modal-container">
		<div
			class="backdrop"
			on:click={() => {
				showRule = false;
			}}
		/>
		<Rules
			on:close={() => {
				showRule = false;
			}}
		/>
	</div>
{/if}

<style>
	/* @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap'); */
	:global(body) {
		--white: #e7e7e7;
		--max-content-width: min(700px, 80vh);
		margin: 0;
		padding: 0;
		font-family: 'Barlow Semi Condensed', sans-serif;
		width: 100vw;
	}
	:global(*) {
		box-sizing: border-box;
	}
	:global(button) {
		background: unset;
		outline: none;
		border: none;
		margin: 0;
		padding: 0;
		font: inherit;
	}
	.body {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		width: 100vw;
		min-height: 100vh;
		background-image: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
		padding: 30px;
		position: relative;
	}
	.layout {
		flex-grow: 1;
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		max-width: var(--max-content-width);
		align-items: stretch;
	}
	main {
		/* align-self: center;
		width: clamp(150px, calc(100vh - 270px), 100%);
		height: clamp(150px, calc(100vh - 270px), 100%); */
		flex-grow: 1;
		margin-top: 50px;
		position: relative;
	}
	button {
		display: block;
		color: var(--white);
		text-transform: uppercase;
		font-size: 14px;
		letter-spacing: 2px;
		font-weight: 600;
		padding: 7px 30px;
		margin-top: 30px;
		border: 1.5px solid var(--white);
		border-radius: 7px;
	}
	.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: grid;
		place-items: center;
	}
	.backdrop {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: #11111170;
	}
	@media (min-width: 600px) {
		button {
			align-self: flex-end;
		}
	}
</style>
