<script>
    import { Stepper, Step, toastStore } from '@skeletonlabs/skeleton';
    import ShipMethod from '$lib/components/ShipMethod.svelte';
    import { cart, userAddress } from '$lib/stores';
    import axios from 'axios';
    let chosen;

    let shippingCart = {
        address_from: {
            "name": "Higher Fine Arts - William Phelps",
            "street1": "92 South 100 East",
            "city": "Newton",
            "state": "UT",
            "zip": "84327",
            "country": "US"
        },
        address_to: $userAddress,
        parcels: [{
            "length": "20",
            "width": "24",
            "height": "1.5",
            "distance_unit": "in",
            "weight": "20",
            "mass_unit": "lb"
        }]
    }

    let order = {
        donation: 0
    }

    async function getRates() {

        let parcels = [];

        for (const item of $cart) {
            if (item.productData.variantsEnabled && item.productData.variants.length > 0) {
                if (item.productData.variants[item.variant].optionsEnabled && item.productData.variants[item.variant].options.length > 0) {
                    for (let i = 0; i < item.quantity; i++) {
                        parcels = [{
                            "length": item.productData.variants[item.variant].options[item.option].box.length,
                            "width": item.productData.variants[item.variant].options[item.option].box.width,
                            "height": item.productData.variants[item.variant].options[item.option].box.height,
                            "distance_unit": "in",
                            "weight": item.productData.variants[item.variant].options[item.option].box.weight,
                            "mass_unit": "lb"
                        }, ...parcels]
                    }
                } else {
                    for (let i = 0; i < item.quantity; i++) {
                        parcels = [{
                            "length": item.productData.variants[item.variant].box.length,
                            "width": item.productData.variants[item.variant].box.width,
                            "height": item.productData.variants[item.variant].box.height,
                            "distance_unit": "in",
                            "weight": item.productData.variants[item.variant].box.weight,
                            "mass_unit": "lb"
                        }, ...parcels]
                    }
                }
            } else {
                for (let i = 0; i < item.quantity; i++) {
                    parcels = [{
                        "length": item.productData.box.length,
                        "width": item.productData.box.width,
                        "height": item.productData.box.height,
                        "distance_unit": "in",
                        "weight": item.productData.box.weight,
                        "mass_unit": "lb"
                    }, ...parcels]
                }
            }
        }

        shippingCart.parcels = parcels;

        console.log({shippingCart})

        let result = await axios.post('/api/shipping/rates', shippingCart);

        return result.data.rates.filter(rate => rate.attributes.includes("CHEAPEST") || rate.attributes.includes("BESTVALUE") || rate.attributes.includes("FASTEST")).sort((a, b) => a.amount - b.amount);
    }

    function onStepHandler(e) {
        if (e.detail.state.current == 2) {
            shipmentRates = getRates();
        }
    }

    let shipmentRates = new Promise(() => {});
</script>


