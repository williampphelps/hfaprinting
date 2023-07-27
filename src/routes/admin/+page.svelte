<script>
    import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";

    import ImageModal from '$lib/components/ImageModal.svelte';
    import Markdown from "$lib/components/Markdown.svelte";
    import { Avatar, modalStore } from "@skeletonlabs/skeleton";
    import axios from "axios";

    export let data;

    const imageModal = {
        ref: ImageModal,
    }


    let newShop = {
        name: '',
        logo: '',
        description: '',
        admin: $page.data.session?.user.id,
        slug: ''
    }

    $: newShop.slug = slugify(newShop.name);

    function slugify(string) {
        console.log(string.replace(/ /g, '').toLowerCase())
        return string.replace(/ /g, '').toLowerCase()
    }

    async function createShop() {

        let result = await axios.post('/api/shops', newShop);
        invalidateAll();
    }
</script>
<svelte:head>
    <title>Admin | Higher Fine Arts</title>
</svelte:head>
<div class='p-8 flex flex-col gap-4'>
    
    <h1 class='font-bold text-4xl'>Admin Dashboard</h1>

    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/">Higher Fine Arts</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Admin Dashboard</li>
    </ol>

    {#if data.shopFound}

        <div class="card flex flex-row items-start gap-4 p-4">
            <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + data.shop.logo} />
            <span>
                <h2 class="text-3xl font-bold">{data.shop.name}</h2>
                <Markdown source={data.shop.description} />
            </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href='/admin/products'><div class="card p-4">
                <p>Manage Products</p>
            </div></a>
            <a href='/admin/orders'><div class="card p-4">
                <p>Manage Orders</p>
            </div></a>
            <a href='/admin/blog'><div class="card p-4">
                <p>Manage Blog</p>
            </div></a>
        </div>

    {:else}

        <h2 class='text-2xl font-semibold'>Set Up Your Shop</h2>
        <small>Please setup your shop to continue managing your products and orders.</small>

        <form class="py-4 flex flex-col gap-4" on:submit|preventDefault={createShop}>
            <label class='label'>
                <span>Shop Name</span>
                <input type='text' name='name' class='input' placeholder='Enter Shop Name Here...' bind:value={newShop.name} />
            </label>
            <label class='label'>
                <span>Shop Logo</span>
                {#if newShop.logo != ''}
                    <div class="flex">
                        <div class="relative">
                            <span class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100">
                                <button class="chip variant-filled-secondary material-icons" on:click={() => {newShop.logo = ''; modalStore.trigger({ type: 'component', component: imageModal, response: (r) => {if (r){newShop.logo = r[0];}} })}}>edit</button>
                            </span>
                            <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + newShop.logo} alt="preview" rounded="rounded" />
                        </div>
                    </div>
                {:else}
                    <Avatar initials="+" rounded="rounded" border="border-dashed border-2 border-surface-300-600-token hover:!border-success-700" cursor="cursor-pointer" on:click={() => modalStore.trigger({ type: 'component', component: imageModal, response: (r) => {if (r){newShop.logo = r[0];}} })} />
                {/if}
            </label>
            
            <label class='label'>
                <span>Shop Description</span>
                <textarea name='description' class='textarea' placeholder='Enter Shop Description Here...' bind:value={newShop.description}></textarea>
            </label>

            <div class="flex flex-row justify-between">
                <span></span>
                <input type='submit' class='btn variant-filled-primary cursor-pointer' value='Setup Shop' />
            </div>
        </form>
    {/if}
</div>