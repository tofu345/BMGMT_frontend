<!-- https://codechips.me/tailwind-ui-react-vs-svelte/ -->
<script lang="ts">
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";

    let show = false; // menu state
    let menu: any; // menu wrapper DOM reference

    onMount(() => {
        const handleOutsideClick = (event: any) => {
            if (show && !menu.contains(event.target)) {
                show = false;
            }
        };

        const handleEscape = (event: any) => {
            if (show && event.key === "Escape") {
                show = false;
            }
        };

        document.addEventListener("click", handleOutsideClick, false);
        document.addEventListener("keyup", handleEscape, false);
        return () => {
            document.removeEventListener("click", handleOutsideClick, false);
            document.removeEventListener("keyup", handleEscape, false);
        };
    });
</script>

<div class="relative" bind:this={menu}>
    <button
        on:click={() => (show = !show)}
        class="menu focus:outline-none focus:shadow-solid"
    >
        <slot name="toggle" />
    </button>

    {#if show}
        <div>
            <!-- in:scale={{ duration: 100, start: 0.95 }} -->
            <!-- out:scale={{ duration: 100, start: 0.95 }} -->
            <slot name="contents" />
        </div>
    {/if}
</div>
