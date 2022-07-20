<script lang="ts">
	import Symbol from '$lib/Symbol.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let wrapperWidth: number;
	$: size = wrapperWidth * 0.43;

	const btns: { class: string; type: Symbols }[] = [
		{ class: 'one', type: 'paper' },
		{ class: 'two', type: 'scissors' },
		{ class: 'three', type: 'rock' }
	];
</script>

<div class="wrapper" bind:clientWidth={wrapperWidth} style:padding={size / 2 + 'px'}>
	<div class="container">
		{#each btns as btn}
			<button
				class={btn.class}
				on:click={() => {
					dispatch('select', btn.type);
				}}
			>
				<Symbol type={btn.type} {size} />
			</button>
		{/each}
	</div>
</div>

<style>
	.container {
		position: relative;
		aspect-ratio: 1.1547;
		background-image: url(images/bg-triangle.svg);
		background-size: 100%;
	}
	.one {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
	}
	.two {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	.three {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
	}
</style>
