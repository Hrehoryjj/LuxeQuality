import { PricingPage } from '../pages/pricing.page';

const pricingPage = new PricingPage();

describe('Pricing', () => {
    beforeEach(() => {
        pricingPage.navigateToPricing();
    });

    it('TC-05: Pricing Page Displays Valid Price Values', () => {
        pricingPage.getPriceCells().should('have.length.greaterThan', 0);
        pricingPage.getPriceCells().each(($cell) => {
            const text = $cell.text().trim();
            expect(text).to.match(/^\$?\d+(\.\d{1,2})?$/);
        });
    });
});