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
    reporter: [['html', { outputFolder: 'test-results', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }]],
});
