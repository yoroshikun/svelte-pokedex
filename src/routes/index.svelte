<script>
  import Viewer from '../components/viewer.svelte';
  import Stats from '../components/stats.svelte';
  import Selector from '../components/selector.svelte';
  import Header from '../components/header.svelte';
  import Footer from '../components/footer.svelte';

  import { pokedexStore } from '../utils/pokedexStore';
  import { viewerStore } from '../utils/viewerStore';

  pokedexStore.init();
  viewerStore.init();

  $: currentPokemon = pokedexStore.getPokemon($viewerStore.currentPokemon);
  $: nextPokemon = pokedexStore.getPokemon($viewerStore.nextPokemon);
  $: previousPokemon = pokedexStore.getPokemon($viewerStore.previousPokemon);
</script>

<div class="bg-white dark:bg-zinc-800 flex flex-col h-screen">
  <Header />
  <div class="container mx-auto px-4 py-16 h-5/6 w-full flex flex-col md:flex-row">
    <Viewer {currentPokemon} />
    <Stats {currentPokemon} />
  </div>
  <div class="container mx-auto px-4 py-16 h-1/6 w-full">
    <Selector {previousPokemon} {nextPokemon} />
  </div>
  <Footer />
</div>
