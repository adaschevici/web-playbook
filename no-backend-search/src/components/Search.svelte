<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";

  interface Post {
    frontmatter: {
      title: string;
      description: string;
      slug: string;
    };
  }
  const options = {
    keys: ["frontmatter.title", "frontmatter.description", "frontmatter.slug"],
    includeMatches: true,
    minMatchCharLength: 3,
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

  $: if (fuse && searchQuery.length > 2) {
    const results = fuse
      .search(searchQuery)
      .slice(0, 5)
      .map((result) => result.item);
    posts = results;
  }
</script>

<label for="searchInput">Search</label>
<input
  id="searchInput"
  type="text"
  bind:value={searchQuery}
  on:input={() => {}}
  placeholder="Search posts"
  bind:this={searchInput}
/>
{#if searchQuery.length > 1}
  <p>
    Found {posts.length}
    {posts.length === 1 ? "result" : "results"} for '{searchQuery}'
  </p>
{/if}
<ul>
  {#if posts.length > 0}
    {#each posts as post}
      <li>
        <a href={`/${post.frontmatter.slug}`}>{post.frontmatter.title}</a>
        {post.frontmatter.description}
      </li>
    {/each}
  {:else}
    <li>No results found</li>
  {/if}
</ul>

<style>
  /* Basic styles for improved appearance */
  .search-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .search-results {
    list-style: none;
    padding: 0;
  }
  .search-results li a {
    color: blue; /* Placeholder styling; adjust as needed */
    text-decoration: none;
  }
</style>
