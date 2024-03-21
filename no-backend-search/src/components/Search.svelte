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

  onMount(() => {
    fuse = new Fuse(searchIndex, options);
  });

  $: if(fuse) {
    const results = fuse.search(searchQuery).map((result) => result.item).slice(0, 5);
    posts = results;
  }

  function handleOnSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
  }

</script>

<label for="searchInput">Search</label>
<input
  id="searchInput"
  type="text"
  bind:value={searchQuery}
  on:change={handleOnSearch}
  placeholder="Search posts"
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
