<!-- https://codechips.me/tailwind-ui-react-vs-svelte/ -->
<script lang="ts">
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import { createFloatingActions } from "svelte-floating-ui";
    import { offset, flip, shift } from "svelte-floating-ui/dom";

    export let shown = false;
    let menu: any;

    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom-end",
        middleware: [offset(6), flip(), shift()],
    });

    onMount(() => {
        const handleOutsideClick = (event: any) => {
            if (shown && !menu.contains(event.target)) {
                shown = false;
            }
        };

        const handleEscape = (event: any) => {
            if (shown && event.key === "Escape") {
                shown = false;
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
        class="w-full h-full"
        use:floatingRef
        on:click={() => (shown = !shown)}
    >
        <slot name="toggle" />
    </button>

    {#if shown}
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
