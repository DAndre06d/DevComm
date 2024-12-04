import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
    timeout?: number;
}

function isError(err: unknown): err is Error {
    return err instanceof Error;
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
        const response = await fetch(url, config);
        clearTimeout(id);
        if (!response.ok) {
            throw new RequestError(
                response.status,
                `HTTP error: ${response.status}`
            );
        }
        return await response.json();
    } catch (e) {
        const err = isError(e) ? e : new Error("Unknown Error");
        if (err.name === "AbortError") {
            logger.warn(`Request to ${url} timed out.`);
        } else {
            logger.error(`Error fetching url: ${url}`);
        }
        return handleError(err) as ActionResponse<T>;
    }
}
