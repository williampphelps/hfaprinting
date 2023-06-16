<script>
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import "../app.css";


    import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
    import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>
<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
<AppShell>
    <svelte:fragment slot="header">
		<AppBar>
            <svelte:fragment slot="lead">
                <span class="flex flex-row gap-2 items-center"><a href="/" class="font-bold">Higher Fine Arts</a> <small>Printing</small></span>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <LightSwitch />
            </svelte:fragment>
        </AppBar>
	</svelte:fragment>
    <div>
        <slot />
    </div>
</AppShell>