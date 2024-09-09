Task 2 - QA Home assignment - masood ghasemzadeh 

A set of simple API tests for PET API microservice using Playwright.  

**Installation**
> npm install

**How to run the tests**

The following will execute all tests on all defined environments:
> npm run test

Or, test only on specific environment could be executed via:
> npm run test:staging

**Test results**
Test reports are available in HTML and json formats in 'test-results' folder.

**What could be improved**
- Test Organization: Group/Tag tests
- Edge Case Testing: Include tests for edge cases, like boundary values or invalid inputs (e.g., testing pets with extreme ages or invalid types like negative numbers, empty strings).
- Test Cleanup: Implement test cleanup logic after every test (especially for POST, PUT, and DELETE requests). Ensure that tests don’t leave data behind in the system and are idempotent (tests can run repeatedly without side effects).
- Improve Logging: Implement custom logging with different log levels (e.g., info, warn, error)
- Request Validation and Schema Testing (Contract Testing)