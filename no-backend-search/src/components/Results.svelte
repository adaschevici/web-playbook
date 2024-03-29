<script lang="ts">
  import { searchResults } from '../stores/search.ts';
  import Card from './Card.svelte';
</script>

{#if $searchResults.length !== 0}
  <div class="absolute">
    {#each $searchResults as post}
      <Card href={post.frontmatter.slug} title={post.frontmatter.title} body={post.Content} />
    {/each}
    <p>Found {$searchResults.length} results</p>
  </div>
{/if}
