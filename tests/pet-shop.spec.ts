import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utils/ApiHelper';
import petData from './fixtures/pet-data.json';
import { Logger } from '../utils/Logger';


test.describe('Pet API Tests', () => {

    test('Should fetch all pets successfully when GET all is called', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        Logger.logRequest('GET', url);
        const response = await ApiHelper.get(request, url);
        await Logger.logResponse(response);

        expect(response.status()).toBe(200);
        const pets = await response.json();
        expect(Array.isArray(pets)).toBeTruthy();
    });

    test('Should add a new pet successfully when POST is called', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        Logger.logRequest('POST', url, petData.newPet);
        const response = await ApiHelper.post(request, url, petData.newPet);
        await Logger.logResponse(response);

        expect(response.status()).toBe(201);
        const pet = await response.json();
        expect(pet.name).toBe(petData.newPet.name);
    });

    test('Should return 404 when trying to add a new pet without a name', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        const invalidPetData = {
            type: "Dog",
            age: 3
        }; // Missing "name" field

        Logger.logRequest('POST', url, invalidPetData);
        const response = await ApiHelper.post(request, url, invalidPetData);
        await Logger.logResponse(response);

        expect(response.status()).toBe(404);
        const errorResponse = await response.json();

        expect(errorResponse.type).toBe('Parameter Exception');
        expect(errorResponse.errorMessage).toBe('Parameter \'name\' not set.');
    });



    test('Should delete a pet by ID', async ({ request, baseURL }) => {
        // Given: A pet exists
        const addUrl = `${baseURL}/pet`;
        const addResponse = await ApiHelper.post(request, addUrl, petData.newPet);
        const addedPet = await addResponse.json();
        const url = `${baseURL}/pet/${addedPet.id}`;

        // When: Delete the pet
        const response = await ApiHelper.delete(request, url);
        await Logger.logResponse(response);

        expect(response.status()).toBe(202); // API contract says 204!
    });
    test('Should return 404 when trying to delete a non-existent pet by ID', async ({ request, baseURL }) => {
        const neverExistingId = 0 // Assuming 0 is a non-existent ID
        const url = `${baseURL}/pet/${neverExistingId}`;

        Logger.logRequest('DELETE', url);
        const response = await ApiHelper.delete(request, url);
        await Logger.logResponse(response);

        expect(response.status()).toBe(404);
        const errorResponse = await response.json();

        expect(errorResponse.type).toBe('API Exception');
        expect(errorResponse.errorMessage).toBe(`Pet with id \'${neverExistingId}\' was not found.`);
    });


    test('Should update a pet by ID via request body', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        // Given: A pet exists
        const addResponse = await ApiHelper.post(request, url, petData.newPet);
        const addedPet = await addResponse.json();

        const updatedPetData = { ...petData.updatePet, id: addedPet.id };

        Logger.logRequest('PUT', url, updatedPetData);
        const response = await ApiHelper.put(request, url, updatedPetData);
        await Logger.logResponse(response);

        expect(response.status()).toBe(200);
        const updatedPet = await response.json();
        expect(updatedPet.age).toBe(petData.updatePet.age);
    });
    test('Should return 404 when trying to update a non-existent pet by ID in request body', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        const updatePetData = {
            id: 99999, // Assuming 99999 is a non-existent ID
            name: "Buddy",
            type: "Dog",
            age: 5
        };

        Logger.logRequest('PUT', url, updatePetData);
        const response = await ApiHelper.put(request, url, updatePetData);
        await Logger.logResponse(response);

        expect(response.status()).toBe(404);
        const errorResponse = await response.json();

        expect(errorResponse.type).toBe('API Exception');
        expect(errorResponse.errorMessage).toBe('Pet not found.');
    });

    test('Should update a pet by ID via path parameter', async ({ request, baseURL }) => {
        // Given: A pet exists
        const addUrl = `${baseURL}/pet`;
        const addResponse = await ApiHelper.post(request, addUrl, petData.newPet);
        const addedPet = await addResponse.json();

        const url = `${baseURL}/pet/${addedPet.id}`;

        Logger.logRequest('PUT', url, petData.updatePet);
        const response = await ApiHelper.put(request, url, petData.updatePet);

        expect(response.status()).toBe(200);
        const updatedPet = await response.json();
        expect(updatedPet.age).toBe(petData.updatePet.age);
    });
    test('Should return 404 when trying to update a non-existent pet by ID', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet/99999`; // Assuming 99999 is a non-existent ID

        const updatePetData = {
            name: "Buddy",
            type: "Dog",
            age: 5
        };

        Logger.logRequest('PUT', url, updatePetData);
        const response = await ApiHelper.put(request, url, updatePetData);
        await Logger.logResponse(response);

        expect(response.status()).toBe(404);
        const errorResponse = await response.json();

        expect(errorResponse.type).toBe('API Exception');
        expect(errorResponse.errorMessage).toBe('Pet not found.');
    });


});
