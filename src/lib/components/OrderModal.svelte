<script>
    import axios from "axios";
    import ProductList from "./ProductList.svelte";
    import { Avatar } from "@skeletonlabs/skeleton";
    export let order;
    console.log(order);
</script>
<div class="card rounded-token w-modal p-8 flex flex-col gap-4 h-3/4 overflow-auto">
    <h2 class="text-xl font-bold">{order.shipping.address_to.name}</h2>
    <small>{order.shipping.address_to.street1}, {#if order.shipping.address_to.street2 != ""}{order.shipping.address_to.street2}, {/if} {order.shipping.address_to.city}, {order.shipping.address_to.state} {order.shipping.address_to.zip}</small>
    <small>{order.shipping.address_to.phone}</small>
    <small>{order.shipping.address_to.email}</small>
    <small>Donation Amount: <b>${order.donationAmount}</b></small>
    <b>Products Ordered:</b>
    <ProductList items={order.cart} />
    <b>Selected Shipping Method: </b>
    <div class='card variant-glass token-rounded p-4 flex flex-row gap-4'>
        <Avatar src={order.shippingMethod.provider_image_200} class='w-12 h-12 aspect-square object-contain' />
        <span class="flex flex-col gap-4">
            <p>{order.shippingMethod.provider} - {order.shippingMethod.servicelevel?.name}</p>
            <small>{order.shippingMethod.duration_terms}</small>
            <b class="text-green-500">${order.shippingMethod.amount}</b>
        </span>
    </div>
    <b>Shipping Parcels</b>
    {#each order.shipping.parcels as parcel}
    <div class='card p-4 flex flex-row'>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <label class="label">
                <span>Length</span>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input class="invalid:input-error" type="number" placeholder="Box Length" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={parcel.length} />
                    <div class="input-group-shim">inches</div>
                </div>
            </label>
            <label class="label">
                <span>Width</span>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input class="invalid:input-error" type="number" placeholder="Box Width" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={parcel.width} />
                    <div class="input-group-shim">inches</div>
                </div>
            </label>

            <label class="label">
                <span>Height</span>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input class="invalid:input-error" type="number" placeholder="Box Height" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={parcel.height} />
                    <div class="input-group-shim">inches</div>
                </div>
            </label>
            <label class="label">
                <span>Weight</span>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input class="invalid:input-error" type="number" placeholder="Box Weight" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={parcel.weight} />
                    <div class="input-group-shim">lbs</div>
                </div>
            </label>
        </div>
    </div>
    {/each}
    <!-- <button class="btn variant-filled-secondary" on:click={() => getShippingLabel(order.shippingMethod)}>Get Shipping Label</button> -->
</div>