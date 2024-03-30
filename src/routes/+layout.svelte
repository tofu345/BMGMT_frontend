<script>
    import "../app.css";
    import user from "$lib/stores/user";
    import { getUser } from "$lib/utils/user";
    import { onMount } from "svelte";

    onMount(async () => {
        user.set(await getUser());
        console.log($user);
    });
</script>

<slot />
