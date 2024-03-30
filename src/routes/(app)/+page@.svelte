<script lang="ts">
    import axios from "$lib/axios";
    import { onMount } from "svelte";

    async function getLocations() {
        await axios
            .get("/locations")
            .then((res: any) => {
                console.log(res);
            })
            .catch((err: any) => err);
    }

    onMount(() => {
        getLocations();
    });
</script>
