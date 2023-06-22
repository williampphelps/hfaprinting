<script>
    import axios from "axios";
    import { TabGroup, Tab, FileDropzone, Avatar, modalStore, ProgressBar } from "@skeletonlabs/skeleton";
    import Masonry from "./Masonry.svelte";

    let tabSet = 0;
    let googleImages = new Promise(() => {});
    let images = [];
    let uploadStatus = "";
    let uploadPercent = 0;

    let deleteColumns = [];
    let addColumns = [];

    async function getImages() {
        let result = await axios.get('/api/images');

        return result.data.files.sort((a, b) => new Date(b.time) - new Date(a.time));
    }

    async function handleFiles(files) {
        uploadStatus = "Uploading Files...";
        let newFiles = [];

        for (const item of files) {
            let newFile = await uploadFile(item);
            newFiles.push(newFile);
        }
        return newFiles;
    }

    async function uploadFile(file) {
        let formdata = new FormData()
        formdata.append('file', file);
        let result = await axios.post('/api/images/upload');

        let result2 = await axios.put(result.data.url, file, {
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            onUploadProgress: (event) => {uploadStatus = (event.progress * 100).toFixed(2) + "% Uploaded"; uploadPercent = (event.progress * 100).toFixed(0)}
        })

        googleImages = getImages();
        images = [...images, result.data.file];
        uploadStatus = "";
        return result.data.file;
    }

    googleImages = getImages();
</script>
<div class="card variant-glass rounded-token w-modal p-8 flex flex-col gap-4">
    <h1 class="font-bold text-4xl">Manage Images</h1>
    <TabGroup>
        <Tab bind:group={tabSet} name="tab1" value={0}>Upload Images</Tab>
        <Tab bind:group={tabSet} name="tab1" value={1}>Your Images</Tab>
        <svelte:fragment slot="panel">
            <div class="flex flex-col gap-4">
                {#if tabSet == 0}
                    <p>{uploadStatus}</p>
                    {#if uploadStatus != ""}
                    <ProgressBar track="bg-surface-700-200-token" meter="bg-primary-200-700-token" value={uploadPercent} />
                    {/if}
                    <FileDropzone name="files" on:change={(e) => handleFiles(e.target.files)} class="card variant-ghost" multiple>
                        <svelte:fragment slot="lead"><span class="material-icons text-6xl">image</span></svelte:fragment>
                        <svelte:fragment slot="message">Drag and Drop your images here</svelte:fragment>
                        <svelte:fragment slot="meta">PNG, JPG, JPEG, WEBP, and GIF accepted</svelte:fragment>
                    </FileDropzone>
                {:else if tabSet == 1}
                    <p>Pick from Previously Uploaded Images</p>
                    {#await googleImages}
                        <p>Images Loading...</p>
                    {:then imageList}
                    <div class="max-h-48 overflow-auto">
                        <Masonry data={imageList} let:columns={addColumns} determineColumns={(blockWidth) => {if (blockWidth < 400) {return 2;} return 3}}>
                            {#each addColumns as col}
                                <div class="flex flex-col gap-4">
                                    {#each col as item}
                                        {#if !images.includes(item.name)}
                                            <div class="relative">
                                                <img src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + item.name} alt="preview" />
                                                <div class="absolute w-full h-full flex justify-center items-center top-0 left-0 opacity-0 hover:opacity-100 card variant-soft">
                                                    <button class="chip variant-filled-success material-icons" on:click={() => images = [...images, item.name]}>add</button>
                                                </div>
                                            </div>
                                        {/if}
                                    {/each}
                                </div>
                            {/each}
                        </Masonry>
                    </div>
                    {:catch error}
                        <p>{error}</p>
                    {/await}
                {/if}
                <div class="flex flex-row justify-between gap-4 w-full p-4">
                    <div class="flex flex-row no-wrap gap-4 w-full overflow-auto hide-scrollbar">
                        {#each images as image, i}
                        <div class="relative">
                            <span class="absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100">
                                <button class="chip variant-filled-error material-icons" on:click={() => {images.splice(i, 1); images = images;}}>delete</button>
                            </span>
                            <Avatar src={"https://ik.imagekit.io/szheqbces/tr:w-500/" + image} alt="preview" rounded="rounded" />
                        </div>
                        {/each}
                    </div>
                    <button class="btn variant-filled-secondary" on:click={() => { if ($modalStore[0].response) $modalStore[0].response(images); modalStore.close()}}>Add Images</button>
                </div>
            </div>
            
        </svelte:fragment>
        
    </TabGroup>
</div>