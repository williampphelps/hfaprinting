<script lang='ts'>
    import { LightSwitch, modeCurrent } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { cart, cartDropdownOpen } from '$lib/stores';
    let open = false;
    let navbarLinksClass = 'w-full hidden sm:flex flex-row items-stretch justify-end sm:items-center px-8';

    const cartPopup: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'cartPopup',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
        closeQuery: 'a[href]'
    };

    const toggleLinks = () => {
        open = !open;
        if (open) {
            navbarLinksClass="w-full flex flex-col sm:flex-row items-stretch justify-end sm:items-center px-8 py-8 sm:py-0"
        } else {
            navbarLinksClass="w-full hidden sm:flex flex-row items-stretch justify-end sm:items-center px-8"
        }
    }

</script>
<nav class="flex sm:flex-row flex-col">
    <div class="flex flex-row justify-between items-center w-full">
        <a href="/" class="px-6 py-2 flex flex-row gap-4 items-center font-bold text-lg">
            <picture>
                {#if $modeCurrent}
                <source srcset='https://ik.imagekit.io/szheqbces/lightlogo.png' media='(prefers-color-scheme:dark)' />
                <img src='https://ik.imagekit.io/szheqbces/lightlogo.png' alt="logo" class='h-12' />
                {:else}
                <source srcset='https://ik.imagekit.io/szheqbces/darklogo.png' media='(prefers-color-scheme:dark)' />
                <img src='https://ik.imagekit.io/szheqbces/darklogo.png' alt="logo" class='h-12' />
                {/if}
            </picture>
            Higher Fine Arts
        </a>
        <button class="material-icons py-6 px-4 hover:font-bold cursor-pointer block sm:hidden" on:click={toggleLinks}>menu</button>
    </div>
    <div class={(open ? "flex flex-col sm:flex-row " : "hidden sm:flex sm:flex-row ") + "py-4 gap-x-4 gap-y-2 sm:items-center sm:mr-4"}>
        <a href="/" class='btn variant-soft-surface w-full'>Home</a>
        <a href="/blog" class='btn variant-soft-surface w-full'>Blog</a>
        <a href="/shop" class='btn variant-soft-surface w-full'>Shop</a>
            <button class="btn variant-soft" use:popup={cartPopup}>
                <span class='material-icons'>shopping_cart</span>
            </button>
            <div class="card token-rounded w-72 shadow-xl z-50" data-popup="cartPopup">
                <div>
                    {#if $cart.length == 0}
                    <div class="p-4 w-full"><p>Your Cart is Empty :(</p></div>
                    <div class="card flex flex-row items-end justify-end p-4">
                        <a href="/shop">Continue Shopping -></a>
                    </div>
                    {:else}
                    <div class="flex flex-col max-h-64 overflow-auto w-full">
                        
                        {#each $cart as cartItem}
                                <div class="p-4 card flex flex-row gap-4 w-full justify-stretch">
                                    <img class="w-12 h-12 rounded object-cover" src={"https://ik.imagekit.io/szheqbces/" + cartItem.image} alt={cartItem.name} />
                                    <span class="flex flex-col gap-2">
                                        <a href={"/shop/" + cartItem.product}><p class="font-bold">{cartItem.productData.name}</p></a>
                                        <small>${(cartItem.price*cartItem.quantity).toFixed(2)}</small>
                                        <small>{#if cartItem.variantName != ""}{cartItem.variantName} - {#if cartItem.optionName != ""}{cartItem.optionName}{/if}{/if}</small>
                                        <small>Quantity: {cartItem.quantity}</small>
                                        <button class='chip variant-filled-error text-xs' on:click={() => {cart.removeItem(cartItem)}}><span class="material-icons">delete</span> Remove From Cart</button>
                                    </span>
                                </div>
                            {/each}
                        </div>
                        <div class="card flex flex-row items-end justify-end p-4">
                            <a href="/checkout/shipping/">Continue To Checkout -></a>
                        </div>
                    {/if}
                </div>
                
                <div class="arrow bg-surface-100-800-token" />
            </div>

        <span class="p-4 md:p-0 flex flex-row items-center">
            <LightSwitch />
        </span>
    </div>
</nav>