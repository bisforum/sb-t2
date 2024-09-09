import { APIResponse } from "@playwright/test";

export class Logger {
    static logRequest(method: string, url: string, data: Record<string, any> | null = null): void {
        console.log(`[${method}] Request: ${url}`);
        if (data) {
            console.log(`Payload: ${JSON.stringify(data)}`);
        }
    }

    static async logResponse(response: APIResponse): Promise<void> {
        console.log(`Response Status: ${response.status()}`);
        const body = await response.json();
        console.log(`Response Body: ${JSON.stringify(body)}`);
    }
}
