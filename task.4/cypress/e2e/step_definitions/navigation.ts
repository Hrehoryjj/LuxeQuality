import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../pageobjects/home.page';
import testData from '../../fixtures/testData.json';
const homePage = new HomePage();
Then('the main header area with the Telnyx logo should be visible', () => {
  cy.get('#site-header').should('be.visible');
});
When('I click the logo', () => {
  homePage.clickLogo();
});
Then('I should be redirected to the main page', () => {
  cy.location('pathname').should('eq', '/');
});
Then('all 6 navigation tabs should be visible in the header', () => {
  testData.mainNavItems.forEach((item) => {
    homePage.isNavMenuItemVisible(item).should('be.visible');
  });
});
When('I click on the {string} navigation dropdown', (itemName: string) => {
  homePage.clickNavMenuItem(itemName);
});
Then('the dropdown should appear', () => {
  homePage.waitForDropdownToOpen().should('be.visible');
});
When('I scroll to the AI agents tabs', () => {
  homePage.getAiAgentTabs().first().scrollIntoView();
});
Then('the tabs should be visible', () => {
  homePage.getAiAgentTabs().should('have.length', 6);
  homePage.getAiAgentTabs().each(($tab) => {
    cy.wrap($tab).should('be.visible');
  });
});
Then('the tabs should be clickable', () => {
  const tabNames = ['Inference' , 'Voice Agent Builder', 'Speech to Text', 'Text to Speech', 'Global Numbers', 'Agent Skills'];
  tabNames.forEach((tabName) => {
    homePage.clickAiAgentTab(tabName);
    homePage.getAiAgentTabByName(tabName).should('have.attr', 'aria-selected', 'true');
  });
});