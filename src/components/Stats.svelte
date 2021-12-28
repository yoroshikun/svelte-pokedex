<script lang="ts">
  import type { Pokedex } from '$lib/pokedexStore';

  export let pokemon: Pokedex;

  const statNameList = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
</script>

<div class="mt-7 w-full max-w-2xl">
  <h2 class="mb-2 text-3xl font-bold underline decoration-fuchsia-400">Stats</h2>
  <div class="flex flex-col w-full">
    {#each statNameList as statName, i}
      <h4 class="text-xl font-semibold mb-2">{statName}</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[i].base_stat / 255) * 100}%" />
      </div>
    {/each}
  </div>
</div>
