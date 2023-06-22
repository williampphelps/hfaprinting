<script>
    import Markdown from "$lib/components/Markdown.svelte";
    import Masonry from "$lib/components/Masonry.svelte";

    let posts = [
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "# A First Heading...",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "# A First Heading...",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong. This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong.",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "# A First Heading...",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong. This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong.",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "# A First Heading...",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong. This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong.",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "# A First Heading...",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong. This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong.",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "# A First Heading...",
            author: {
                id: 1,
                name: "William Phelps",
            }
        },
        {
            id: 1,
            title: "My First Blog Post",
            created: Date.now(),
            content: "This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong. This is supposed to be a really long paragraph. What do you think? Real Simple Brighter, Fonda Life Gets Bettwe With Age. Scams. How We Fail our Truckers, Lost at Sea for 16 hours. Tales of good luck. Suace Gardner. Time Furstune. Efficiency is in. Empathy out? Women's World Cup Preiview. Fortune 500. America's Biggest Company. They Said my Mom tried to hurt me. They were Wrong.",
            author: {
                id: 1,
                name: "William Phelps",
            }
        }
    ];
</script>

<div class="p-8 flex flex-col gap-8">
    <h1 class="text-4xl font-bold">Blog</h1>
    <Masonry data={posts} let:columns={columns}>
        {#each columns as col}
        <div class="flex flex-col gap-4">
            {#each col as post}
            <div class="card variant-soft hover:variant-ghost card-hover flex flex-col gap-4">
                <img src="https://ik.imagekit.io/szheqbces/tr:w-1500/6477e16e7f08e84fa467d0f7/2670c26d-1fd0-4401-a0b9-2341d52cf415" class='w-full' />
                <span class="px-4 py-8 flex flex-col gap-4">
                    <h2 class="text-3xl font-bold">{post.title}</h2>
                    <small>Post By {post.author.name} at {new Date(post.created).toLocaleTimeString('en-US')}</small>
                    <p class="line-clamp-1">{post.content}</p>
                </span>
            </div>
            {/each}
        </div>
        {/each}
    </Masonry>
</div>