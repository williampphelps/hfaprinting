<script>
    import CartItem from "./CartItem.svelte";
    import { cart } from "$lib/stores";
</script>
<div class="flex flex-col max-h-64 overflow-auto w-full">   
    {#if $cart.length > 0}                 
    {#each $cart as cartItem}
        <CartItem item={cartItem} />
    {/each}
    {:else}
    <p>Your Cart Is Empty!</p>
    {/if}
</div>