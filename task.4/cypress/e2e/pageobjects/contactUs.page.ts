import { BasePage } from './base.page';

export class ContactUsPage extends BasePage {

    visitContactUs(): void {
        this.navigateTo('/contact-us');
    }
    getContactFormField(selector: string) {
        return cy.get(selector);
    }
    detectCoockiesettings() {
        return cy.get('.ot-floating-button__open:visible, .ot-floating-button__close:visible');
    }
    clickCookieSettings() {
        this.detectCoockiesettings().click({ force: true });
    }
    acceptConfirmChoicesButton(){
        return cy.contains('button.save-preference-btn-handler', 'Confirm My Choices');
    }
    getReasonForContactDropdown() {
        return cy.get('select[name="Reason_for_Contact__c"]');
    }
    getCookeSettingsPanel() {
        return cy.get('#ot-pc-content');
    }
    private static readonly FORM_FIELDS_SELECTOR = '#mktoForm_1987 input[type="text"], #mktoForm_1987 input[type="email"]';
    private static readonly SUBMIT_BUTTON_SELECTOR = 'button[type="submit"]';
    getFormFields() {
        return cy.get(ContactUsPage.FORM_FIELDS_SELECTOR);
    }
    getSubmitButton() {
        return cy.get(ContactUsPage.SUBMIT_BUTTON_SELECTOR);
    }
}
