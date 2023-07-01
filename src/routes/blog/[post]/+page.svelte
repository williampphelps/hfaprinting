<script>
    import Hero from "$lib/components/Hero.svelte";
    import Markdown from "$lib/components/Markdown.svelte";

    export let data;
    let post = data.post;
</script>

<Hero height="auto" bg={"https://ik.imagekit.io/szheqbces/tr:w-1500/" + post.images[0]}>
    <h1 class="text-4xl font-bold">{post.name}</h1>
    <p>Post By {post.author.name} at {new Date(post.created).toLocaleTimeString('en-US')}</p>
</Hero>

<div class="p-12 w-full">
    <Markdown source={post.content} />
</div>