import { writable, get } from 'svelte/store';

export interface Pokedex {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  'black-white': Sprites;
}

export interface GenerationIv {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: Home };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: Emerald;
  'firered-leafgreen': Gold;
  'ruby-sapphire': Gold;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

/**
 * Handles getting and setting pokemon data in the pokedex
 * Finds missing pokemon data by fetching from the pokeapi
 *
 * @returns {writable<Pokedex>}
 */
const createPokedexStore = () => {
  const { subscribe, set, update } = writable<Pokedex[]>([]);

  return {
    subscribe,
    init: () => {
      if (typeof window !== 'undefined') {
        set(JSON.parse(window.localStorage.getItem('pokedex')) || []);
      }
    },
    getPokemon: async (id: number) => {
      if (id < 1 || id > 807) {
        return null;
      }

      const currentPokemonIndex = get(pokedexStore).findIndex((pokemon) => pokemon.id === id);

      if (currentPokemonIndex === -1) {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemon.ok) {
          return null;
        }

        const pokemonData = await pokemon.json();

        update((pokedex) => {
          const newData = [...pokedex, pokemonData].sort((a, b) => a.id - b.id);

          // Save new data to local storage
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('pokedex', JSON.stringify(newData));
          }

          return newData;
        });

        return pokemonData;
      } else {
        const pokemon = get(pokedexStore)[currentPokemonIndex];
        return pokemon;
      }
    },
    removePokemon: (id: number) => {
      update((pokedex) => pokedex.filter((pokemon) => pokemon.id !== id));
    },
    reset: () => set([]),
  };
};

export const pokedexStore = createPokedexStore();
