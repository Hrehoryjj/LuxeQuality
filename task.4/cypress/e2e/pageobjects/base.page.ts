export class BasePage {
    private static readonly COOKIE_BANNER_ACCEPT_BUTTON = '#onetrust-accept-btn-handler';
    private static readonly COOKIE_FLOATING_BUTTON = '#ot-sdk-btn-floating button.ot-floating-button__open';

    navigateTo(url: string): void {
        cy.visit(url);
        this.dismissCookieBannerIfPresent();
    }

    private dismissCookieBannerIfPresent(): void {
        cy.document().then((doc) => {
            return new Cypress.Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    const acceptButton = doc.querySelector(BasePage.COOKIE_BANNER_ACCEPT_BUTTON);
                    if (acceptButton) {
                        clearInterval(checkInterval);
                        resolve(true);
                    }
                }, 100);
                setTimeout(() => {
                    clearInterval(checkInterval);
                    resolve(false);
                }, 8000);
            });
        }).then((bannerFound) => {
            if (bannerFound) {
                cy.get(BasePage.COOKIE_BANNER_ACCEPT_BUTTON).click();
                cy.get(BasePage.COOKIE_FLOATING_BUTTON, { timeout: 10000 }).should('exist');
            }
        });
    }
}