<div class="p-12">
    <Stepper on:step={onStepHandler} class='h-full'>
        <Step>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Review Cart: </h1>
            </svelte:fragment>
            <div class="flex flex-col gap-2 w-full">        
                {#each $cart as cartItem}
                    <div class="p-4 card flex flex-row gap-4 w-full justify-stretch">
                        <img class="w-12 h-12 rounded object-cover" src={"https://ik.imagekit.io/szheqbces/" + cartItem.image} alt={cartItem.name} />
                        <span class="flex flex-col gap-2 w-full">
                            <a href={"/shop/" + cartItem.product}><p class="font-bold">{cartItem.productData.name}</p></a>
                            <small>${(cartItem.price*cartItem.quantity).toFixed(2)}</small>
                            <small>{#if cartItem.variantName != ""}{cartItem.variantName} - {#if cartItem.optionName != ""}{cartItem.optionName}{/if}{/if}</small>
                            <small>Quantity: {cartItem.quantity}</small>
                            <button class='chip variant-filled-error text-xs w-fit' on:click={() => {cart.removeItem(cartItem)}}><span class="material-icons">delete</span> Remove From Cart</button>
                        </span>
                    </div>
                {/each}
            </div>
            <div class="py-8 flex flex-col gap-4">
                <h2 class="text-xl font-bold">Consider Donating</h2>
                <p>Please support our artists by adding an optional donation.</p>
                <label class='label'>
                    <span>Donation Amount</span>
                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <div class="input-group-shim">$</div>
                        <input class="invalid:input-error" type="number" placeholder="Donation Amount" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={order.donation} />
                    </div>
                </label>
            </div>
        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Enter Your Shipping Address:</h1>
            </svelte:fragment>
            <form class="flex flex-col gap-4">
                <label class="label">
                    <span>Full Name</span>
                    <input class="input" type="text" placeholder="John Doe..." bind:value={$userAddress.name} />
                </label>
                <label class="label">
                    <span>Address Line 1</span>
                    <input class="input" type="text" placeholder="123 N Main St" bind:value={$userAddress.street1} />
                </label>
                <label class="label">
                    <span>Address Line 2</span>
                    <input class="input" type="text" placeholder="Apt. 1" bind:value={$userAddress.street2} />
                </label>
                <label class="label w-full">
                    <span>City</span>
                    <input class="input" type="text" placeholder="City" bind:value={$userAddress.city} />
                </label>
                <span class="flex flex-col sm:flex-row gap-4">
                    <label class="label w-full">
                        <span>State</span>
                        <select class="select rounded-token" bind:value={$userAddress.state}>
                            <option value='' disabled>Select a state...</option>
                            <option value='AL'>Alabama</option>
                            <option value='AK'>Alaska</option>
                            <option value='AZ'>Arizona</option>
                            <option value='AR'>Arkansas</option>
                            <option value='CA'>California</option>
                            <option value='CO'>Colorado</option>
                            <option value='CT'>Connecticut</option>
                            <option value='DE'>Delaware</option>
                            <option value='DC'>District Of Columbia</option>
                            <option value='FL'>Florida</option>
                            <option value='GA'>Georgia</option>
                            <option value='HI'>Hawaii</option>
                            <option value='ID'>Idaho</option>
                            <option value='IL'>Illinois</option>
                            <option value='IN'>Indiana</option>
                            <option value='IA'>Iowa</option>
                            <option value='KS'>Kansas</option>
                            <option value='KY'>Kentucky</option>
                            <option value='LA'>Louisiana</option>
                            <option value='ME'>Maine</option>
                            <option value='MD'>Maryland</option>
                            <option value='MA'>Massachusetts</option>
                            <option value='MI'>Michigan</option>
                            <option value='MN'>Minnesota</option>
                            <option value='MS'>Mississippi</option>
                            <option value='MO'>Missouri</option>
                            <option value='MT'>Montana</option>
                            <option value='NE'>Nebraska</option>
                            <option value='NV'>Nevada</option>
                            <option value='NH'>New Hampshire</option>
                            <option value='NJ'>New Jersey</option>
                            <option value='NM'>New Mexico</option>
                            <option value='NY'>New York</option>
                            <option value='NC'>North Carolina</option>
                            <option value='ND'>North Dakota</option>
                            <option value='OH'>Ohio</option>
                            <option value='OK'>Oklahoma</option>
                            <option value='OR'>Oregon</option>
                            <option value='PA'>Pennsylvania</option>
                            <option value='RI'>Rhode Island</option>
                            <option value='SC'>South Carolina</option>
                            <option value='SD'>South Dakota</option>
                            <option value='TN'>Tennessee</option>
                            <option value='TX'>Texas</option>
                            <option value='UT'>Utah</option>
                            <option value='VT'>Vermont</option>
                            <option value='VA'>Virginia</option>
                            <option value='WA'>Washington</option>
                            <option value='WV'>West Virginia</option>
                            <option value='WI'>Wisconsin</option>
                            <option value='WY'>Wyoming</option>
                        </select>
                    </label>
                    <label class="label w-full">
                        <span>Zip Code</span>
                        <input class="input" type="text" placeholder="12345" bind:value={$userAddress.zip} />
                    </label>
                </span>
            </form>
        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Choose A Shipping Method:</h1>
                <small>Estimated Delivery Time is reflects the amount of time after product has been created and handed off to the delivery service.</small>
            </svelte:fragment>
            <div>
                {#await shipmentRates}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span class="bg-surface-100-800-token flex flex-row gap-4 p-4 text-left items-center">
                            <span class="flex flex-col gap-4 w-full">
                                <span class="flex flex-row items-center gap-4 w-full">
                                    <span class="placeholder-circle animate-pulse w-10"></span>
                                    <div class="placeholder animate-pulse w-full h-6"></div>
                                </span>
                                <div class="placeholder animate-pulse w-full h-10"></div>
                                <div class="placeholder animate-pulse w-full"></div>
                            </span>
                            <span class={"placeholder animate-pulse rounded-full border-token border-primary-800-100-token text-center w-5 h-5 text-xs text-white material-icons"}></span>
                        </span>
                    </div>
                    <div>
                        <span class="bg-surface-100-800-token flex flex-row gap-4 p-4 text-left items-center">
                            <span class="flex flex-col gap-4 w-full">
                                <span class="flex flex-row items-center gap-4 w-full">
                                    <span class="placeholder-circle animate-pulse w-10"></span>
                                    <div class="placeholder animate-pulse w-full h-6"></div>
                                </span>
                                <div class="placeholder animate-pulse w-full h-10"></div>
                                <div class="placeholder animate-pulse w-full"></div>
                            </span>
                            <span class={"placeholder animate-pulse rounded-full border-token border-primary-800-100-token text-center w-5 h-5 text-xs text-white material-icons"}></span>
                        </span>
                    </div>
                </div>
                {:then data}
                <ShipMethod rates={data} bind:value={chosen} />
                {:catch error}
                <p>{error}</p>
                {/await}
            </div>
        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Payment Details:</h1>
            </svelte:fragment>
        </Step>
    </Stepper>
</div>

<!-- 
    <div class="p-12 flex flex-col gap-4">
        <h1 class="text-3xl font-bold">Choose A Shipping Method:</h1>
        <ShipMethod rates={data} bind:value={chosen} />
    </div>
     -->