import { BasePage } from './base.page';

export class PricingPage extends BasePage {
    navigateToPricing(): void {
        this.navigateTo('/pricing');
    }

    protected get priceCells() {
        return cy.get('.pricing-table__cell');
    }

    getPriceCells() {
        return this.priceCells;
    }
}