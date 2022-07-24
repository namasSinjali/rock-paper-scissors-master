<script lang="ts">
	import { score } from '$lib/store';
	export let nOfSymbols: 3 | 5;
	$: logoSrc = nOfSymbols === 3 ? 'images/logo.svg' : 'images/logo-bonus.svg';
</script>

<div class="header">
	<img
		style:height={nOfSymbols === 3 ? '70%' : '100%'}
		src={logoSrc}
		alt="logo"
		title="Change Mode"
		on:click
	/>
	<div class="score-board">
		<span class="label">score</span>
		<span class="score">{$score}</span>
	</div>
</div>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 95px;
		padding: 10px 10px 10px 20px;
		border: 2px solid hsl(217, 16%, 45%);
		border-radius: 7px;
		min-width: 200px;
	}
	img {
		height: 100%;
		object-fit: contain;
		cursor: pointer;
	}

	.score-board {
		align-self: stretch;
		display: flex;
		justify-content: center;
		min-width: 70px;
		flex-flow: column nowrap;
		padding: 10px 5px;
		align-items: center;
		background-color: white;
		border-radius: 5px;
	}
	.label {
		text-transform: uppercase;
		color: hsl(229, 64%, 46%);
		font-size: 10px;
		letter-spacing: 1px;
		font-weight: 600;
	}
	.score {
		color: hsl(229, 25%, 31%);
		font-size: 40px;
		font-weight: 700;
		line-height: 1;
	}
	@media (min-height: 500px) and (min-width: 800px) {
		.header {
			height: 150px;
			padding: 20px 20px 20px 30px;
		}
		.score-board {
			padding: 10px 30px;
		}
		.score {
			font-size: 60px;
		}
		.label {
			font-size: 15px;
		}
	}
</style>
