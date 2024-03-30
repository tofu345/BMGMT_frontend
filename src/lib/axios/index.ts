import { getCookie } from "$lib/cookies";
import axios from "axios";

const baseURL = "http://localhost:8000";

const instance = axios.create({
    baseURL,
    timeout: 15000,
});

instance.interceptors.request.use(
    async (config) => {
        const access = getCookie("access");
        if (access) {
            config.headers["Authorization"] = `Bearer ${access}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);
