import BasePage from './base.page';

class ContactUsPage extends BasePage {
  private static readonly FORM_FIELDS_SELECTOR =
    '#mktoForm_1987 input[type="text"], #mktoForm_1987 input[type="email"]';
  private static readonly SUBMIT_BUTTON_SELECTOR = 'button[type="submit"]';
  
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
  
  for (const field of fields) {
    await field.setValue(value);
    
    if (await field.getValue() !== value) {
      return false;
    }
    
    await field.clearValue();
  }
  return true;
}


 async clickCookieSettings() {
  const bannerButton = $('#onetrust-pc-btn-handler');
  const bannerVisible = await bannerButton.isExisting();

  if (bannerVisible) {
    await bannerButton.click();
  } else {
    await browser.execute(() => {
      const btn = document.querySelector('.ot-floating-button__open') as HTMLElement;
      btn?.click();
    });
  }

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