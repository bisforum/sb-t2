import { defineConfig } from '@playwright/test';
import environments from './config/environments.json';

export default defineConfig({
    projects: [
        {
            name: 'staging',
            use: {
                baseURL: environments.staging.baseUrl
            }
        },
        {
            name: 'production',
            use: {
                baseURL: environments.production.baseUrl
            }
        }
    ],
    reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
});
