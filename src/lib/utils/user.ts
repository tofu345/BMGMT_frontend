import { browser } from "$app/environment";
import axios from "$lib/axios";
import { getCookie } from "$lib/cookies";
import type { User } from "$lib/types";

export const getUser = async (): Promise<User | null> => {
    if (!browser) {
        return null;
    }

    const token = getCookie("access");
    if (!token) {
        return null;
    }

    const res = await axios
        .get("/user")
        .then((res) => res)
        .catch((err) => {
            console.error(err);
            return err.response
        });

    if (res.status != 200) {
        return null;
    }
    return res.data;
};
