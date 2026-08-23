import { randomData } from '../utils/randomData';
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
    const name = await field.getAttribute('name');
    let fieldValue = value;
    if (name === 'Phone_Number_Base__c') fieldValue = '5551234567';
    if (name === 'Email') fieldValue = randomData.email();

    await field.setValue(fieldValue);
    if ((await field.getValue()) !== fieldValue) return false;
    await field.clearValue();
  }
  return true;
}
    async clickCookieSettings() {
    await browser.execute(() => {
      if (typeof (window as any).OneTrust !== 'undefined') {
        (window as any).OneTrust.ToggleInfoDisplay();
      } else {
        const btn = document.querySelector('#onetrust-pc-btn-handler') || 
                    document.querySelector('.ot-floating-button__open') ||
                    document.querySelector('#ot-sdk-btn');
        (btn as HTMLElement)?.click();
      }
    });

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