<script>
    import Markdown from '$lib/components/Markdown.svelte';
    import { cart } from '$lib/stores.js';
    import { popup } from '@skeletonlabs/skeleton';
    import { toastStore } from '@skeletonlabs/skeleton';
    export let data;

    const cartPopup = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'cartPopup',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
        closeQuery: 'a[href]'
    };

    let sVariant = 0;
    let sOption = 0;
    let sImage = listImages(sVariant, sOption)[0];

    function listImages(variant, option) {
        let images = [];
        images = [...images, ...data.product.images];

        if (data.product.variantsEnabled && data.product.variants.length > 0) {
            images = [...images, ...data.product.variants[variant].images]
            if (data.product.variants[variant].optionsEnabled && data.product.variants[variant].options.length > 0) {
                images = [...images, ...data.product.variants[variant].options[option].images]
            }
        }

        return images;
    }

    $: imageList = listImages(sVariant, sOption);

    function addToCart() {

        let cartImage;
        let cartPrice;
        let cartVariant;
        let cartOption;

        if (data.product.variantsEnabled && data.product.variants.length > 0) {
            if (data.product.variants[sVariant].optionsEnabled && data.product.variants[sVariant].options.length > 0) {
                cartImage = data.product.variants[sVariant].options[sOption].images[0];
                cartPrice = data.product.variants[sVariant].options[sOption].price;
                cartVariant = data.product.variants[sVariant].name;
                cartOption = data.product.variants[sVariant].options[sOption].name;
            } else {
                cartImage = data.product.variants[sVariant].images[0];
                cartPrice = data.product.variants[sVariant].price;
                cartVariant = data.product.variants[sVariant].name;
                cartOption = '';
            }
        } else {
            cartImage = data.product.images[0];
            cartPrice = data.product.price;
            cartVariant = '';
            cartOption = '';
        }

        cart.addItem({ 
            product: data.product._id,
            productData: data.product,
            image: cartImage,
            variant: sVariant,
            variantName: cartVariant,
            option: sOption,
            optionName: cartOption,
            name: data.product.name,
            quantity: 1,
            price: cartPrice,
            donationEnabled: data.product.donationEnabled,
            donationPrompt: data.product.donationPrompt
        });

        toastStore.trigger({
            message: 'Item Added to Cart'
        });

    }


</script>
<div class="grid grid-cols-1 md:grid-cols-2 p-8 gap-16 w-full">
    <div>
        <img src={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + sImage} alt={data.product.name} />
        <span class="flex flex-row gap-2 w-full flex-wrap py-4">
            {#each imageList as image}
                <button on:click={() => {sImage = image}}><img src={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + image} alt="preview" class="h-24 border border-transparent hover:border-white" /></button>
            {/each}
        </span>
    </div>
    <div class='flex flex-col gap-4'>
        <h1 class="text-6xl font-bold">{data.product.name}</h1>

        {#if !data.product.variantsEnabled || data.product.variants.length == 0}
            <b class="text-green-500 font-bold text-3xl">${(data.product.price).toFixed(2)}</b>
        {:else}
            {#if !data.product.variants[sVariant].optionsEnabled || data.product.variants[sVariant].options.length == 0}
                <b class="text-green-500 font-bold text-3xl">${(data.product.variants[sVariant].price).toFixed(2)}</b>
            {:else}
                <b class="text-green-500 font-bold text-3xl">${(data.product.variants[sVariant].options[sOption].price).toFixed(2)}</b>
            {/if}
        {/if}

        {#if !data.product.variantsEnabled || data.product.variants.length == 0}
            <b class='hidden'>No Other Options</b>
        {:else}
            {#if !data.product.variants[sVariant].optionsEnabled || data.product.variants[sVariant].options.length == 0}
                <label class='label'>
                    <span>{data.product.variantLabel}</span>
                    <select class='select' bind:value={sVariant}>
                        {#each data.product.variants as variant, v}
                        <option value={v}>{variant.name}</option>
                        {/each}
                    </select>
                </label>
            {:else}
                <label class='label'>
                    <span>{data.product.variantLabel}</span>
                    <select class='select' bind:value={sVariant}>
                        {#each data.product.variants as variant, v}
                        <option value={v}>{variant.name}</option>
                        {/each}
                    </select>
                </label>
                <label class='label'>
                    <span>{data.product.variants[sVariant].optionLabel}</span>
                    <select class='select' bind:value={sOption}>
                        {#each data.product.variants[sVariant].options as option, o}
                        <option value={o}>{option.name}</option>
                        {/each}
                    </select>
                </label>
            {/if}
        {/if}
        <button class="btn variant-filled-primary" on:click={addToCart} use:popup={cartPopup}>Add To Cart</button>

        <Markdown source={data.product.description} />

    </div>
</div>