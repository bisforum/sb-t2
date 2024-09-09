import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiHelper {
    static async get(request: APIRequestContext, url: string): Promise<APIResponse> {
        try {
            const response = await request.get(url);
            expect(response.ok()).toBeTruthy();
            return response;
        } catch (error) {
            console.error(`GET ${url} failed:`, error);
            throw error;
        }
    }

    static async post(request: APIRequestContext, url: string, data: Record<string, any>): Promise<APIResponse> {
        try {
            const response = await request.post(url, { data });
            expect(response.ok()).toBeTruthy();
            return response;
        } catch (error) {
            console.error(`POST ${url} failed:`, error);
            throw error;
        }
    }

}
