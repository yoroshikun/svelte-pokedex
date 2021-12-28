<script lang="ts" context="module">
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch }) {
    const id = Number(page.params.id);

    if (id <= 0 || id >= 898) {
      return {
        status: 404,
        error: new Error('Pokemon id must be between 1 and 898'),
      };
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${page.params.id || 1}`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          preloadPokemon: (await res.json()) as import('$lib/pokedexStore').Pokedex,
          id,
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not prefetch pokemon ${url}`),
      props: {
        id,
      },
    };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  export let preloadPokemon: import('$lib/pokedexStore').Pokedex;
  export let id: number;

  import Viewer from '$components/Viewer.svelte';
  import Stats from '$components/Stats.svelte';
  import Selector from '$components/Selector.svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';

  import { pokedexStore } from '$lib/pokedexStore';
  import { viewerStore } from '$lib/viewerStore';

  let mounted = false;

  onMount(() => {
    pokedexStore.hydrate(preloadPokemon);
    mounted = true;
  });

  viewerStore.init(id);

  $: currentPokemon = mounted ? pokedexStore.getPokemon($viewerStore.currentPokemon) : preloadPokemon;
  $: nextPokemon = mounted ? pokedexStore.getPokemon($viewerStore.nextPokemon) : null;
  $: previousPokemon = mounted ? pokedexStore.getPokemon($viewerStore.previousPokemon) : null;
</script>

<div class="bg-white dark:bg-zinc-800 flex flex-col h-screen">
  <Header />
  <div class="container mx-auto px-4 py-16 h-5/6 w-full flex flex-col md:flex-row">
    {#await currentPokemon}
      <Viewer pokemon={preloadPokemon} />
      <Stats pokemon={preloadPokemon} />
    {:then pokemon}
      <Viewer {pokemon} />
      <Stats {pokemon} />
    {/await}
  </div>
  <div class="container mx-auto px-4 py-16 h-1/6 w-full">
    <Selector {previousPokemon} {nextPokemon} />
  </div>
  <Footer />
</div>
