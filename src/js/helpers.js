import { timeoutSeconds } from "./config";


const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second${s > 1 ? "s" : ""}`));
        }, s * 1000);
    });
};

export const AJAX = async function (url, data = undefined) {
    const fetchPro = data ? fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }) : fetch(url);
    try {
        const res = await Promise.race([fetchPro, timeout(timeoutSeconds)]);
        if (!res.ok) throw new Error("Recipe not found " + res.status);
        const data = await res.json();
        return data;
    }
    catch (err) {
        throw err;
    }

}
