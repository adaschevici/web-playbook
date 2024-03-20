<script>
    import { isCartOpen } from '../stores/app-store';
</script>

<!--use "$" to read the store value-->
<button on:click={() => isCartOpen.set(!$isCartOpen)}>Cart</button>