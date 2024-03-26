<script lang="ts">
  import { searchResults } from '../stores/search.ts';
  // import { Card } from "./Card.astro";
  // let results = searchResults || [];
</script>

{#if $searchResults.length === 0}
  {$searchResults}
  <p>No results found</p>
{:else}
  <p>Found {$searchResults.length} results</p>
{/if}
<!-- {#each results as post} -->
<!--   <Card -->
<!--     href={post.frontmatter.slug} -->
<!--     title={post.frontmatter.title} -->
<!--     body={post.Content} -->
<!--   /> -->
<!-- {/each} -->
