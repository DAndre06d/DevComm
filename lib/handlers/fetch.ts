import { ActionResponse } from "@/types/global";
import { error } from "console";

interface FetchOptions extends RequestInit {
    timeout: number;
}

function isError(err: unknown): err is Error {
    return error instanceof Error;
}
export async function fetchHandler<T>(
    url: string,
    options: FetchOptions = {}
): Promise<ActionResponse<T>> {
    const {
        timeout = 5000,
        headers: customHeaders = {},
        ...restOptions
    } = options;
    const controller = new AbortController();
    const id = setTimeout(() => {
        controller.abort();
    }, timeout);
    const defaultHeaders: HeadersInit = {
        "Content-Ttype": "application/json",
        Accept: "application/json",
    };
    const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
    const config: RequestInit = {
        ...restOptions,
        headers,
        signal: controller.signal,
    };
    try {
    } catch (e) {
        const err = isError(e) ? e : new Error("Unknown Error");
        if (err.name === "AbortError") {
            logger.warn(`Request to ${url} timed out.`);
        } else {
        }
    }
}
