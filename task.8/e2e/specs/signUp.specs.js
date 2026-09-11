const LoginPage = require('../pages/login.page');
const { randomEmail, randomPassword } = require('../data/generator');

describe('TC-05: Sign up with random credentials', () => {
  it('should successfully sign up with generated email and password', async () => {
    const email = await randomEmail();
    const password = await randomPassword();

    await LoginPage.openLoginScreen();
    await LoginPage.switchToSignUp();
    await LoginPage.fillSignUpForm(email, password);
    await LoginPage.submitSignUp();
    await LoginPage.waitUntilDisplayed(LoginPage.successAlertTitle, 15000);

    const alertVisible = await LoginPage.isDisplayed(LoginPage.successAlertTitle);
    expect(alertVisible).toBe(true);

    const message = await LoginPage.getSuccessAlertText();
    expect(message).toBe('You successfully signed up!');

    await LoginPage.dismissSuccessAlert();
  });
});