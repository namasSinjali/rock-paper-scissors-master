<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Symbol from '$lib/Symbol.svelte';
	import Rules from '$lib/Rules.svelte';

	import { scale, fade, crossfade } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	import { score } from '$lib/store';

	export const [send, receive] = crossfade({
		duration: 500,
		fallback(node, { delay, duration, easing }) {
			return scale(node, {
				duration: typeof duration === 'number' ? duration : undefined,
				delay,
				easing
			});
		}
	});

	let nOfSymbols: 3 | 5 = 5;
	const symbols: Symbols[] = ['scissors', 'paper', 'rock', 'lizard', 'spock'];
	$: usedSymbols = symbols.slice(0, nOfSymbols);

	const btns: { class: string; type: Symbols }[] = [
		{ class: 'one', type: 'scissors' },
		{ class: 'two', type: 'paper' },
		{ class: 'three', type: 'rock' },
		{ class: 'four', type: 'lizard' },
		{ class: 'five', type: 'spock' }
	];

	let showRule = false;
	let mainWidth: number;
	$: sizeAtSelect = mainWidth * (nOfSymbols === 3 ? 0.43 : 0.33);
	$: sizeAtResult = mainWidth * 0.4;

	let selection: Symbols | null = null;
	let rnd: Symbols | null = null;
	let win: -1 | 0 | 1 | null = null;
	let expandResult = false;

	function select(s: Symbols) {
		selection = s;

		setTimeout(randomize, 800);
	}
	function randomize() {
		const sbls = usedSymbols;
		const rndIndex = Math.floor(Math.random() * sbls.length);
		rnd = sbls[rndIndex];
		setTimeout(result, 800);
	}
	function result() {
		expandResult = true;
		win = (function (): -1 | 0 | 1 | null {
			if (!selection || !rnd) return null;
			if (selection === rnd) return 0;
			const VALUE = {
				scissors: 0,
				paper: 1,
				rock: 2,
				lizard: 3,
				spock: 4
			};
			const diff = VALUE[rnd] - VALUE[selection];
			let win: -1 | 1 = diff % 2 === 0 ? -1 : 1;
			if (diff < 0) return <-1 | 1>-win;
			return win;
		})();
		if (win == 1) score.increment();
		else if (win === -1) score.decrement();
	}
	function playAgain() {
		selection = null;
		rnd = null;
		win = null;
		expandResult = false;
	}
</script>

<svelte:head>
	<title
		>{nOfSymbols === 3
			? 'Frontend Mentor | Rock, Paper, Scissors'
			: 'Frontend Mentor | Rock, Paper, Scissors, Lizard, Spock'}</title
	>
</svelte:head>

