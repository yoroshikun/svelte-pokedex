<script lang="ts">
  import type { Pokedex } from 'src/utils/pokedexStore';
  import Selectoritem from './selectoritem.svelte';

  export let previousPokemon: Promise<Pokedex>;
  export let nextPokemon: Promise<Pokedex>;
</script>

<div class="flex flex-row max-w-4xl justify-between mx-auto">
  {#await previousPokemon}
    <div />
  {:then pokemon}
    <Selectoritem {pokemon} />
  {:catch}
    <div>Error</div>
  {/await}

  {#await nextPokemon}
    <div />
  {:then pokemon}
    <Selectoritem {pokemon} />
  {:catch}
    <div>Error</div>
  {/await}
</div>
