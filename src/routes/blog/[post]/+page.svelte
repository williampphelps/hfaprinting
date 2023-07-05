<script>
    import Hero from "$lib/components/Hero.svelte";
    import Markdown from "$lib/components/Markdown.svelte";

    export let data;
    let post = data.post;
</script>
<svelte:head>
    <title>{post.name} | Higher Fine Arts</title>
    <meta name='description' content={(post.content).slice(0, 100) + "..."} />
    <meta property="og:title" content={post.name} />
    <meta property="og:image" content={"https://ik.imagekit.io/szheqbces/tr:w-1000/" + post.images[0]} />
    <meta property="og:description" content={(post.content).slice(0, 100) + "..."} />
</svelte:head>

<Hero height="auto" bg={"https://ik.imagekit.io/szheqbces/tr:w-1500/" + post.images[0]}>
    <h1 class="text-4xl font-bold">{post.name}</h1>
    <p>Post By {post.author.name} at {new Date(post.created).toLocaleTimeString('en-US')}</p>
</Hero>

<div class="p-12 w-full">
    <Markdown source={post.content} />
</div>