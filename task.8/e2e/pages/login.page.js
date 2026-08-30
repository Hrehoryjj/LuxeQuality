class LoginPage extends BasePage {
  get navLoginButton() { return '~Login'; }
  get signUpTab() { return '~button-sign-up-container'; }
  get emailInput() { return '~input-email'; }
  get passwordInput() { return '~input-password'; }
  get confirmPasswordInput() { return '~input-repeat-password'; }
  get signUpButton() { return '~button-SIGN UP'; }
  get successAlertTitle() { return '//*[@resource-id="android:id/alertTitle"]'; }
  get successAlertMessage() { return '//*[@resource-id="android:id/message"]'; }
  get successOkButton() { return '//*[@resource-id="android:id/button1"]'; }

  async openLoginScreen() {
    await this.tap(this.navLoginButton);
  }

  async switchToSignUp() {
    await this.tap(this.signUpTab);
  }

  async fillSignUpForm(email, password) {
    await this.setValue(this.emailInput, email);
    await this.setValue(this.passwordInput, password);
    await this.setValue(this.confirmPasswordInput, password);
  }

  async submitSignUp() {
    await this.tap(this.signUpButton);
  }

  async getEmailValue() {
    const el = await $(this.emailInput);
    return el.getValue();
  }

  async getPasswordValue() {
    const el = await $(this.passwordInput);
    return el.getValue();
  }

  async getConfirmPasswordValue() {
    const el = await $(this.confirmPasswordInput);
    return el.getValue();
  }

  async isSignUpButtonEnabled() {
    const el = await $(this.signUpButton);
    return el.isEnabled();
  }

  async getSuccessAlertText() {
    return this.getText(this.successAlertMessage);
  }

  async dismissSuccessAlert() {
    await this.tap(this.successOkButton);
  }
}

module.exports = new LoginPage();