<script>
    import Hero from "$lib/components/Hero.svelte";
    import Masonry from "$lib/components/Masonry.svelte";
    export let data;

    let products = data.products;

</script>
<svelte:head>
    <title>Home | Higher Fine Arts</title>
</svelte:head>
<Hero height="auto" bg="https://ik.imagekit.io/szheqbces/tr:w-1500/6477e16e7f08e84fa467d0f7/2670c26d-1fd0-4401-a0b9-2341d52cf415">
    <h1 class="text-4xl font-bold">The Art of Elevation</h1>
    <p>Experience the Art of Elevation with our stunning artwork. We provide a selection of sunsets, landscapes, temples of The Church of Jesus Christ of Latter-Day Saints and more from the Cache Valley and surrounding areas.</p>
    <span class="flex flex-row"><a href="/shop"><button class="btn variant-filled-primary">Shop Now</button></a></span>
</Hero>  
<div class="p-4 flex flex-col gap-8">
    <Masonry data={products} let:columns={columns}>
        {#each columns as col}
            <div class="flex flex-col gap-4">
                {#each col as product}
                <a href={"/shop/" + product._id}><div class="relative rounded-token">
                    {#if product.images.length > 0}
                    <img src={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + product.images[0]} class="w-full rounded-token" alt={"image of " + product.name} />
                    {:else if product.variants[0].images.length > 0}
                    <img src={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + product.variants[0].images[0]} class="w-full rounded-token" alt={"image of " + product.name} />
                    {/if}
                    <div class="rounded-token absolute w-full h-full p-4 top-0 left-0 card variant-glass transition-all duration-500 cursor-pointer opacity-0 hover:opacity-100 flex flex-col gap-4 justify-between items-center">
                        <div class="flex flex-row w-full justify-between items-start">
                            <span>.</span>
                            <span>.</span>
                        </div>
                        <h3 class="text-xl font-bold text-center">{product.name}</h3>
                        <div class="flex flex-row w-full justify-between items-end">
                            <span></span>
                            <button class='btn variant-filled-primary'>See More</button>
                        </div>
                    </div>
                </div></a>
                {/each}
            </div>
        {/each}
    </Masonry>
</div>

