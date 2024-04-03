<script lang="ts">
    import axios from "$lib/axios";
    import { onMount } from "svelte";
    import user from "$lib/stores/user";
    import Select from "svelte-select";
    import type { Location, Room } from "$lib/types";

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
        let locs = Object.values(locations);
        let idx = locs.findIndex((v) => v.name === loc_data?.value);
        let location = locs[idx];
        if (!location) {
            return;
        }
        if (location.fetched) {
            selected_location = locations[idx];
            return;
        }

        loading = true;
        let res = await axios
            .get(`/locations/${location?.id}`)
            .then((err) => err)
            .catch((err) => err);
        if (res.status === 200) {
            locations[idx].fetched = true;
            locations[idx].rooms = res.data.rooms;
            locations[idx].admins = res.data.admins;
            selected_location = locations[idx];
        }
        loading = false;
    }

    onMount(() => {
        getLocations();
    });

    $: admin_locations = $user?.admin_locations.map((v) => v.name);

    let locations: Location[] = [];
    let loading = true;
    let selected_location: Location | null = null;
    let selected_location_name: any = null;
    $: fetchLocationInfo(selected_location_name);

    let selected_rooms: Room[] = [];
    $: if (selected_location) selected_rooms = selected_location.rooms || [];

    let filter = "";
    $: if (selected_location?.rooms) {
        if (filter) {
            selected_rooms = selected_location.rooms.filter((v) => {
                let n = v.name.toLowerCase();
                let f = filter.toLowerCase();
                return n.startsWith(f) || n.includes(f);
            });
        } else {
            selected_rooms = selected_location.rooms;
        }
    }

    // $: console.log(locations);
</script>

<div
    class="text-black flex flex-col-reverse lg:flex-row lg:gap-7 max-w-[90%] mx-auto mt-5"
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
        >
            <div class="flex justify-center items-center" slot="loading-icon">
                <span class="loader"></span>
            </div>
        </Select>

        {#if !selected_location_name}
            <div
                class="mt-4 bg-gray-300 rounded-lg h-96 w-full flex justify-center items-center"
            >
                <div class="text-gray-700">Select a location to view</div>
            </div>
        {:else}
            <div class="mt-4 pb-5 bg-white flex gap-2">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                    >
                        <svg
                            class="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        class="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 flex align-top"
                        placeholder="Filter"
                        bind:value={filter}
                    />
                </div>
                <button
                    class="h-9 flex items-center px-4 text-white bg-gray-600 rounded-lg hover:bg-gray-500"
                    on:click={() => {
                        locations.forEach((v) => (v.fetched = false));
                        fetchLocationInfo(selected_location_name);
                    }}
                >
                    <span class="mx-1">Refresh</span>
                </button>
            </div>
            <div class="relative overflow-x-auto border rounded-lg">
                <table class="w-full text-sm text-left">
                    <thead class=" text-gray-700 bg-gray-50 border-b">
                        <tr>
                            <th scope="col" class="px-6 py-3"> Room </th>
                            <th scope="col" class="px-6 py-3"> Tenant </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each selected_rooms as room}
                            <tr
                                class="odd:bg-white even:bg-gray-50 bg-white border-b"
                            >
                                <td class="px-6 py-4"> {room.name} </td>
                                <td class="px-6 py-4">
                                    {room.tenant?.email || "-"}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {#if !selected_rooms.length}
                    <div
                        class="bg-gray-300 rounded-b-lg h-96 w-full flex justify-center items-center"
                    >
                        <div class="text-gray-700">Nothing to see here</div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
    <div class="w-full h-full lg:w-[45%]">
        <!-- Right -->
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
