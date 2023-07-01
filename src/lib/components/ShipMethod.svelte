<script>
    import { Avatar, RadioGroup, RadioItem, modeCurrent } from '@skeletonlabs/skeleton';
    export let value;
    export let rates;
</script>
<RadioGroup display="grid grid-cols-1 md:grid-cols-2 gap-4" active="variant-ghost" hover="variant-soft hover:variant-ghost" background="none" border="none">
    <RadioItem name='rate' bind:group={value} value={ { object_id: 'pickup', amount: 0, servicelevel: { name: 'free pickup' } }}>
        <span class="flex flex-row gap-4 p-4 text-left items-center">
            <span class="flex flex-col gap-4 w-full">
                <span class="flex flex-row items-center gap-4 w-full">
                    <picture>
                        {#if $modeCurrent}
                        <source srcset='https://ik.imagekit.io/szheqbces/lightlogo.png' media='(prefers-color-scheme:dark)' />
                        <img src='https://ik.imagekit.io/szheqbces/lightlogo.png' alt="logo" class='h-12 object-contain' />
                        {:else}
                        <source srcset='https://ik.imagekit.io/szheqbces/darklogo.png' media='(prefers-color-scheme:dark)' />
                        <img src='https://ik.imagekit.io/szheqbces/darklogo.png' alt="logo" class='h-12 object-contain' />
                        {/if}
                    </picture>
                    <h3 class='font-bold text-2xl'>Free Pickup in Newton, Utah</h3>
                </span>
                <small>Ready for pickup in <b>1-2 days</b>. You will be notified when your order is ready for pickup. </small>
                <b class="text-green-100-800-token">Free</b>
            </span>
            <span class={(value.object_id == 'pickup' ? 'bg-primary-500-400-token' : '') + " rounded-full border-token border-primary-800-100-token text-center w-5 h-5 text-xs text-white material-icons"}>{#if value.object_id == 'pickup'}check{/if}</span>
        </span>
    </RadioItem>
    {#each rates as rate}
    <RadioItem name='rate' bind:group={value} value={rate}>
        <span class="flex flex-row gap-4 p-4 text-left items-center">
            <span class="flex flex-col gap-4 w-full">
                <span class="flex flex-row items-center gap-4 w-full">
                    <Avatar src={rate.provider_image_200} class='w-10 aspect-square' rounded='rounded-full' />
                    <h3 class='font-bold text-2xl'>{rate.provider} - {rate.servicelevel.name}</h3>
                </span>
                <small>{rate.duration_terms}</small>
                <b class="text-green-700">${rate.amount}</b>
            </span>
            <span class={(value.object_id == rate.object_id ? 'bg-primary-500-400-token' : '') + " rounded-full border-token border-primary-800-100-token text-center w-5 h-5 text-xs text-white material-icons"}>{#if value.object_id == rate.object_id}check{/if}</span>
        </span>
    </RadioItem>
    {/each}
</RadioGroup>