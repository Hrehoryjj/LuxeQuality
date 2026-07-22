import { HomePage } from '../pages/home.page';
import { faker } from '@faker-js/faker';
const homePage = new HomePage();
describe('UI', () => {
    beforeEach(() => {
        homePage.navigateToHome();
    });

    it('TC-06: AI Chat Returns Non-Empty Response', () => {
        const message = faker.lorem.sentence();
        homePage.typeAiChatMessage(message);
        homePage.submitAiChatMessage();
        homePage.getAiChatResponse().should('not.be.empty');
    });
    it('TC-07: Contact Us Submit Button Is Clickable', () => {
        homePage
            .isContactUsButtonClickable()
            .should('be.visible')
            .and('not.be.disabled');
    });
});