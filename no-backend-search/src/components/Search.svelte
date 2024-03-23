<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import type { Post } from "../types/interface";

  const options = {
    keys: ["frontmatter.title", "frontmatter.description", "frontmatter.slug"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  };
  export let searchIndex: Post[];
  let posts: Post[] = [];
  let searchQuery: string = "";
  let fuse: Fuse<Post>;
  let searchInput: HTMLInputElement;

  onMount(() => {
    fuse = new Fuse(searchIndex, options);
    if (searchInput) searchInput.focus();
  });

  $: if (fuse && searchQuery.length > 1) {
    const results = fuse
      .search(searchQuery)
      .slice(0, 5)
      .map((result) => result.item);
    posts = results;
  }

  $: if (searchQuery.length === 0) {
    posts = [];
  }
</script>

<div>
  <label
    for="searchInput"
    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >Search</label
  >
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-search"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="lightgray"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx={10} cy={10} r={7}></circle>
        <line x1={21} y1={21} x2={15} y2={15}></line>
      </svg>
    </div>
    <input
      class="block w-full p-4 pl-10 text-sm
       border border-gray-300
       rounded-full bg-gray-50
       dark:bg-[#202124]

       focus:outline-none
       focus:ring-blue-500
       focus:border-blue-500"
      id="searchInput"
      type="text"
      bind:value={searchQuery}
      on:input={() => {}}
      placeholder="Search for anything..."
      bind:this={searchInput}
    />
  </div>
  {#if searchQuery.length > 1}
    <p>
      Found {posts.length}
      {posts.length === 1 ? "result" : "results"} for '{searchQuery}'
    </p>
  {/if}
  <ul class="search-results">
    {#if posts.length > 0}
      {#each posts as post}
        <li>
          <a
            class="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
            href={`/${post.frontmatter.slug}`}>{post.frontmatter.title}</a
          >
          <p class="text-gray-500">{post.frontmatter.description}</p>
        </li>
      {/each}
    {:else}
      <li>No results found</li>
    {/if}
  </ul>
</div>

<style>
  /* Basic styles for improved appearance */
  .search-results {
    list-style: none;
    padding: 0;
  }
  .search-results li a {
    color: blue; /* Placeholder styling; adjust as needed */
    text-decoration: none;
  }
</style>
