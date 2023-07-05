<script>
    import Masonry from "$lib/components/Masonry.svelte";

    export let data;
</script>
<svelte:head>
    <title>Manage Products | Higher Fine Arts</title>
</svelte:head>
<div class='p-8 flex flex-col gap-4'>
    
    <h1 class='font-bold text-4xl'>Manage Products</h1>
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/">Higher Fine Arts</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin">Admin Dashboard</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Manage Products</li>
    </ol>

    <Masonry data={data.products} let:columns={columns}>
        {#each columns as col, i}
            <div class="flex flex-col gap-4">
                {#if i == 0}
                <span><a href='/admin/products/create'><div class='card rounded-token variant-soft card-hover cursor-pointer p-4 flex flex-col gap-4 items-center justify-center'>
                    <h2 class='text-3xl'>Create New Product</h2>
                </div></a></span>
                {/if}
                {#each col as product}
                <span><a href={'/admin/products/edit/' + product._id}><div class='card rounded-token variant-soft card-hover cursor-pointer flex flex-col gap-4 items-center justify-center'>
                    <img src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + product.images[0]} alt={product.name} />
                    <div class="p-4">
                        <h2 class='text-3xl'>{product.name}</h2>
                    </div>
                </div></a></span>
                {/each}
            </div>
        {/each}
    </Masonry>
</div>