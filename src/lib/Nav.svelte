<script lang="ts">
    import user from "$lib/stores/user";
    import Dropdown from "./Dropdown.svelte";
    import Select from "svelte-select";

    let selected_location: any = null;
    $: locations = $user?.admin_locations.map((v) => v.name);
</script>

<nav class="w-full h-14 flex justify-between bg-gray-100 text-gray-800">
    <div class="h-full w-full mx-3 flex justify-start items-center gap-2">
        {#if $user?.admin_locations.length}
            {#if $user.admin_locations.length > 1}
                <Select
                    --width="300px"
                    placeholder={"Select Location"}
                    items={locations}
                    bind:value={selected_location}
                    searchable={true}
                />
            {:else}
                {$user.admin_locations[0].name}
            {/if}
        {:else}
            <!-- <a href="/" class="font-sans font-medium text-base"></a> -->
            {$user?.admin_locations[0].name || "Building"} Management
        {/if}
    </div>
    <div class="h-full w-full mx-3 flex justify-end items-center gap-2">
        {#if $user}
            <div class="rounded-full w-9 h-9 p-1 relative">
                <Dropdown>
                    <img
                        slot="toggle"
                        class="w-3/4 h-3/4"
                        src="/svgs/default_user_icon.svg"
                        alt="user icon"
                    />

                    <div
                        slot="contents"
                        class="origin-top-right absolute right-0 w-48 flex flex-col gap-1
                        p-1 bg-gray-100 rounded-lg border cursor-pointer text-sm"
                    >
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
