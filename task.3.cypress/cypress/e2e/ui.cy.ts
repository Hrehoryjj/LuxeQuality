import { HomePage } from '../pages/home.page';
import { faker } from '@faker-js/faker';
const homePage = new HomePage();
describe('UI', () => {
    beforeEach(() => {
        homePage.navigateToHome();
    });
    it('TC-06: All AI tabs are visible and clickable', () => {
    const tabs = [
            'Inference',
            'Voice Agent Builder',
            'Speech to Text',
            'Text to Speech',
            'Global Numbers',
            'Agent Skills'
        ];
        tabs.forEach((tabName) => {
            homePage.getTabByName(tabName)
                .scrollIntoView()
                .should('be.visible')
                .click()
                .should('have.attr', 'aria-selected', 'true') 
                .and('have.attr', 'data-state', 'active'); 
        });
    });
    it('TC-07: Contact Us Submit Button Is Clickable', () => {
        homePage
            .isContactUsButtonClickable()
            .should('be.visible')
            .and('not.be.disabled');
    });
});