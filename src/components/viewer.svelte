<script lang="ts">
  import type { Pokedex } from 'src/utils/pokedexStore';

  export let currentPokemon: Promise<Pokedex>;

  let shiny = false;
  let back = false;
</script>

{#await currentPokemon}
  <div>Loading</div>
{:then pokemon}
  <div class="p-4 flex flex-col w-full md:w-4/12 justfiy-center items-center">
    <h1 class="mb-8 text-5xl font-bold underline decoration-fuchsia-400 capitalize text-gray-200">{pokemon.name}</h1>
    <div
      class="flex p-8 rounded-lg border-2 border-fuchsia-400 aspect-square items-center w-52 shadow-lg shadow-fuchsia-400/40"
    >
      {#if !shiny && !back}
        <img class="m-auto" src={pokemon.sprites.front_default} alt="pokemon sprite front default" />
      {:else if shiny && !back}
        <img class="m-auto" src={pokemon.sprites.front_shiny} alt="pokemon sprite front shiny" />
      {:else if !shiny && back}
        <img class="m-auto" src={pokemon.sprites.back_default} alt="pokemon sprite back default" />
      {:else if shiny && back}
        <img class="m-auto" src={pokemon.sprites.back_shiny} alt="pokemon sprite back shiny" />
      {/if}
    </div>
    <div class="flex flex-row justify-between mt-4 mx-2 w-24">
      <button
        class="border border-cyan-400 text-cyan-400 font-bold px-2 aspect-square rounded-full hover:bg-cyan-400/20 transition"
        on:click={() => (shiny = !shiny)}
      >
        +
      </button>
      <button
        class="border border-red-400 text-red-400 font-bold px-2 aspect-square rounded-full hover:bg-red-500/20 transition"
        on:click={() => (back = !back)}
      >
        -
      </button>
    </div>
  </div>
{/await}
