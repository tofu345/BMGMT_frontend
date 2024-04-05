<!-- https://codechips.me/tailwind-ui-react-vs-svelte/ -->
<script lang="ts">
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import { createFloatingActions } from "svelte-floating-ui";
    import { offset, flip, shift } from "svelte-floating-ui/dom";

    let show = false; // menu state
    let menu: any; // menu wrapper DOM reference

    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom",
        middleware: [offset(6), flip(), shift()],
    });

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
    <button use:floatingRef on:click={() => (show = !show)}>
        <slot name="toggle" />
    </button>

    {#if show}
        <div
            in:scale={{ duration: 100, start: 0.95 }}
            out:scale={{ duration: 100, start: 0.95 }}
            class="z-10 absolute w-48 flex flex-col gap-1 p-1 bg-gray-100 rounded-lg border cursor-pointer text-sm"
            use:floatingContent
        >
            <slot name="contents" />
        </div>
    {/if}
</div>
