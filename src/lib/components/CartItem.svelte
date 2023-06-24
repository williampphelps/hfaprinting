<script>
    import { onMount } from "svelte";
    import { cart } from "$lib/stores";
    import axios from "axios";
    export let item;

    let product = getProduct();

    async function getProduct() {
        let result = await axios.get('/api/products/' + item.product);
        return result.data.product;
    }
</script>
{#await product}
<p>Loading...</p>
{:then cartItem}
<div class="p-4 card flex flex-row gap-4 w-full justify-stretch">
    <img class="w-12 h-12 rounded object-cover" src={"https://ik.imagekit.io/szheqbces/" + item.image} alt={cartItem.name} />
    <span class="flex flex-col gap-2">
        <a href={"/shop/" + item.product}><p class="font-bold">{item.name}</p></a>
        <span class='flex flex-col gap-2'>
            <small>Quantity: <button class='chip p-1' on:click={() => cart.decreaseItem(item.product, item.variant, item.option, 1)}>-</button><b>{item.quantity}</b><button class='chip p-1' on:click={() => cart.increaseItem(item.product, item.variant, item.option, 1)}>+</button></small>
            {#if cartItem.variantsEnabled && cartItem.variants.length > 0}
                <small>{cartItem.variantLabel}: <b>{cartItem.variants[item.variant].name}</b></small>
                {#if cartItem.variants[item.variant].optionsEnabled && cartItem.variants[item.variant].options.length > 0}
                    <small>{cartItem.variants[item.variant].optionLabel}: <b>{cartItem.variants[item.variant].options[item.option].name}</b></small>
                    <small>Price: <b>${(cartItem.variants[item.variant].options[item.option].price * item.quantity).toFixed(2)}</b></small>
                {:else}
                <small>Price: <b>${(cartItem.variants[item.variant].price * item.quantity).toFixed(2)}</b></small>
                {/if}
            {:else}
            <small>Price: <b>${(cartItem.price * item.quantity).toFixed(2)}</b></small>
            {/if}
        </span>
    </span>
</div>
{:catch}
<p>There was an error!</p>
{/await}