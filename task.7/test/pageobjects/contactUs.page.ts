import BasePage from './base.page';

class ContactUsPage extends BasePage {
  private static readonly FORM_FIELDS_SELECTOR =
    '#mktoForm_1987 input[type="text"], #mktoForm_1987 input[type="email"]';
  private static readonly SUBMIT_BUTTON_SELECTOR = 'button[type="submit"]';
  
  //private get cookieSettingsToggle() {
  //   return $('.ot-floating-button__open');
  //}
  private get confirmChoicesButton() {
    return $('button.save-preference-btn-handler*=Confirm My Choices');
  }
  private get reasonForContactDropdown() {
    return $('select[name="Reason_for_Contact__c"]');
  }
  private get cookieSettingsPanel() {
    return $('#ot-pc-content');
  }
  private get formFields() {
    return $$(ContactUsPage.FORM_FIELDS_SELECTOR);
  }
  private get submitButton() {
    return $(ContactUsPage.SUBMIT_BUTTON_SELECTOR);
  }
  async visitContactUs() {
    await this.navigateTo('/contact-us');
  }
  async isSubmitButtonClickable() {
    await this.submitButton.scrollIntoView();
    return this.submitButton.isClickable();
  }
  async getReasonDropdownOptionsCount() {
    const options = await this.reasonForContactDropdown.$$('option');
    return options.length;
  }
  async allFormFieldsAcceptValue(value: string): Promise<boolean> {
  const fields = await this.formFields;
  const count = await fields.length;
  if (count === 0) return false;
  for (const field of fields) {
    await field.waitForClickable({ timeout: 5000 });
    await field.setValue(value);
    await browser.pause(200);
    const actual = await field.getValue();
    if (actual !== value) {
      await field.setValue(value);
      await browser.pause(200);
      const retryActual = await field.getValue();
      if (retryActual !== value) return false;
    }
    await field.clearValue();
  }
  return true;
}
 async clickCookieSettings() {
  await browser.execute(() => {
    const btn = document.querySelector('.ot-floating-button__open') as HTMLElement;
    btn?.click();
  });
  await this.cookieSettingsPanel.waitForExist({ timeout: 10000 });
}
  async isCookieSettingsPanelDisplayed() {
    return this.cookieSettingsPanel.isDisplayed();
  }
  async isConfirmChoicesButtonClickable() {
    return this.confirmChoicesButton.isClickable();
  }
}
export default new ContactUsPage();