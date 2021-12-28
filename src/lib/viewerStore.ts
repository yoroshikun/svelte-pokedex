import { writable } from 'svelte/store';

interface Viewer {
  currentPokemon: number;
  nextPokemon: number;
  previousPokemon: number;
}

/**
 * Handles viewer state
 * The viewer state is a simple object that contains the following properties:
 * - currentPokemon: the current pokemon being viewed
 * - nextPokemon: the next pokemon to be viewed
 * - previousPokemon: the previous pokemon to be viewed
 *
 * @returns {writable<ViewerState>}
 */
const createViewerStore = () => {
  const { subscribe, set, update } = writable<Viewer>({ currentPokemon: 1, nextPokemon: 2, previousPokemon: 0 });

  return {
    subscribe,
    init: (id?: number) => {
      if (!id) return;

      if (id >= 1 && id <= 898) {
        set({ currentPokemon: id, nextPokemon: id + 1, previousPokemon: id - 1 });
      }
    },
    setPokemon: (id: number) => {
      window.history.replaceState({}, 'Svelte Pokedex', `/${id}`);

      update((state) => {
        state.currentPokemon = id;
        state.previousPokemon = id - 1;
        state.nextPokemon = id + 1;
        return state;
      });
    },
  };
};

export const viewerStore = createViewerStore();
