import { test, expect } from '../fixtures/test';
import { LoginPage } from '../pageObjects/LoginPage';

test.describe('TC-08 Register with an already existing email', () => {
  test('shows an error and does not create a second account', async ({ page, registeredUser }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open('/login');
    await expect(loginPage.getNewUserSignupHeading()).toBeVisible();

    await loginPage.signup('QA Tester Duplicate', registeredUser.email);

    await expect(loginPage.getSignupErrorMessage()).toBeVisible();
  });
});
