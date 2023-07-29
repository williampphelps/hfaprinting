<script>
    import { Stepper, Step, toastStore, modeCurrent } from '@skeletonlabs/skeleton';
    import ShipMethod from '$lib/components/ShipMethod.svelte';
    import { cart, userAddress, userOrder } from '$lib/stores';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { PUBLIC_STRIPE_KEY, PUBLIC_DOMAIN } from '$env/static/public';
    import CartList from '$lib/components/CartList.svelte';

    let donation = 0;

    let clientSecret;
    let stripe;
    let elements;
    let emailAddress = 'williampaul@phelpsfamily.org';
    let addressValid = false;
    let chosen = { object_id: 'pickup', amount: 0, servicelevel: { name: 'free pickup' }, provider: 'Free Pickup', duration_terms: 'Customer will be notified when order has been "shipped". ' };

    onMount(() => {
        addressValid = validateAddress($userAddress);
    });

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

    async function getRates() {

        let parcels = [];

        for (const item of $cart) {
            for (let i = 0; i < item.quantity; i++) {
                parcels = [item.box, ...parcels]
            }
        }

        shippingCart.parcels = parcels;

        let result = await axios.post('/api/shipping/rates', shippingCart);

        return result.data.rates.filter(rate => rate.attributes.includes("CHEAPEST") || rate.attributes.includes("BESTVALUE") || rate.attributes.includes("FASTEST")).sort((a, b) => a.amount - b.amount);
    }

    function onStepHandler(e) {
        if (e.detail.state.current == 2) {
            shipmentRates = getRates();
        }
        if (e.detail.state.current == 3) {
            setTimeout(initPaymentForm, 500);
        }
    }

    let shipmentRates = new Promise(() => {});

    async function initPaymentForm() {
        stripe = Stripe(PUBLIC_STRIPE_KEY);
        let appearance = {
            theme: 'night'
        }
        if ($modeCurrent) {
            appearance.theme = 'stripe';
        }
        let result = await axios.post('/api/checkout/', { cart: $cart, shipping: chosen, donation: donation });
        clientSecret = result.data.clientSecret;
        elements = stripe.elements({ clientSecret });
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');
    }

    async function validateAddress(address) {
        address.validate = true;
        let results = await axios.post('/api/shipping/validate_address', address);

        console.log(results.data.validation_results.is_valid);

        return results.data.validation_results.is_valid;
    }

    async function placeOrder() {

        $userOrder = {
            shipping: shippingCart,
            cart: $cart,
            donationAmount: donation,
            shippingMethod: chosen,
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: PUBLIC_DOMAIN + "/checkout/thanks",
                receipt_email: emailAddress,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            toastStore.trigger({
                message: error.message,
                background: 'variant-filled-error'
            })
        } else {
            toastStore.trigger({
                message: 'An Unexpected Error Occured!',
                background: 'variant-filled-error'
            })
        }

    }

    function validateDonationCart(carts, donation) {
        console.log({carts, donation})
        if (donation >= 0 && carts >= 1) {
            return false;
        } else {
            return true;
        }
    }

    $: cartSum = cart.sum;

    $: total = (($cartSum + donation) + (Number(chosen.amount))).toFixed(2);
    $: stepOneLocked = validateDonationCart($cart.length, donation)
</script>

<svelte:head>
    <title>Checkout | Higher Fine Arts</title>
    <script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<div class="p-12">
    <Stepper on:step={onStepHandler} on:complete={placeOrder} buttonNext="variant-filled-secondary bg-secondary-500" buttonComplete="variant-filled-primary bg-primary-500" buttonCompleteLabel="Place Order" class='h-full'>
        <Step locked={stepOneLocked}>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Review Cart: </h1>
            </svelte:fragment>
            <div class="flex flex-col gap-2 w-full">        
                <CartList />
            </div>
            <div class="py-8 flex flex-col gap-4">
                <h2 class="text-xl font-bold">Consider Donating</h2>
                <p>Please support our artists by adding an optional donation.</p>
                <label class='label'>
                    <span>Donation Amount</span>
                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <div class="input-group-shim">$</div>
                        <input class="invalid:input-error" type="number" placeholder="Donation Amount" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={donation} />
                    </div>
                </label>
            </div>
            <div class="flex flex-col items-end">
                <span class="text-2xl font-bold">Total:</span>
                <b class="text-green-500 text-xl">${total}</b>
            </div>
            
        </Step>
        <Step locked={!addressValid}>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Enter Your Shipping Address:</h1>
            </svelte:fragment>
            <form class="flex flex-col gap-4">
                <label class="label">
                    <span>Full Name</span>
                    <input class="input" type="text" placeholder="John Doe..." bind:value={$userAddress.name} />
                </label>
                <label class="label">
                    <span>Email Address</span>
                    <input class="input" type="email" placeholder="john.doe@gmail.com..." bind:value={$userAddress.email} />
                </label>
                <label class="label">
                    <span>Phone Number</span>
                    <input class="input" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="(123)456-7890" bind:value={$userAddress.phone} />
                </label>
                <label class="label">
                    <span>Address Line 1</span>
                    <input class="input" type="text" placeholder="123 N Main St" bind:value={$userAddress.street1} on:input={async () => addressValid = await validateAddress($userAddress)} />
                </label>
                <label class="label">
                    <span>Address Line 2</span>
                    <input class="input" type="text" placeholder="Apt. 1" bind:value={$userAddress.street2} on:input={async () => addressValid = await validateAddress($userAddress)} />
                </label>
                <label class="label w-full">
                    <span>City</span>
                    <input class="input" type="text" placeholder="City" bind:value={$userAddress.city} on:input={async () => addressValid = await validateAddress($userAddress)} />
                </label>
                <span class="flex flex-col sm:flex-row gap-4">
                    <label class="label w-full">
                        <span>State</span>
                        <select class="select rounded-token" bind:value={$userAddress.state} on:input={async () => addressValid = await validateAddress($userAddress)}>
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
                        <input class="input" type="text" placeholder="12345" bind:value={$userAddress.zip} on:input={async () => addressValid = await validateAddress($userAddress)} />
                    </label>
                </span>
            </form>
            <div class="flex flex-col items-end">
                <span class="text-2xl font-bold">Total:</span>
                <b class="text-green-500 text-xl">${total}</b>
            </div>
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
                <p>There seems to be an error with getting the available shipping methods. Try going back and making sure your address is correct.</p>
                {/await}
                <div class="flex flex-col items-end">
                    <span class="text-2xl font-bold">Total:</span>
                    <b class="text-green-500 text-xl">${total}</b>
                </div>
            </div>
        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h1 class="text-3xl font-bold">Payment Details:</h1>
            </svelte:fragment>
            <div id="payment-element"></div>
            <div class="flex flex-col items-end">
                <span class="text-2xl font-bold">Total:</span>
                <b class="text-green-500 text-xl">${total}</b>
            </div>
        </Step>
    </Stepper>
</div>

<!-- 
    <div class="p-12 flex flex-col gap-4">
        <h1 class="text-3xl font-bold">Choose A Shipping Method:</h1>
        <ShipMethod rates={data} bind:value={chosen} />
    </div>
     -->