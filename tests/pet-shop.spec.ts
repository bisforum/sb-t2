import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utils/ApiHelper';
import petData from './fixtures/pet-data.json';


test.describe('Pet API Tests', () => {

    test('Should fetch all pets successfully when GET all is called', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        const response = await ApiHelper.get(request, url);

        expect(response.status()).toBe(200);
        const pets = await response.json();
        expect(Array.isArray(pets)).toBeTruthy();
    });

    test('Should add a new pet successfully when POST is called', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        const response = await ApiHelper.post(request, url, petData.newPet);

        expect(response.status()).toBe(201);
        const pet = await response.json();
        expect(pet.name).toBe(petData.newPet.name);
    });

    test('Should delete a pet by ID', async ({ request, baseURL }) => {
        // Given: A pet exists
        const addUrl = `${baseURL}/pet`;
        const addResponse = await ApiHelper.post(request, addUrl, petData.newPet);
        const addedPet = await addResponse.json();
        const url = `${baseURL}/pet/${addedPet.id}`;

        // When: Delete the pet
        const response = await ApiHelper.delete(request, url);
        console.log(response)

        expect(response.status()).toBe(204);
    });


    test('Should update a pet by ID via request body', async ({ request, baseURL }) => {
        const url = `${baseURL}/pet`;

        // Given: A pet exists
        const addResponse = await ApiHelper.post(request, url, petData.newPet);
        const addedPet = await addResponse.json();

        const updatedPetData = { ...petData.updatePet, id: addedPet.id };

        const response = await ApiHelper.put(request, url, updatedPetData);

        expect(response.status()).toBe(200);
        const updatedPet = await response.json();
        expect(updatedPet.age).toBe(petData.updatePet.age);
    });

    test('Should update a pet by ID via path parameter', async ({ request, baseURL }) => {
        // Given: A pet exists
        const addUrl = `${baseURL}/pet`;
        const addResponse = await ApiHelper.post(request, addUrl, petData.newPet);
        const addedPet = await addResponse.json();

        const url = `${baseURL}/pet/${addedPet.id}`;

        const response = await ApiHelper.put(request, url, petData.updatePet);

        expect(response.status()).toBe(200);
        const updatedPet = await response.json();
        expect(updatedPet.age).toBe(petData.updatePet.age);
    });


});
