<script lang="ts">
  export let info: Promise<import("src/utils/pokedexStore").Pokedex>;
</script>

<div class="">
  <p class="text-lg">Information</p>
  {#await info}
  <p class="text-md">Wait a sec while we get the pokemon info!</p>
  {:then pokemon}
  <p class="text-md">{JSON.stringify(pokemon.name)}</p>
  {:catch error}
  <p class="text-md">{error}</p>
  {/await} 
</div>