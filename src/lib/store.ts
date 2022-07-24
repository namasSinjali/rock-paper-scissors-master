import { writable } from 'svelte/store';
import { browser } from '$app/env';

const stored = parseInt((browser && localStorage.getItem('score')) || '0');

const { subscribe, update } = writable<number>(stored);

export const score = {
	subscribe,
	increment: () => update((v) => v + 1),
	decrement: () => update((v) => (v <= 0 ? 0 : v - 1))
};

score.subscribe((value) => {
	browser && localStorage.setItem('score', value.toString());
});
