<script>
    import Masonry from "$lib/components/Masonry.svelte";
    import ProductList from "$lib/components/ProductList.svelte";
    import { Avatar } from "@skeletonlabs/skeleton";

    export let data;
    let orders = data.orders;
</script>

<div class='p-8 flex flex-col gap-4'>
    
    <h1 class='font-bold text-4xl'>Manage Orders</h1>
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/">Higher Fine Arts</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin">Admin Dashboard</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Manage Orders</li>
    </ol>
    <Masonry data={orders} let:columns={columns}>
        {#each columns as col}
        <div class="flex flex-col gap-4">
            {#each col as order}
            <div class="card p-4 flex flex-col gap-4">
                <h2 class="text-xl font-bold">{order.shipping.address_to.name}</h2>
                <small>{order.shipping.address_to.street1}, {#if order.shipping.address_to.street2 != ""}, {order.shipping.address_to.street2}{/if} {order.shipping.address_to.city}, {order.shipping.address_to.state} {order.shipping.address_to.zip}</small>
                <small>Donation Amount: <b>${order.donationAmount}</b></small>
                <b>Products Ordered:</b>
                <ProductList items={order.cart} />
                <b>Selected Shipping Method: </b>
                <div class='card token-rounded p-4 flex flex-row gap-4'>
                    <Avatar src={order.shippingMethod.provider_image_200} class='w-12 h-12 aspect-square object-contain' />
                    <span class="flex flex-col gap-4">
                        <p>{order.shippingMethod.provider} - {order.shippingMethod.servicelevel.name}</p>
                        <small>{order.shippingMethod.duration_terms}</small>
                        <b class="text-green-500">${order.shippingMethod.amount}</b>
                    </span>
                </div>
            </div>
            {/each}
        </div>
        {/each}
    </Masonry>
</div>