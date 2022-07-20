<script lang="ts">
	type LogoData = {
		[index in Symbols]: { src: string; gradientFrom: string; gradientTo: string; shadow: string };
	};
	const SYMBOLS: LogoData = {
		scissors: {
			src: 'images/icon-scissors.svg',
			gradientFrom: 'hsl(39, 89%, 49%)',
			gradientTo: 'hsl(40, 84%, 53%)',
			shadow: 'hsl(28, 75%, 45%)'
		},
		paper: {
			src: 'images/icon-paper.svg',
			gradientFrom: 'hsl(230, 89%, 62%)',
			gradientTo: 'hsl(230, 89%, 65%)',
			shadow: 'hsl(228, 64%, 46%)'
		},
		rock: {
			src: 'images/icon-rock.svg',
			gradientFrom: 'hsl(349, 71%, 52%)',
			gradientTo: 'hsl(349, 70%, 56%)',
			shadow: 'hsl(347, 74%, 36%)'
		}
	};
	export let type: Symbols;
	export let size: number;

	let data = SYMBOLS[type];
	let borderImageSource = `linear-gradient(to top, ${data.gradientFrom}, ${data.gradientTo}`;
</script>

<div
	class="logo"
	style:--size={size + 'px'}
	style:--from={data.gradientFrom}
	style:--to={data.gradientTo}
	style:--shadow={data.shadow}
>
	<div class="content">
		<img src={SYMBOLS[type].src} alt={type} />
	</div>
</div>

<style>
	.logo {
		--size: 130px;
		--from: ;
		--to: ;
		--shadow: ;
		--offset: calc(var(--size) / 25);
		width: var(--size);
		height: var(--size);
		position: relative;
		display: grid;
		place-items: center;
		margin-bottom: var(--offset);
	}
	.content {
		--dim: calc(var(--size) / 1.3);
		box-sizing: border-box;
		width: var(--dim);
		height: var(--dim);
		border-radius: 100vh;
		display: grid;
		place-items: center;
		position: relative;
		background: var(--white);
		box-shadow: inset 0 var(--offset) #b8bfd1;
	}
	.logo::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transform-origin: center;
		/* transform: scale(1.3); */
		background: linear-gradient(to top, var(--from), var(--to));
		border-radius: 100vh;
		box-shadow: 0 var(--offset) var(--shadow);
	}
	img {
		object-fit: contain;
		width: 50%;
		height: 50%;
	}
	@media (min-width: 425px) {
		.logo {
			--size: 150px;
		}
	}
</style>
