import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utils/ApiHelper';

test.describe('Pet API Tests', () => {

    // Test: GET all pets
    test('Should fetch all pets successfully', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        const response = await ApiHelper.get(request, url);

        expect(response.status()).toBe(200);
        const pets = await response.json();
        expect(Array.isArray(pets)).toBeTruthy();
    });

});
