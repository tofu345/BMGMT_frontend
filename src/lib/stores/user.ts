import type { User } from "$lib/types";
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

const key = "user";
const user: Writable<User | null> = writable(
    (browser && (JSON.parse(localStorage.getItem(key) || "null") as User)) || null,
);

user.subscribe((value) => {
    if (browser) {
        return localStorage.setItem(key, JSON.stringify(value));
    }
});

export default user;
