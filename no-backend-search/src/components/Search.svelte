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
  let anySearchExecuted: boolean = false;

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

<div class="autocomplete-container">
  <label
    for="searchInput"
    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-search stroke-slate-600 dark:stroke-slate-100"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke-width="2"
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
         color-slate-900 dark:text-slate-100
         border border-gray-600 dark:border-gray-300
         {posts.length ? 'rounded-t-lg' : 'rounded-full'} bg-gray-50
         dark:bg-finder-grey

         focus:outline-none
         focus:ring-blue-500
         focus:border-blue-500"
      id="searchInput"
      type="text"
      bind:value={searchQuery}
      on:input={() => {}}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          searchQuery = "";
          searchInput.focus();
        }
      }}
      placeholder="Search for anything..."
      bind:this={searchInput}
    />
    <button
      class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-auto"
      on:click={() => console.log("Filter button clicked")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-search stroke-slate-600 dark:stroke-slate-100"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M22 18.605a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H2.75a.75.75 0 1 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75m0-13.21a.75.75 0 0 1-.75.75H18.8a2.93 2.93 0 0 1-5.66 0H2.75a.75.75 0 1 1 0-1.5h10.39a2.93 2.93 0 0 1 5.66 0h2.45a.74.74 0 0 1 .75.75m0 6.6a.74.74 0 0 1-.75.75H9.55a2.93 2.93 0 0 1-5.66 0H2.75a.75.75 0 1 1 0-1.5h1.14a2.93 2.93 0 0 1 5.66 0h11.7a.75.75 0 0 1 .75.75"
        />
      </svg>
    </button>
  </div>
  {#if searchQuery.length > 1 && anySearchExecuted}
    <p>
      Found {posts.length}
      {posts.length === 1 ? "result" : "results"} for '{searchQuery}'
    </p>
  {/if}
  <ul
    class="suggestions {posts.length &&
      'border border-gray-600 rounded-b-lg dark:border-gray-300'}"
  >
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
    {/if}
  </ul>
</div>

<style>
  /* Basic styles for improved appearance */
  .autocomplete-container {
    position: relative;
    display: inline-block; /* or 'block' depending on your layout */
    width: 100%;
  }
  .suggestions {
    position: absolute;
    width: 100%; /* Match the input field's width */
    z-index: 10; /* Ensure it's above other content */
    list-style: none;
    padding-left: 35px;
    padding-right: 15px;
    margin: 0;
    border-top: none; /* Remove top border to blend with input */
    max-height: 200px; /* Limit height and add scroll */
    overflow-y: auto;
  }
  /* .search-results {
    list-style: none;
    padding: 0;
  } */
  .search-results li a {
    color: blue; /* Placeholder styling; adjust as needed */
    text-decoration: none;
  }
</style>
