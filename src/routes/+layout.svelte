<script>
    import "../app.css";
    import { getUser, setUser } from "$lib/stores/user.svelte";
    import { requestUserData } from "$lib/utils/user";
    import { onMount } from "svelte";
    import Nav from "$lib/Nav.svelte";

    onMount(async () => {
        if (!getUser()) {
            let user = await requestUserData();
            if (user) setUser(user);
        }
        console.log(getUser());
    });
</script>

<Nav />

<slot />
