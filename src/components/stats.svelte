<script lang="ts">
  import type { Pokedex } from 'src/utils/pokedexStore';

  export let currentPokemon: Promise<Pokedex>;
</script>

{#await currentPokemon}
  <div>loading</div>
{:then pokemon}
  <div class="mt-7 w-full max-w-2xl">
    <h2 class="mb-2 text-3xl font-bold underline decoration-fuchsia-400">Stats</h2>
    <div class="flex flex-col w-full">
      <h4 class="text-xl font-semibold mb-2">HP</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[0].base_stat / 255) * 100}%" />
      </div>
      <h4 class="text-xl font-semibold mb-2">Attack</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[1].base_stat / 255) * 100}%" />
      </div>
      <h4 class="text-xl font-semibold mb-2">Defense</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[2].base_stat / 255) * 100}%" />
      </div>
      <h4 class="text-xl font-semibold mb-2">Sp. Attack</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[3].base_stat / 255) * 100}%" />
      </div>
      <h4 class="text-xl font-semibold mb-2">Sp. Defense</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[4].base_stat / 255) * 100}%" />
      </div>
      <h4 class="text-xl font-semibold mb-2">Speed</h4>
      <div class="w-full border border-fuchsia-400 rounded-xl overflow-hidden h-6 mb-6">
        <div class="bg-fuchsia-500/50 h-6" style="width: {(pokemon.stats[5].base_stat / 255) * 100}%" />
      </div>
    </div>
  </div>
{/await}
