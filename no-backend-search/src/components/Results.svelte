<script lang="ts">
  import { searchResults } from '../stores/search.ts';
  import Card from './Card.svelte';
</script>

{#if $searchResults.length === 0}
  {$searchResults}
  <p>No results found</p>
{:else}
  {#each $searchResults as post}
    <Card href={post.frontmatter.slug} title={post.frontmatter.title} body={post.Content} />
  {/each}
  <p>Found {$searchResults.length} results</p>
{/if}
