<script>
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { goto } from '$app/navigation';
    import { page } from "$app/stores"
    import axios from "axios";
    import { toastStore } from "@skeletonlabs/skeleton";

    let email = '';
    let password = '';
    let cpassword = '';
    let name = '';

    let error = '';

    async function handleSubmit() {
        if (password == cpassword && email != '' && password != '' && name != '') {
            axios.post('/api/auth/signup', {
                email: email,
                password: password,
                name: name
            }).then((res) => {
                console.log(res);
                toastStore.trigger({message: 'User Account Created!'});
                goto('/admin/signin');
            }).catch((err) => {
                error = err.response.data.message
            });
        } else {
            error = 'Passwords Must Match'
        }
    }
</script>
<div class="h-auto py-10 overflow-auto flex items-center justify-center bg-cover bg-center bg-[url('https://ik.imagekit.io/szheqbces/tr:w-1500/6477e16e7f08e84fa467d0f7/2670c26d-1fd0-4401-a0b9-2341d52cf415')]">
    <div class="card rounded p-12 flex flex-col gap-6">
        <h1 class="text-4xl font-bold">Sign Up</h1>
        <p class="text-red-500">{error}</p>
        <form class="flex flex-col gap-6" on:submit|preventDefault={handleSubmit}>
            <label class="label">
                <span>Full Name</span> 
                <input class="input variant-glass" type="text" name="name" placeholder="Enter Full Name here..." bind:value={name} />
            </label>
            <label class="label">
                <span>Email Address</span> 
                <input class="input variant-glass" type="email" name="username" placeholder="Enter Email Address here..." bind:value={email} />
            </label>
            <label class="label">
                <span>Password</span> 
                <input class="input variant-glass" type="password" name="password" placeholder="Enter Password here..." bind:value={password} />
            </label>
            <label class="label">
                <span>Confirm Password</span> 
                <input class="input variant-glass" type="password" name="cpassword" placeholder="Confirm Password here..." bind:value={cpassword} />
            </label>
            <input class="btn variant-filled-primary cursor-pointer" type="submit" value="Sign Up" />
        </form>
        <a href="/admin/signin">Already Have an Account? Sign In!</a>
        <hr />
        <button class="btn variant-filled" on:click={() => signIn('google', { callbackUrl: '/'})}>Sign Up With Google</button>
    </div>
</div>
