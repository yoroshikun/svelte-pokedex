<script lang="ts">
  import type { Pokedex } from '$lib/pokedexStore';
  import { viewerStore } from '$lib/viewerStore';

  export let pokemon: Pokedex;
</script>

{#if pokemon}
  <div
    class="px-2 border border-fuchsia-400 shadow-md shadow-fuchsia-400/40 rounded-lg hover:bg-fuchsia-400/20 hover:cursor-pointer transition flex flex-row justify-center items-center"
    on:click={() => viewerStore.setPokemon(pokemon.id)}
  >
    <div class="text-lg text-center capitalize mx-4 font-semibold">{pokemon.name}</div>
    <img src={pokemon.sprites.front_default} alt="pokemonsprite" />
  </div>
{:else}
  <div />
{/if}
