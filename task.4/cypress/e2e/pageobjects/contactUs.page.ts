import { BasePage } from './base.page';

export class ContactUsPage extends BasePage {

    visitContactUs(): void {
    this.navigateTo('/contact-us');
    }
    getContactFormField(selector: string) {
    return cy.get(selector);
    }
    clickCookieSettings() {
        cy.wait(4000); 
    return cy.get('.ot-floating-button__open:visible, .ot-floating-button__close:visible').click({ force: true });
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
}
