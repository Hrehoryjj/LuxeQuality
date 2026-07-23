import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import { ContactUsPage } from '../pageobjects/contactUs.page';

const contactUsPage = new ContactUsPage();
const FORM_FIELDS_SELECTOR = '#mktoForm_1987 input[type="text"], #mktoForm_1987 input[type="email"]';
let generatedSymbol: string;

Given('I am on the contact-us page', () => {
  contactUsPage.visitContactUs();
});
Then('the {string} button should be clickable', (label: string) => {
  contactUsPage.getContactFormField('button[type="submit"]').should('be.visible').and('not.be.disabled');
});
When('I click on the {string} contact reason dropdown', (label: string) => {
  contactUsPage.getReasonForContactDropdown().focus();
});
Then('two options should appear', () => {
  contactUsPage.getReasonForContactDropdown().find('option').should('have.length', 3);
});
When('I input a randomly generated symbol into the contact form fields', () => {
  generatedSymbol = faker.string.alpha(1).toUpperCase();
  contactUsPage.getContactFormField(FORM_FIELDS_SELECTOR).each(($field) => {
    cy.wrap($field).type(generatedSymbol);
  });
});
Then('the fields should accept the symbol', () => {
  contactUsPage.getContactFormField(FORM_FIELDS_SELECTOR).each(($field) => {
    cy.wrap($field).should('have.value', generatedSymbol);
  });
});
When('I clear the fields', () => {
  contactUsPage.getContactFormField(FORM_FIELDS_SELECTOR).each(($field) => {
    cy.wrap($field).clear();
  });
});
Then('the fields should be empty', () => {
  contactUsPage.getContactFormField(FORM_FIELDS_SELECTOR).each(($field) => {
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