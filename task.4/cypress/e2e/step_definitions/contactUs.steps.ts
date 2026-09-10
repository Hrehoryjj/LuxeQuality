import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import { ContactUsPage } from '../pageobjects/contactUs.page';

const contactUsPage = new ContactUsPage();
let generatedSymbol: string;

Given('I am on the contact-us page', () => {
  contactUsPage.visitContactUs();
});
Then('the submit button should be clickable', () => {
  contactUsPage.getSubmitButton().should('be.visible').and('not.be.disabled');
});
When('I click on the {string} contact reason dropdown', (label: string) => {
  contactUsPage.getReasonForContactDropdown().focus();
  contactUsPage.getReasonForContactDropdown().find('option').first().should('have.text', label);
});
Then('two options should appear', () => {
  // The first <option> is the non-selectable placeholder shown in the dropdown
  // (asserted above against the step's label); only the remaining options are
  // real, selectable reasons.
  contactUsPage.getReasonForContactDropdown().find('option:not([value=""])').should('have.length', 2);
});
When('I input a randomly generated symbol into the contact form fields', () => {
  generatedSymbol = faker.string.alpha(1).toUpperCase();
  contactUsPage.getFormFields().each(($field) => {
    cy.wrap($field).type(generatedSymbol);
  });
});
Then('the fields should accept the symbol', () => {
  contactUsPage.getFormFields().each(($field) => {
    cy.wrap($field).should('have.value', generatedSymbol);
  });
});
When('I clear the fields', () => {
  contactUsPage.getFormFields().each(($field) => {
    cy.wrap($field).clear();
  });
});
Then('the fields should be empty', () => {
  contactUsPage.getFormFields().each(($field) => {
    cy.wrap($field).should('have.value', '');
  });
});
When('I click the cookie settings button', () => {
  contactUsPage.clickCookieSettings();
});
Then('the cookie settings panel should appear', () => {
  contactUsPage.getCookeSettingsPanel().should('be.visible');
});
When('I confirm my cookie choices', () => {
  contactUsPage.acceptConfirmChoicesButton().click({ force: true });
});
Then('the choice should be confirmed', () => {
  contactUsPage.getCookeSettingsPanel().should('not.be.visible');
});
Then('the cookie settings button should be visible', () => {
  contactUsPage.detectCoockiesettings().should('be.visible');
});
When('I see coockie settings button', () => {
  contactUsPage.detectCoockiesettings().should('be.visible');
});