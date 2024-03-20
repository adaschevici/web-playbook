<script>
  import { isCartOpen } from '../stores/app-store';
</script>

{#if $isCartOpen}
    <aside>...</aside>
{/if}