<div class="body">
	<div class="layout">
		<Header
			on:click={() => {
				nOfSymbols = nOfSymbols === 3 ? 5 : 3;
			}}
			bind:nOfSymbols
		/>

		<main
			bind:clientWidth={mainWidth}
			style:height={mainWidth + 'px'}
			class={nOfSymbols === 3 ? 'small' : 'large'}
		>
			<div class="layer layer-select" style:position={selection ? 'absolute' : 'static'}>
				{#if !selection}
					<div class="wrapper" style:padding={sizeAtSelect / 2 + 'px'} out:fade={{ duration: 200 }}>
						<div class="container">
							{#each usedSymbols as symbol, i (symbol)}
								<div class={`btn-wrapper btn${i}`}>
									<button
										on:click={() => {
											select(symbol);
										}}
										in:scale={{ duration: 500 }}
										out:send={{ key: symbol, duration: 500 }}
									>
										<Symbol type={symbol} size={sizeAtSelect} />
									</button>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
			<div class="layer layer-result" style:position={!selection ? 'absolute' : 'static'}>
				{#if selection}
					<div class="result" class:expand={expandResult} in:fade={{ duration: 300 }}>
						<div class="player-card one" class:winner={win === 1}>
							<div in:receive={{ key: selection }}>
								<Symbol type={selection} size={sizeAtResult} />
							</div>
							<span class="label">You Picked</span>
						</div>
						<div class="player-card two" class:winner={win === -1}>
							{#if rnd}
								<div in:scale={{ duration: 500, easing: backOut }}>
									<Symbol type={rnd} size={sizeAtResult} />
								</div>
							{:else}
								<div class="placeholder" style:--size={sizeAtResult + 'px'} />
							{/if}
							<span class="label">The House Picked</span>
						</div>
						{#if win !== null}
							<div class="message-container" in:scale={{ duration: 500 }}>
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
										playAgain();
									}}>Play Again</button
								>
							</div>
						{/if}
					</div>
				{/if}
			</div>
			<!-- <div class="layer" style:z-index={selection ? 0 : 1}>
				{#if !selection}
					<Select
						on:select={(e) => {
							selection = e.detail;
						}}
					/>
				{/if}
			</div>
			<div class="layer" style:z-index={selection ? 1 : 0}>
				{#if selection}
					<Result
						{selection}
						on:playAgain={() => {
							selection = null;
						}}
					/>
				{/if}
			</div> -->
		</main>
	</div>
	<button
		class="rule"
		on:click={() => {
			showRule = true;
		}}
	>
		rules
	</button>
	<div class="attribution">
		Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
			>Frontend Mentor</a
		>. Coded by <a href="https://github.com/namasSinjali">Namas</a>.
	</div>
</div>
{#if showRule}
	<div class="modal-container" transition:scale={{ start: 0.3, duration: 300 }}>
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
			{nOfSymbols}
		/>
	</div>
{/if}

<style>
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
		cursor: pointer;
	}
	.body {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		width: 100vw;
		min-height: 100vh;
		background-image: radial-gradient(
			ellipse at center top,
			hsl(214, 47%, 23%),
			hsl(237, 49%, 15%)
		);
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
		align-self: center;
		width: clamp(max(200px, 60vmin), calc(100vh - 325px), 100%);
		flex-grow: 1;
		margin-top: max(50px, 10vh);
		position: relative;
	}
	.layer {
		/* outline: 1px solid red; */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	button.rule {
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
	button.rule:hover {
		background-color: var(--white);
		color: hsl(237, 49%, 15%);
	}
	.attribution {
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;

		color: var(--white);
		font-weight: 600;
		font-size: 12px;
		text-align: center;
	}
	.attribution a {
		color: hsl(228, 45%, 44%);
	}
	.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: grid;
		place-items: center;
		z-index: 100;
	}
	.backdrop {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: #11111170;
	}
	.layer-select button:hover {
		transform-origin: center;
		transform: scale(1.1);
		transition: transform ease-in-out 0.1s;
	}
	.layer-select .btn-wrapper {
		position: absolute;
	}
	.layer-select .container {
		position: relative;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.small .layer-select .container {
		aspect-ratio: 1.1547;
		background-image: url(images/bg-triangle.svg);
	}
	.large .layer-select .container {
		aspect-ratio: 1.05146;
		background-image: url(images/bg-pentagon.svg);
	}
	.small .layer-select .btn0 {
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	.small .layer-select .btn1 {
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
	}
	.small .layer-select .btn2 {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
	}

	.large .layer-select .btn0 {
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.large .layer-select .btn1 {
		top: 38.1966%;
		right: 0;
		transform: translate(50%, -50%);
	}
	.large .layer-select .btn2 {
		bottom: 0;
		right: 19.0983%;
		transform: translate(50%, 50%);
	}
	.large .layer-select .btn3 {
		bottom: 0;
		left: 19.0983%;
		transform: translate(-50%, 50%);
	}
	.large .layer-select .btn4 {
		top: 38.1966%;
		left: 0;
		transform: translate(-50%, -50%);
	}

	.result {
		display: grid;
		grid-template:
			'player1 player2' 1fr
			'message message' auto
			/ 1fr 1fr;
		justify-items: center;
		align-items: center;
	}
	.result .player-card {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 20px;
		position: relative;
		border-radius: 100vmax;
	}
	.result .winner.player-card {
		--color: rgba(224, 223, 223, 0.075);
		box-shadow: 0 0 150px 0 var(--color), 0 0 150px 20px var(--color), 0 0 150px 80px var(--color);
		transition: box-shadow 0.5s ease-out;
	}
	.result .player-card .label {
		color: var(--white);
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 2px;
		position: absolute;
		bottom: -40px;
		width: max-content;
	}
	.result .one {
		grid-area: player1;
		justify-self: flex-start;
	}
	.result .two {
		grid-area: player2;
		justify-self: flex-end;
	}
	.result .message-container {
		grid-area: message;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 20px;
		margin-top: 50px;
		margin-bottom: 20px;
		width: 200px;
	}
	.result .message {
		color: var(--white);
		font-size: 50px;
	}
	.result button {
		text-transform: uppercase;
		color: hsl(214, 47%, 23%);
		background: var(--white);
		padding: 10px 50px;
		border-radius: 5px;
		font-weight: 600;
		font-size: 16px;
		letter-spacing: 2px;
	}
	.result button:hover {
		color: hsl(349, 70%, 56%);
	}

	.result .placeholder {
		width: var(--size);
		height: var(--size);
		transform-origin: center;
		transform: scale(0.77);
		background-color: #00000030;
		border-radius: 100vmax;
	}
	@media (min-width: 600px) {
		button.rule {
			position: absolute;
			bottom: 30px;
			right: 30px;
			margin: 0;
			align-self: flex-end;
		}
	}

	@media (min-width: 800px) {
		main {
			display: grid;
			align-items: center;
			justify-content: stretch;
		}
		.result {
			margin-top: 20px;
			grid-template: 'player1 message player2' auto/ 1fr 0 1fr;
			margin-left: 0;
			margin-right: 0;
		}
		.result.expand {
			/* grid-template: 'player1 message player2' auto/ 1fr 200px 1fr; */
			margin-right: -70px;
			margin-left: -70px;
			transition: margin-left 0.4s ease-out, margin-right 0.4s ease-out;
		}
		.result .message-container {
			margin: 0;
		}
		.result .player-card .label {
			bottom: auto;
			top: -40px;
		}
	}
</style>
