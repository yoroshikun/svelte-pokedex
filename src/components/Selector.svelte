<script lang="ts">
  import type { Pokedex } from '$lib/pokedexStore';
  import Selectoritem from './SelectorItem.svelte';

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
