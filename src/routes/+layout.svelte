<script>
    import { page } from '$app/stores';
    import '../theme.postcss';
    // import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import "../app.css";


    import { AppShell, Toast } from '@skeletonlabs/skeleton';
    import { autoModeWatcher } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { Modal } from '@skeletonlabs/skeleton';

    import { signOut } from '@auth/sveltekit/client';

    import { storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    import Navbar from '$lib/components/Navbar.svelte';

</script>
<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
<Modal />
<AppShell>
    <svelte:fragment slot="header">
        <Navbar />
        <!--
		<AppBar background="variant-soft-surface" gridColumns="grid-cols-1">
            <span class="flex flex-col sm:flex-row">
                <span class="flex flex-row w-full gap-4 items-center justify-between">
                    <span class="flex flex-row gap-4 items-center">
                        <picture>
                            {#if $modeCurrent}
                            <source srcset='https://ik.imagekit.io/szheqbces/lightlogo.png' media='(prefers-color-scheme:dark)' />
                            <img src='https://ik.imagekit.io/szheqbces/lightlogo.png' alt="logo" class='h-12' />
                            {:else}
                            <source srcset='https://ik.imagekit.io/szheqbces/darklogo.png' media='(prefers-color-scheme:dark)' />
                            <img src='https://ik.imagekit.io/szheqbces/darklogo.png' alt="logo" class='h-12' />
                            {/if}
                          </picture>
                        <a href="/" class="font-bold">Higher Fine Arts</a>
                    </span>
                    <button class="material-icons block sm:hidden" on:click={() => open = !open}>menu</button>
                </span>
                <span class={(open ? "flex flex-col sm:flex-row " : "hidden sm:flex sm:flex-row ") + "py-4 gap-x-4 gap-y-2 sm:items-center sm:mr-4"} bind:this={links}>
                    <a href="/" class='btn variant-soft-surface w-full'>Home</a>
                    <a href="/" class='btn variant-soft-surface w-full'>Home</a>
                    <a href="/" class='btn variant-soft-surface w-full'>Home</a>
                    <span class="flex flex-row gap-4"><LightSwitch /> <span class="sm:hidden">Toggle Dark Mode</span></span>
                </span>
            </span>
        </AppBar>
        -->
	</svelte:fragment>
    <svelte:fragment slot="pageFooter">
        <div class="p-4 flex flex-row justify-between">
            © 2023 Higher Fine Arts
            {#if $page.data.session}
            <span class='flex flex-col gap-4'>
                <a href='/admin'>Admin Dashboard</a>
                <p>{$page.data.session.user.email}</p>
                <button class='btn variant-filled-error' on:click={signOut}>Sign Out</button>
            </span>
            {:else}
            <a href="/admin/signin">Admin Sign-In</a>
            {/if}
        </div>
    </svelte:fragment>
    <div class="h-full overflow-auto">
        <Toast position='br' />
        <slot />
    </div>
</AppShell>