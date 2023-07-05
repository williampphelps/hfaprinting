<script>
    import { cart, userOrder } from '$lib/stores.js';
    import axios from 'axios';
    import { onMount } from 'svelte';
    export let data;

    $userOrder = {
        payment_intent: data.payment_intent,
        ...$userOrder
    }

    onMount(async () => {

        let result = await axios.post('/api/orders/', $userOrder);

        console.log(result.data);

        cart.reset();
        userOrder.set({ payment_intent: "" });

    })
</script>
<svelte:head>
    <title>Thanks | Higher Fine Arts</title>
</svelte:head>
<div class='p-8 text-center h-full flex flex-col gap-8 justify-center items-center'>
    <h1 class='text-3xl font-bold'>Thank You For Your Order!</h1>
    <p>When your order ships you will be charged and you will receive tracking information.</p>
    <a href="/shop"><button class="btn variant-filled-primary">Browse Shop</button></a>
</div>
