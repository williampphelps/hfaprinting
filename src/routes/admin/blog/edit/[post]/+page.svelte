<script>
    import { page } from '$app/stores';
    import Markdown from '$lib/components/Markdown.svelte';
    import { Avatar, modalStore } from '@skeletonlabs/skeleton';
    import ImageModal from '$lib/components/ImageModal.svelte';
    import axios from 'axios';
    import { goto } from '$app/navigation';

    export let data;



    const imageModal = {
        ref: ImageModal,
    }

    let newPost = {
        name: '',
        content: '',
        images: [],
        author: $page.data.session.user.id
    }

    newPost = data.post;
    newPost.author = data.post.author._id;
    let errors = {
        name: '',
        content: '',
        images: ''
    }

    async function handleSubmit() {

        let errored = false;
        errors = {
            name: '',
            content: '',
            images: ''
        }

        if (newPost.name == '') {
            errors.name = 'You Must Specify a Post Title';
            errored = true;
        }
        if (newPost.content == '') {
            errors.content = 'You Must Add Some Text Content to Your Blog';
            errored = true;
        }
        if (newPost.images.length == 0) {
            errors.images = 'You Must Have At Least One Image!';
            errored = true;
        }

        if (!errored) {
            let result = await axios.post('/api/blog', newPost);

            console.log(result);

            if (result.statusText == 'OK') {
                goto('/admin/blog');
            }
        }
        
    }
</script>

<div class='p-8 flex flex-col gap-4'>
    
    <h1 class='font-bold text-4xl'>Create A Blog Post</h1>
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/">Higher Fine Arts</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin">Admin Dashboard</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/admin/blog">Manage Blog</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Create A Blog Post</li>
    </ol>
    <form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
        <label class='label'>
            <span>Post Title</span>
            <span class='text-red-500'>{errors.name}</span>
            <input class='input' type='text' name='title' placeholder="Post Title Here..." bind:value={newPost.name} />
        </label>
        <span class='label'>
            <span>Images</span>
            <span class="text-red-500">{errors.images}</span>
        </span>
        <div class="flex flex-row flex-wrap gap-2">
            {#each newPost.images as image, i}
                <div class="relative">
                    <span class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100">
                        <button class="chip variant-filled-error material-icons" on:click={() => {newPost.images.splice(i, 1); newPost.images = newPost.images;}}>delete</button>
                    </span>
                    <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + image} alt="preview" rounded="rounded" />
                </div>
            {/each}
            <Avatar initials="+" rounded="rounded" border="border-dashed border-2 border-surface-300-600-token hover:!border-success-700" cursor="cursor-pointer" on:click={() => modalStore.trigger({ type: 'component', component: imageModal, response: (r) => {if (r){newPost.images = [...newPost.images, ...r.filter(item => !newPost.images.includes(item))];}} })} />
        </div>
        <div class="grid grid-cols-1 gap-4">
            <label class='label'>
                <span>Post Content</span>
                <span class='text-red-500'>{errors.content}</span>
                <textarea class='textarea' type='text' name='content' placeholder='Post Content Here...' bind:value={newPost.content} />
            </label>
            <Markdown source={newPost.content} />
        </div>
        <input type="submit" class="btn variant-filled-primary cursor-pointer" value="Publish Post" />
    </form>
</div>