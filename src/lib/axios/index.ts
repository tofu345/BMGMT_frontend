import { getCookie } from "$lib/cookies";
import axios from "axios";
import { PUBLIC_BACKEND_BASEURL } from "$env/static/public";

const instance = axios.create({
    baseURL: PUBLIC_BACKEND_BASEURL,
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

export default instance;
