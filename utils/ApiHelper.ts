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



}
