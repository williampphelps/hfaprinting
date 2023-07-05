<script>
    import Masonry from "$lib/components/Masonry.svelte";
    export let data;
    let posts = data.posts;
</script>
<svelte:head>
    <title>Manage Blog | Higher Fine Arts</title>
</svelte:head>
<div class='p-8 flex flex-col gap-4'>
    
    <h1 class='font-bold text-4xl'>Manage Blog</h1>
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/">Higher Fine Arts</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin">Admin Dashboard</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Manage Blog</li>
    </ol>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href='/admin/blog/create'><div class="card p-4">
            <p>Create New Post</p>
        </div></a>
    </div>
    <Masonry data={posts} let:columns={columns}>
        {#each columns as col}
        <div class="flex flex-col gap-4">
            {#each col as post}
            <div class="card variant-soft hover:variant-ghost card-hover flex flex-col gap-4">
                <img src={"https://ik.imagekit.io/szheqbces/tr:w-1500/" + post.images[0]} class='w-full' alt='preview'/>
                <span class="px-4 py-8 flex flex-col gap-4">
                    <h2 class="text-3xl font-bold">{post.name}</h2>
                    <small>Post By {post.author.name} at {new Date(post.created).toLocaleTimeString('en-US')}</small>
                    <p class="line-clamp-1">{post.content}</p>
                    <a href={"/admin/blog/edit/" + post._id}><button class="btn variant-filled-primary">Edit Post</button></a>
                </span>
            </div>
            {/each}
        </div>
        {/each}
    </Masonry>
</div>