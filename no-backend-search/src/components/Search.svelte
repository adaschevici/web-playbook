<script lang="ts">
  import Fuse from "fuse.js";

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
  let searchIndex: string[];
  let searchQuery: string = "";
  let posts: Post[] = [];

  function Search(searchIndex: string[]) {
    const fuse = new Fuse(searchIndex, options);
    const query: string = "";
    const posts = fuse
      .search(searchQuery)
      .map((result) => result.item)
      .slice(0, 5);
  }

  function handleOnSearch(event: Event) {
    const value = event.target?.value;
    searchQuery = value;
  }
</script>

<label for="searchInput">Search</label>
<input
  type="text"
  value={searchQuery}
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
  {#if posts.length === 0}
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
