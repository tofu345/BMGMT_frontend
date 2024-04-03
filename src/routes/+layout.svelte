<script>
    import "../app.css";
    import user from "$lib/stores/user";
    import { getUser } from "$lib/utils/user";
    import { onMount } from "svelte";
    import Nav from "$lib/Nav.svelte";

    onMount(async () => {
        user.set(await getUser());
        console.log($user);
    });
</script>

<Nav />

<slot />
