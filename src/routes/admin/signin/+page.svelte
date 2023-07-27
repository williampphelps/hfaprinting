<script>
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"

    let email = '';
    let password = '';
    let error = '';

    async function handleSubmit() {
        signIn('credentials', {
            redirect: true,
            callbackUrl: '/',
            username: email,
            password: password
        }).then(res => {
            error = 'Incorrect Username or Password';
            console.log({res});
        }).catch(err => {
            console.log({err})
        })
    }
</script>
<div class="h-screen py-10 overflow-auto flex items-center justify-center bg-cover bg-center bg-[url('https://ik.imagekit.io/szheqbces/tr:w-1500/6477e16e7f08e84fa467d0f7/2670c26d-1fd0-4401-a0b9-2341d52cf415')]">
    <div class="card rounded p-12 flex flex-col gap-6">
        <h1 class="text-4xl font-bold">Sign In</h1>
        <p class="text-red-500">{error}</p>
        <form class="flex flex-col gap-6" on:submit|preventDefault={handleSubmit}>
            <label class="label">
                <span>Email Address</span> 
                <input class="input variant-glass" type="email" name="username" placeholder="Enter Email Address here..." bind:value={email} />
            </label>
            <label class="label">
                <span>Password</span> 
                <input class="input variant-glass" type="password" name="password" placeholder="Enter Password here..." bind:value={password} />
            </label>
            <input class="btn variant-filled-primary cursor-pointer" type="submit" value="Sign In" />
        </form>
        <a href="/admin/signup">Don't Have an Account? Sign Up!</a>
        <hr />
        <button class="btn variant-filled" on:click={() => signIn('google', { callbackUrl: '/'})}>Sign In With Google</button>
    </div>
</div>
