<script>
    import SvelteMarkdown from "svelte-markdown";
    export let source;
</script>

<div class="prose dark:prose-invert w-full max-w-none">
    <SvelteMarkdown source={source} />
</div>