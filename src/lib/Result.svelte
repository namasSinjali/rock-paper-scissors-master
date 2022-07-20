<script lang="ts">
	import Symbol from '$lib/Symbol.svelte';
	import { score } from '$lib/store';
	import { createEventDispatcher } from 'svelte';

	export let selection: Symbols;

	const dispatch = createEventDispatcher();

	let containerWidth: number;
	$: symbolSize = containerWidth * 0.4;

	let rnd = (function () {
		const sbls: Symbols[] = ['rock', 'paper', 'scissors'];
		const rndIndex = Math.floor(Math.random() * sbls.length);
		return sbls[rndIndex];
	})();

	let picks: Symbols[] = [selection, rnd];
	let win = (function () {
		if (picks[0] === picks[1]) return 0;
		const VALUE = {
			scissors: 0,
			paper: 1,
			rock: 2,
			lizard: 3,
			spook: 4
		};
		const diff = VALUE[picks[1]] - VALUE[picks[0]];
		let win = diff % 2 === 0 ? -1 : 1;
		if (diff < 0) win *= -1;
		return win;
	})();

	if (win === 1) {
		score.increment();
	} else if (win === -1) {
		score.decrement();
	}
</script>

<div bind:clientWidth={containerWidth} />
<div class="result">
	<div class="player-card one" class:winner={win === 1}>
		<Symbol type={picks[0]} size={symbolSize} />
		<span class="label">You Picked</span>
	</div>
	<div class="player-card two" class:winner={win === -1}>
		<Symbol type={picks[1]} size={symbolSize} />
		<span class="label">The House Picked</span>
	</div>
	<div class="message-container">
		<div class="message">
			{#if win === 1}
				YOU WIN
			{:else if win === -1}
				YOU LOSE
			{:else if win === 0}
				DRAW
			{:else}
				Error: Unexpected condition reached.Please contact developer
			{/if}
		</div>
		<button
			on:click={() => {
				dispatch('playAgain');
			}}>Play Again</button
		>
	</div>
</div>

<style>
	.result {
		display: grid;
		grid-template:
			'player1 player2' 1fr
			'message message' auto
			/ 1fr 1fr;
		justify-items: center;
		align-items: center;
	}
	.player-card {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 20px;
		position: relative;
		border-radius: 100vmax;
	}
	.winner.player-card {
		box-shadow: 0 0 150px #aaa;
	}
	.player-card .label {
		color: var(--white);
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 2px;
		position: absolute;
		bottom: -40px;
	}
	.one {
		grid-area: player1;
		justify-self: flex-start;
	}
	.two {
		grid-area: player2;
		justify-self: flex-end;
	}
	.message-container {
		grid-area: message;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 20px;
		margin-top: 50px;
		margin-bottom: 20px;
	}
	.message {
		color: var(--white);
		font-size: 50px;
	}
	button {
		text-transform: uppercase;
		color: hsl(214, 47%, 23%);
		background: var(--white);
		padding: 10px 50px;
		border-radius: 5px;
		font-weight: 600;
		font-size: 16px;
		letter-spacing: 2px;
	}

	@media (min-width: 800px) {
		.result {
			margin-top: 20px;
			margin-right: -70px;
			margin-left: -70px;
			grid-template: 'player1 message player2' auto/ 1fr auto 1fr;
		}
		.player-card .label {
			bottom: auto;
			top: -40px;
		}
	}
</style>
