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
      await field.scrollIntoView({ block: 'center' });
      
      const fieldType = await field.getAttribute('type');
      const cleanValue = fieldType === 'email' ? value.replace(/\s+/g, '') + '@test.com' : value;

      await field.setValue(cleanValue);
      
      const isValueEntered = await field.waitUntil(
        async () => (await field.getValue()) === cleanValue,
        { timeout: 5000 }
      ).catch(() => false);

      if (!isValueEntered) {
        return false;
      }
      
      await field.clearValue();
    }
    return true;
  }

  async clickCookieSettings() {
    const bannerButton = $('#onetrust-pc-btn-handler');
    const openBtn = $('.ot-floating-button__open');

    await browser.waitUntil(
      async () => (await bannerButton.isDisplayed()) || (await openBtn.isDisplayed()),
      { timeout: 15000 }
    );

    if (await bannerButton.isDisplayed()) {
      await bannerButton.waitForClickable({ timeout: 5000 });
      await browser.execute((el) => (el as HTMLElement).click(), await bannerButton);
    } else {
      await openBtn.waitForClickable({ timeout: 5000 });
      await browser.execute((el) => (el as HTMLElement).click(), await openBtn);
    }

    await this.cookieSettingsPanel.waitForExist({ timeout: 15000 });
  }

  async isCookieSettingsPanelDisplayed() {
    return this.cookieSettingsPanel.isDisplayed();
  }
  async isConfirmChoicesButtonClickable() {
    return this.confirmChoicesButton.isClickable();
  }
}
export default new ContactUsPage();