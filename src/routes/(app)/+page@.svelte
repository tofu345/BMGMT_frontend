<script lang="ts">
    import axios from "$lib/axios";
    import { onMount } from "svelte";
    import { getUser } from "$lib/stores/user.svelte";
    import Select from "svelte-select";
    import type { Location, Room } from "$lib/types";
    import Pagination from "$lib/Pagination.svelte";
    import Dropdown from "$lib/Dropdown.svelte";

    async function getLocations() {
        let res = await axios
            .get("/locations")
            .then((res) => res)
            .catch((err) => err);

        if (res.status === 200) {
            locations = res.data;
        }
        loading = false;
    }

    async function fetchLocationInfo(loc_data: any) {
        let idx = locations.findIndex((v) => v.name === loc_data?.value);
        let location = locations[idx];
        if (!location) {
            return;
        }
        if (location.fetched) {
            selected_location_idx = idx;
            return;
        }

        loading = true;
        let res = await axios
            .get(`locations/${location.id}/issues`)
            .then((res) => res)
            .catch((err) => err);
        if (res.status === 200) {
            locations[idx].issues = res.data;
        }

        res = await axios
            .get(`/locations/${location?.id}`)
            .then((res) => res)
            .catch((err) => err);
        if (res.status === 200) {
            locations[idx].fetched = true;
            locations[idx].rooms = res.data.rooms;
            locations[idx].admins = res.data.admins;
            selected_location_idx = idx;
        }
        loading = false;
    }

    onMount(() => {
        getLocations();
    });

    let admin_locations = $state([""]);

    $effect(() => {
        let user = getUser();
        if (user?.admin_locations)
            admin_locations = user.admin_locations.map((v) => v.name);
    });

    let loading = $state(true);
    let locations: Location[] = [];
    let selected_location_name: string | null = $state(null);
    let selected_location_idx: number | null = $state(null);
    $effect(() => {
        fetchLocationInfo(selected_location_name);
    });

    let filter = $state("");
    let rows: Room[] = $state([]);
    let rows_start = $state(0);
    let rows_end = $state(0);
    let paginatedRows: Room[] = $derived(rows.slice(rows_start, rows_end + 1));
    $effect(() => {
        if (!selected_location_idx) {
            return;
        }
        if (!filter) {
            rows = locations[selected_location_idx].rooms;
        }

        rows = locations[selected_location_idx].rooms.filter((v) => {
            let n = v.name.toLowerCase();
            let f = filter.toLowerCase();
            return n.startsWith(f) || n.includes(f);
        });
    });
</script>

<div
    class="text-black flex flex-col lg:flex-row lg:gap-7 max-w-[90%] mx-auto my-5"
>
    <div class="w-full h-full">
        <!-- Left -->
        <Select
            --placeholder-color="gray"
            --border-focused="1px solid gray"
            --border-radius="10px"
            --selected-item-color="gray"
            --item-hover-bg="#e6e6e6"
            --item-is-active-bg="#bfbfbf"
            --item-is-active-color="black"
            placeholder={"Select Location"}
            items={admin_locations}
            bind:value={selected_location_name}
            searchable={true}
            {loading}
            on:clear={() => (selected_location_name = null)}
        >
            <div class="flex justify-center items-center" slot="loading-icon">
                <span class="loader"></span>
            </div>
        </Select>

        {#if !selected_location_name}
            <div
                class="mt-4 bg-gray-300 rounded-lg h-96 w-full flex justify-center items-center"
            >
                <div class="text-gray-700 text-sm">No Location selected</div>
            </div>
        {:else}
            <div class="mt-4 pb-5 bg-white flex gap-2">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                    >
                        <img
                            class="w-4 h-4 text-gray-500"
                            src="/svgs/search.svg"
                            alt="search icon"
                        />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        class="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 flex align-top"
                        placeholder="Filter"
                        bind:value={filter}
                    />
                </div>
                <button
                    class="h-9 flex items-center px-4 text-white bg-gray-600 rounded-lg hover:bg-gray-500"
                    onclick={() => {
                        if (selected_location_idx)
                            locations[selected_location_idx].fetched = false;
                        fetchLocationInfo(selected_location_name);
                    }}
                >
                    <span class="mx-1">Refresh</span>
                </button>
            </div>

            <div class="relative overflow-x-auto border rounded-lg">
                <table class="w-full text-sm text-left overflow-hidden">
                    <thead class=" text-gray-700 bg-gray-50 border-b">
                        <tr>
                            <th scope="col" class="px-6 py-2"> Room </th>
                            <th scope="col" class="px-6 py-2"> Tenant </th>
                            <th scope="col" class="py-2"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each paginatedRows as row}
                            <tr class="bg-white border-b">
                                <td class="px-6 py-2"> {row.name} </td>
                                <td class="px-6 py-2">
                                    {#if row.user}
                                        {row.user.first_name}
                                        {row.user.last_name}
                                    {/if}
                                </td>
                                <td class="py-2 flex gap-3 justify-end mr-4">
                                    {#if !row.user}
                                        <img
                                            class="cursor-pointer"
                                            src="/svgs/person_plus.svg"
                                            alt="new tenant"
                                        />
                                    {/if}
                                    <Dropdown>
                                        <p slot="toggle">...</p>
                                        <div slot="contents">
                                            <p class="dropdown-content">
                                                Nothing yet
                                            </p>
                                        </div>
                                    </Dropdown>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>

                {#if !rows.length}
                    <div
                        class="bg-gray-300 rounded-b-lg h-96 w-full flex justify-center items-center"
                    >
                        <div class="text-gray-700">No Data</div>
                    </div>
                {/if}

                <Pagination
                    {rows}
                    perPage={10}
                    bind:start={rows_start}
                    bind:end={rows_end}
                />
            </div>
        {/if}
    </div>

    <div class="w-full h-full lg:w-[45%] lg:mt-0 mt-5">
        <!-- Right -->
        <!-- {#if selected_location_name && selected_location_idx} -->
        <!--     {#each locations[selected_location_idx].issues as issue} -->
        <!--         <div>{issue.issue_type}</div> -->
        <!--     {/each} -->
        <!-- {:else} -->
        <div
            class="bg-gray-300 rounded-lg h-96 w-full flex justify-center items-center"
        >
            <div class="text-gray-700">No issues</div>
        </div>
        <!-- {/if} -->
    </div>
</div>

<style>
    .loader {
        width: 24px;
        height: 24px;
        border: 3px solid #4d4d4d;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
