<script>
    import { goto } from "$app/navigation";
    import { deleteCookie } from "$lib/cookies";
    import { setUser } from "$lib/stores/user.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        deleteCookie("access");
        deleteCookie("refresh");
        setUser(null);

        goto("/login");
    });
</script>
