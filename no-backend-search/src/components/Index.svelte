<script>
  import { facetsVisible } from '../stores/facets.ts';
  import SearchBar from '../components/Search.svelte';
  import Facets from '../components/Facets.svelte';
  import Results from '../components/Results.svelte';

  export let postList;
</script>

<div class="flex h-[50vh] flex-col justify-center align-middle">
  <div class="py-5 lg:py-8">
    <h1
      class="ubuntu-mono-regular bg-gradient-to-tr from-blue-500 to-orange-500 bg-clip-text text-center text-5xl font-bold text-transparent lg:text-9xl"
    >
      ReSearch
    </h1>
  </div>
  <div class="mx-auto w-[85vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw]">
    <SearchBar searchIndex={postList} />
  </div>
  <div class="flex">
    {#if $facetsVisible}
      <Facets visible={false} />
    {:else}
      <Facets visible={true} />
    {/if}
    <Results />
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  .ubuntu-mono-regular {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 400;
    font-style: normal;
  }

  .ubuntu-mono-bold {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 700;
    font-style: normal;
  }

  .ubuntu-mono-regular-italic {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 400;
    font-style: italic;
  }

  .ubuntu-mono-bold-italic {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 700;
    font-style: italic;
  }
</style>
