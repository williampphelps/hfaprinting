<script>
    import SvelteMarkdown from "svelte-markdown";
    export let source;
    $: string = source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
</script>

<div class="prose dark:prose-invert w-full">
    <SvelteMarkdown source={string} />
</div>