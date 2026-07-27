export class BasePage {
    private static readonly COOKIE_BANNER_ACCEPT_BUTTON = '#onetrust-accept-btn-handler';

    navigateTo(url: string): void {
        cy.visit(url);
    }
}