<!-- https://svelte.dev/repl/84a8d64a6f1e49feba8f6a491ecc55f5?version=3.35.0 -->
<script lang="ts">
    export let rows: any;
    export let perPage: number;
    export let trimmedRows: any;

    const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
    let currentPage = 0;
    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);
    $: start = currentPage * perPage;
    $: end =
        currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
    $: trimmedRows = rows.slice(start, end + 1);
</script>

{#if totalRows && totalRows > perPage}
    <div class="pagination py-1">
        <button
            on:click={() => (currentPage -= 1)}
            disabled={currentPage === 0}
            aria-label="left arrow icon"
            aria-describedby="prev"
        >
            <svg
                class="c"
                viewBox="0 0 25 25"
                fill-rule="evenodd"
                clip-rule="evenodd"
                style={`transform: rotate(${directions.indexOf("s") * 45}deg)`}
            >
                <path
                    d="M0.200275 13.2782C0.200275 12.4153 0.89983 11.7157 1.76278 11.7157H23.6378C24.5007 11.7157 25.2003 12.4153 25.2003 13.2782C25.2003 14.1411 24.5007 14.8407 23.6378 14.8407H1.76278C0.89983 14.8407 0.200275 14.1411 0.200275 13.2782Z"
                />
                <path
                    d="M11.5954 1.23584C12.2056 0.62565 13.1949 0.62565 13.8051 1.23584L24.7426 12.1733C25.3528 12.7835 25.3528 13.7729 24.7426 14.3831L13.8051 25.3206C13.1949 25.9307 12.2056 25.9307 11.5954 25.3206C10.9852 24.7104 10.9852 23.721 11.5954 23.1108L21.4281 13.2782L11.5954 3.44555C10.9852 2.83536 10.9852 1.84604 11.5954 1.23584Z"
                />
            </svg>
        </button>
        <span id="prev" class="sr-only">Load previous {perPage} rows</span>
        <p>{start + 1} - {end + 1} of {totalRows}</p>
        <button
            on:click={() => (currentPage += 1)}
            disabled={currentPage === totalPages - 1}
            aria-label="right arrow icon"
            aria-describedby="next"
        >
            <svg
                class="c"
                viewBox="0 0 25 25"
                fill-rule="evenodd"
                clip-rule="evenodd"
                style={`transform: rotate(${directions.indexOf("n") * 45}deg)`}
            >
                <path
                    d="M0.200275 13.2782C0.200275 12.4153 0.89983 11.7157 1.76278 11.7157H23.6378C24.5007 11.7157 25.2003 12.4153 25.2003 13.2782C25.2003 14.1411 24.5007 14.8407 23.6378 14.8407H1.76278C0.89983 14.8407 0.200275 14.1411 0.200275 13.2782Z"
                />
                <path
                    d="M11.5954 1.23584C12.2056 0.62565 13.1949 0.62565 13.8051 1.23584L24.7426 12.1733C25.3528 12.7835 25.3528 13.7729 24.7426 14.3831L13.8051 25.3206C13.1949 25.9307 12.2056 25.9307 11.5954 25.3206C10.9852 24.7104 10.9852 23.721 11.5954 23.1108L21.4281 13.2782L11.5954 3.44555C10.9852 2.83536 10.9852 1.84604 11.5954 1.23584Z"
                />
            </svg>
        </button>
        <span id="next" class="sr-only">Load next {perPage} rows</span>
    </div>
{/if}

<style>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
    }

    .pagination p {
        margin: 0 1rem;
    }

    button {
        display: flex;
    }

    button:disabled {
        opacity: 0;
    }

    .c {
        width: 1em;
        height: 1em;
        fill: currentColor;
        transition: all 0.3s ease-out;
        overflow: visible;
    }
</style>
