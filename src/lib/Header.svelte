<script lang="ts">
	import { score } from '$lib/store';
	export let logoSrc: string;
</script>

<div class="header">
	<img src={logoSrc} alt="logo" />
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
	}
	img {
		height: 70%;
		object-fit: contain;
	}

	.score-board {
		align-self: stretch;
		display: flex;
		min-width: 70px;
		flex-flow: column nowrap;
		padding: 10px 5px 0 5px;
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
	}
</style>
