<script>
  import { isCartOpen, cartItems } from '../stores/app-store';
</script>

{#if $isCartOpen}
  {#if Object.values($cartItems).length}
    <aside class="container">
      <ul class="list">
        {#each Object.values($cartItems) as cartItem}
        <li class="listItem">
          <img src={cartItem.imageSrc} alt={cartItem.name} />
          <h3>{cartItem.name}</h3>
          <p>Quantity: {cartItem.quantity}</p>
        </li>
        {/each}
      </ul>
    </aside>
  {:else}
    <p>Your cart is empty!</p>
  {/if}
{/if}

<style>
  .container {
    position: fixed;
    right: 0;
    top: var(--nav-height);
    height: 100vh;
    background: var(--color-bg-2);
    padding-inline: 2rem;
    min-width: min(90vw, 300px);
    border-left: 3px solid var(--color-bg-3);
  }

  .list {
    list-style: none;
    padding: 0;
  }

  .listItem {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .listItem * {
    margin-block: 0.3rem;
  }

  .listItemImg {
    width: 4rem;
  }
</style>