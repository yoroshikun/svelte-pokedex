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
    init: () => {
      if (typeof window !== 'undefined') {
        const currentId = parseInt(location.hash.replace('#', ''), 10);

        if (currentId > 0 && currentId <= 708) {
          set({ currentPokemon: currentId, nextPokemon: currentId + 1, previousPokemon: currentId - 1 });
        }
      }
    },
    setPokemon: (id: number) => {
      location.hash = `#${id}`;

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
