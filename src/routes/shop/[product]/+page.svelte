<script>
    import Markdown from '$lib/components/Markdown.svelte';
    import Preview3d from '$lib/components/Preview3d.svelte';
    import { cart } from '$lib/stores.js';
    import { popup } from '@skeletonlabs/skeleton';
    import { toastStore, modalStore } from '@skeletonlabs/skeleton';
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
            if (data.product.variants[variant].images.length > 0) {
                images = [...images, ...data.product.variants[variant].images]
            }
            if (data.product.variants[variant].optionsEnabled && data.product.variants[variant].options.length > 0 && data.product.variants[variant].options[option].images.length > 0) {
                images = [...images, ...data.product.variants[variant].options[option].images]
            }
        }

        return images;
    }

    $: imageList = listImages(sVariant, sOption);

    function addToCart() {

        let price = data.product.price;
        let box = data.product.box;

        if (data.product.variantsEnabled && data.product.variants.length > 0) {
            price = data.product.variants[sVariant].price;
            box = data.product.variants[sVariant].box;
            if (data.product.variants[sVariant].optionsEnabled && data.product.variants[sVariant].options.length > 0) {
                price = data.product.variants[sVariant].options[sOption].price;
                box = data.product.variants[sVariant].options[sOption].box;
            }
        }

        box.mass_unit = "lb";
        box.distance_unit = "in";

        cart.addItem({
            product: data.product._id,
            name: data.product.name,
            image: sImage,
            variant: sVariant,
            option: sOption,
            price: price,
            box: box,
            quantity: 1
        })

        toastStore.trigger({
            message: 'Item Added to Cart'
        });

    }


</script>
<svelte:head>
    <title>{data.product.name} | Higher Fine Arts</title>
    <meta name='description' content={(data.product.description).slice(0, 100) + "..."} />
    <meta property="og:title" content={data.product.name} />
    <meta property="og:image" content={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + sImage} />
    <meta property="og:description" content={(data.product.description).slice(0, 100) + "..."} />
</svelte:head>
<div class="grid grid-cols-1 md:grid-cols-2 p-8 gap-16 w-full">
    <div>
        <img src={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + sImage} alt={data.product.name} on:click={() => modalStore.trigger({ image: "https://ik.imagekit.io/szheqbces/tr:w-1500/" + sImage})} />
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
                    <select class='select' bind:value={sVariant} on:input={() => sOption = 0}>
                        {#each data.product.variants as variant, v}
                        <option value={v}>{variant.name}</option>
                        {/each}
                    </select>
                </label>
            {:else}
                <label class='label'>
                    <span>{data.product.variantLabel}</span>
                    <select class='select' bind:value={sVariant} on:input={() => {sOption = 0; console.log(sOption);}}>
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

<!-- <Preview3d source={sImage} /> -->