<script lang="ts">
    import user from "$lib/stores/user";
    import Dropdown from "./Dropdown.svelte";
</script>

<nav class="w-full h-14 flex justify-between bg-gray-100 text-gray-800">
    <div class="h-full w-full mx-4 flex justify-start items-center gap-2">
        <a href="/" class="font-sans font-medium text-base">
            Building Management
        </a>
    </div>
    <div class="h-full w-full mx-3 flex justify-end items-center gap-2">
        {#if $user}
            <div class="rounded-full w-9 h-9 p-1 relative z-10">
                <Dropdown>
                    <img
                        slot="toggle"
                        class="w-3/4 h-3/4"
                        src="/svgs/default_user_icon.svg"
                        alt="user icon"
                    />

                    <div slot="contents">
                        <a href="/settings" class="dropdown-content">
                            Settings
                        </a>
                        <a href="/logout" class="dropdown-content"> Logout </a>
                    </div>
                </Dropdown>
            </div>
        {:else}
            <a href="/login" class="text-sm">Login</a>
        {/if}
    </div>
</nav>
