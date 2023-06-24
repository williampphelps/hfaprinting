<script>
    import { page } from '$app/stores';
    import { Step, Stepper, SlideToggle, modalStore, Avatar } from "@skeletonlabs/skeleton";
    import Markdown from '$lib/components/Markdown.svelte';

    let sVariant = 0;
    let sOption = 0;
    let sImage = 0;

    import ImageModal from '$lib/components/ImageModal.svelte';
    import axios from 'axios';
    import { goto } from '$app/navigation';

    const imageModal = {
        ref: ImageModal,
    }

    let newProduct = {
        name: "",
        description: "",
        price: 0.00,
        images: [],
        variants: [],
        variantLabel: "Size",
        variantsEnabled: false,
        donationEnabled: false,
        donationPrompt: "",
        box: {
            width: 0,
            height: 0,
            length: 0,
            weight: 0
        },
        "store": $page.data.session.user.id
    };

    async function handleSubmit() {
        newProduct.description = newProduct.description.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        let result = await axios.post('/api/products', newProduct);

        goto('/admin/products');
    }
</script>
<div class='p-8 flex flex-col gap-4'>
    
    <h1 class='font-bold text-4xl'>Create Product</h1>
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/">Higher Fine Arts</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin">Admin Dashboard</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin/products">Manage Products</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Create Product</li>
    </ol>

    <Stepper on:complete={handleSubmit}>
        <Step>
            <svelte:fragment slot="header">
                <h2 class='text-2xl'>Basic Info</h2>
            </svelte:fragment>

            <div class='p-4 flex flex-col gap-4'>
                <label class="label">
                    <span>Product Name</span>
                    <input class="input" type="text" placeholder="Product Name" bind:value={newProduct.name} />
                </label>
                <label class="label">
                    <span>Product Price</span>
                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <div class="input-group-shim">$</div>
                        <input class="invalid:input-error" type="number" placeholder="Product Price" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={newProduct.price} />
                    </div>
                </label>
                <label class="label">
                    <span>Product Description</span>
                    <textarea class="textarea rounded-token" rows="4" placeholder="Product Description Here..." bind:value={newProduct.description} />
                </label>
                <span class="label">
                    <span>Images</span>
                </span>
                <div class="flex flex-row flex-wrap gap-2">
                    {#each newProduct.images as image, i}
                        <div class="relative">
                            <span class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100">
                                <button class="chip variant-filled-error material-icons" on:click={() => {newProduct.images.splice(i, 1); newProduct.images = newProduct.images;}}>delete</button>
                            </span>
                            <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + image} alt="preview" rounded="rounded" />
                        </div>
                    {/each}
                    <Avatar initials="+" rounded="rounded" border="border-dashed border-2 border-surface-300-600-token hover:!border-success-700" cursor="cursor-pointer" on:click={() => modalStore.trigger({ type: 'component', component: imageModal, response: (r) => {if (r){newProduct.images = [...newProduct.images, ...r.filter(item => !newProduct.images.includes(item))];}} })} />
                </div>
            </div>
        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h2 class='text-2xl'>Enable Variants (optional)</h2>
            </svelte:fragment>
            <div class='flex flex-col gap-4 p-4'>
                <SlideToggle name="variants-enabled" active="bg-success-500" bind:checked={newProduct.variantsEnabled}>Variants {newProduct.variantsEnabled ? 'Enabled' : 'Disabled'}</SlideToggle>
                {#if newProduct.variantsEnabled}
                <label class="label">
                    <span>Variant Label</span>
                    <input class="input" type="text" placeholder="Variant Label" bind:value={newProduct.variantLabel} />
                </label>

                <h3 class="text-xl font-bold">{newProduct.variantLabel}s</h3>

                {#each newProduct.variants as variant, v}

                <div class='card p-4 flex flex-col gap-4'>
                    <label class="label">
                        <span>{newProduct.variantLabel} Name</span>
                        <input class="input" type="text" placeholder={newProduct.variantLabel + " Name"} bind:value={variant.name} />
                    </label>
                    <label class="label">
                        <span>{newProduct.variantLabel} Price</span>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                            <div class="input-group-shim">$</div>
                            <input class="invalid:input-error" type="number" placeholder="Product Price" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={variant.price} />
                        </div>
                    </label>

                    <span class="label">
                        <span>Images</span>
                    </span>

                    <div class="flex flex-row flex-wrap gap-2">
                        {#each variant.images as image, i}
                            <div class="relative">
                                <span class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100">
                                    <button class="chip variant-filled-error material-icons" on:click={() => {variant.images.splice(i, 1); variant.images = variant.images;}}>delete</button>
                                </span>
                                <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + image} alt="preview" rounded="rounded" />
                            </div>
                        {/each}
                        <Avatar initials="+" rounded="rounded" border="border-dashed border-2 border-surface-300-600-token hover:!border-success-700" cursor="cursor-pointer" on:click={() => modalStore.trigger({ type: 'component', component: imageModal, response: (r) => {if (r){variant.images = [...variant.images, ...r.filter(item => !variant.images.includes(item))];}} })} />
                    </div>
                
                    <SlideToggle name="{variant.name}-options-enabled" active="bg-success-500" bind:checked={variant.optionsEnabled}>{variant.name} Options {variant.optionsEnabled ? 'Enabled' : 'Disabled'}</SlideToggle>

                    {#if variant.optionsEnabled}
                        <label class="label">
                            <span>Option Label</span>
                            <input class="input" type="text" placeholder="Option Label" bind:value={variant.optionLabel} />
                        </label>

                        <h3 class="text-lg font-bold">{variant.optionLabel}s</h3>

                        {#each variant.options as option, o}

                        <div class='card variant-ghost p-4 flex flex-col gap-4'>
                            <label class="label">
                                <span>{variant.optionLabel} Name</span>
                                <input class="input" type="text" placeholder={variant.optionLabel + " Name"} bind:value={option.name} />
                            </label>
                            <label class="label">
                                <span>{variant.optionLabel} Price</span>
                                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                    <div class="input-group-shim">$</div>
                                    <input class="invalid:input-error" type="number" placeholder="Product Price" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={option.price} />
                                </div>
                            </label>

                            <span class="label">
                                <span>Images</span>
                            </span>
        
                            <div class="flex flex-row flex-wrap gap-2">
                                {#each option.images as image, i}
                                    <div class="relative">
                                        <span class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100">
                                            <button class="chip variant-filled-error material-icons" on:click={() => {option.images.splice(i, 1); option.images = option.images;}}>delete</button>
                                        </span>
                                        <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + image} alt="preview" rounded="rounded" />
                                    </div>
                                {/each}
                                <Avatar initials="+" rounded="rounded" border="border-dashed border-2 border-surface-300-600-token hover:!border-success-700" cursor="cursor-pointer" on:click={() => modalStore.trigger({ type: 'component', component: imageModal, response: (r) => {if (r){option.images = [...option.images, ...r.filter(item => !option.images.includes(item))];}} })} />
                            </div>
                            <button class="btn variant-filled-error w-fit" on:click={() => {variant.options.splice(o, 1); variant.options = variant.options;}}>Delete Option</button>
                        </div>
                        {/each}
                        <button class="btn variant-filled-secondary w-fit" on:click={() => variant.options = [...variant.options, { name: '', price: 0.00, images: [], box: { width: 0, length: 0, height: 0, weight: 0}}]}>Add {variant.optionLabel}</button>
                    {/if}
                    <button class="btn variant-filled-error w-fit" on:click={() => {newProduct.variants.splice(v, 1); newProduct.variants = newProduct.variants;}}>Delete Variant</button>
                </div>
                {/each}

                <button class="btn w-fit variant-filled-secondary" on:click={() => newProduct.variants = [...newProduct.variants, { name: '', price: 0.00, images: [], optionsEnabled: false, options: [], optionLabel: 'Option', box: { width: 0, length: 0, height: 0, weight: 0}}]}>Add {newProduct.variantLabel}</button>

                {/if}
            </div>
            
        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h2 class='text-2xl'>Shipping Box(es)</h2>
            </svelte:fragment>

            {#if !newProduct.variantsEnabled || newProduct.variants.length == 0}
            <div class='card variant-ghost p-4 flex flex-col gap-4'>
                <b>{newProduct.name}</b>
                <label class="label">
                    <span>Length</span>
                    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                        <input class="invalid:input-error" type="number" placeholder="Box Length" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={newProduct.box.length} />
                        <div class="input-group-shim">inches</div>
                    </div>
                </label>
                <label class="label">
                    <span>Width</span>
                    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                        <input class="invalid:input-error" type="number" placeholder="Box Width" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={newProduct.box.width} />
                        <div class="input-group-shim">inches</div>
                    </div>
                </label>
                <label class="label">
                    <span>Height</span>
                    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                        <input class="invalid:input-error" type="number" placeholder="Box Height" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={newProduct.box.height} />
                        <div class="input-group-shim">inches</div>
                    </div>
                </label>
                <label class="label">
                    <span>Weight</span>
                    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                        <input class="invalid:input-error" type="number" placeholder="Box Height" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={newProduct.box.weight} />
                        <div class="input-group-shim">lbs</div>
                    </div>
                </label>
            </div>
            {:else}
                {#each newProduct.variants as variant}
                    {#if !variant.optionsEnabled || variant.options.length == 0}
                    <div class='card variant-ghost p-4 flex flex-col gap-4'>
                        <b>{newProduct.name} - {variant.name}</b>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <label class="label">
                                <span>Length</span>
                                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                    <input class="invalid:input-error" type="number" placeholder="Box Length" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={variant.box.length} />
                                    <div class="input-group-shim">inches</div>
                                </div>
                            </label>
                            <label class="label">
                                <span>Width</span>
                                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                    <input class="invalid:input-error" type="number" placeholder="Box Width" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={variant.box.width} />
                                    <div class="input-group-shim">inches</div>
                                </div>
                            </label>

                            <label class="label">
                                <span>Height</span>
                                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                    <input class="invalid:input-error" type="number" placeholder="Box Height" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={variant.box.height} />
                                    <div class="input-group-shim">inches</div>
                                </div>
                            </label>
                            <label class="label">
                                <span>Weight</span>
                                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                    <input class="invalid:input-error" type="number" placeholder="Box Weight" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={variant.box.weight} />
                                    <div class="input-group-shim">lbs</div>
                                </div>
                            </label>
                        </div>
                        
                        
                    </div>
                    {:else}
                    {#each variant.options as option}
                    <div class='card variant-ghost p-4 flex flex-col gap-4'>
                        <b>{newProduct.name} - {variant.name} - {option.name}</b>
                        <label class="label">
                            <span>Length</span>
                            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                <input class="invalid:input-error" type="number" placeholder="Box Length" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={option.box.length} />
                                <div class="input-group-shim">inches</div>
                            </div>
                        </label>
                        <label class="label">
                            <span>Width</span>
                            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                <input class="invalid:input-error" type="number" placeholder="Box Width" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={option.box.width} />
                                <div class="input-group-shim">inches</div>
                            </div>
                        </label>
                        <label class="label">
                            <span>Height</span>
                            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                <input class="invalid:input-error" type="number" placeholder="Box Height" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={option.box.height} />
                                <div class="input-group-shim">inches</div>
                            </div>
                        </label>
                        <label class="label">
                            <span>Weight</span>
                            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                                <input class="invalid:input-error" type="number" placeholder="Box Height" min="0" step="0.01" inputmode="numeric" pattern="[0-9]+(\\.[0-9][0-9]?)?" bind:value={option.box.weight} />
                                <div class="input-group-shim">lbs</div>
                            </div>
                        </label>
                    </div>
                    {/each}
                    {/if}
                {/each}
            {/if}

        </Step>
        <Step>
            <svelte:fragment slot="header">
                <h2 class='text-2xl'>Preview</h2>
            </svelte:fragment>

            <div class="card grid grid-cols-1 md:grid-cols-2 p-8 gap-16 w-full">
                <div>
                    {#if newProduct.variantsEnabled && newProduct.variants.length > 0}
                        {#if newProduct.variants[sVariant].optionsEnabled}
                            <img src={"https://ik.imagekit.io/szheqbces/" + newProduct.variants[sVariant].options[sOption].images[sImage]} alt={newProduct.name} />
                            <span class="flex flex-row gap-2 w-full flex-wrap py-4">
                                {#each newProduct.variants[sVariant].options[sOption].images as image, i}
                                <button on:click={() => {sImage = i}}><img src={"https://ik.imagekit.io/szheqbces/" + newProduct.variants[sVariant].options[sOption].images[i]} alt="preview" class="h-24 border border-transparent hover:border-white" /></button>
                                {/each}
                            </span>
                        {:else}
                            <img src={"https://ik.imagekit.io/szheqbces/" + newProduct.variants[sVariant].images[sImage]} alt={newProduct.name} />
                            <span class="flex flex-row gap-2 w-full flex-wrap py-4">
                                {#each newProduct.variants[sVariant].images as image, i}
                                <button on:click={() => {sImage = i}}><img src={"https://ik.imagekit.io/szheqbces/" + newProduct.variants[sVariant].images[i]} alt="preview" class="h-24 border border-transparent hover:border-white" /></button>
                                {/each}
                            </span>
                        {/if}
                    {:else}
                    <img src={"https://ik.imagekit.io/szheqbces/" + newProduct.images[sImage]} alt={newProduct.name} />
                    <span class="flex flex-row gap-2 w-full flex-wrap py-4">
                        {#each newProduct.images as image, i}
                        <button on:click={() => {sImage = i}}><img src={"https://ik.imagekit.io/szheqbces/" + newProduct.images[i]} alt="preview" class="h-24 border border-transparent hover:border-white" /></button>
                        {/each}
                    </span>
                    {/if}
                </div>
                <div class='flex flex-col gap-4'>
                    <h1 class="text-6xl font-bold">{newProduct.name}</h1>

                    {#if !newProduct.variantsEnabled || newProduct.variants.length == 0}
                        <b class="text-green-500 font-bold text-3xl">${(newProduct.price).toFixed(2)}</b>
                    {:else}
                        {#if !newProduct.variants[sVariant].optionsEnabled || newProduct.variants[sVariant].options.length == 0}
                            <b class="text-green-500 font-bold text-3xl">${(newProduct.variants[sVariant].price).toFixed(2)}</b>
                        {:else}
                            <b class="text-green-500 font-bold text-3xl">${(newProduct.variants[sVariant].options[sOption].price).toFixed(2)}</b>
                        {/if}
                    {/if}

                    {#if !newProduct.variantsEnabled || newProduct.variants.length == 0}
                        <b class='hidden'>No Other Options</b>
                    {:else}
                        {#if !newProduct.variants[sVariant].optionsEnabled || newProduct.variants[sVariant].options.length == 0}
                            <label class='label'>
                                <span>{newProduct.variantLabel}</span>
                                <select class='select' bind:value={sVariant}>
                                    {#each newProduct.variants as variant, v}
                                    <option value={v}>{variant.name}</option>
                                    {/each}
                                </select>
                            </label>
                        {:else}
                            <label class='label'>
                                <span>{newProduct.variantLabel}</span>
                                <select class='select' bind:value={sVariant}>
                                    {#each newProduct.variants as variant, v}
                                    <option value={v}>{variant.name}</option>
                                    {/each}
                                </select>
                            </label>
                            <label class='label'>
                                <span>{newProduct.variants[sVariant].optionLabel}</span>
                                <select class='select' bind:value={sOption}>
                                    {#each newProduct.variants[sVariant].options as option, o}
                                    <option value={o}>{option.name}</option>
                                    {/each}
                                </select>
                            </label>
                        {/if}
                    {/if}

                    <Markdown source={newProduct.description} />

                </div>
            </div>

        </Step>
    </Stepper>
</div>