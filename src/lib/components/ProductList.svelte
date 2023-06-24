<script>
    import ProductItem from "./ProductItem.svelte";
    export let items;
</script>
<div class="flex flex-col max-h-64 overflow-auto w-full">   
    {#if items.length > 0}                 
    {#each items as productItem}
        <ProductItem item={productItem} />
    {/each}
    {:else}
    <p>The Order is Empty!</p>
    {/if}
</div>