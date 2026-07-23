import { BasePage } from './base.page';

export class PricingPage extends BasePage {
    navigateToPricing(): void {
        this.navigateTo('/pricing');
    }
    getPriceCellsWithDollar() {
        return cy.get('#services div.bg-transparent:contains("$")');
    }
}