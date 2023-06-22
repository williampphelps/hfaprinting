<script lang="ts">
    import { onMount } from "svelte";

    export let height = "full";
    export let bg: string;
    let background: HTMLDivElement;

    onMount(() => {
        background.style.backgroundImage = "url('" + bg + "')";
    })
</script>
<div bind:this={background} class={(height == "full" ? "h-full" : "h-auto") + " px-2 py-24 sm:p-24 w-full bg-cover bg-center flex flex-col lg:grid lg:grid-cols-8 items-center justify-center"}>
    <div class="p-16 card flex flex-col gap-12 lg:col-span-5 h-fit w-full">
        <slot />
    </div>
</div>