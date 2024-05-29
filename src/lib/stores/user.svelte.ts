import type { User } from "$lib/types";
import { browser } from "$app/environment";

const key = "user";

let user_data: User | null = $state(
    (browser && (JSON.parse(localStorage.getItem(key) || "null") as User)) ||
        null,
);

export function getUser(): User | null {
    return user_data;
}

export function setUser(value: User | null) {
    localStorage.setItem(key, JSON.stringify(value));
    user_data = value;
}
