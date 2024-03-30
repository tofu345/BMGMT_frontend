import type { User } from "$lib/types";
import { writable, type Writable } from "svelte/store";

const user: Writable<User | null> = writable(null);

export default user;
