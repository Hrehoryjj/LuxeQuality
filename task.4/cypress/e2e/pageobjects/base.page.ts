export class BasePage {
    private static readonly COOKIE_BANNER_CLOSE_BUTTON = '#onetrust-close-btn-container button.onetrust-close-btn-handler';
    navigateTo(url: string): void {
        cy.visit(url);
        this.dismissCookieBannerIfPresent();
    }
   private dismissCookieBannerIfPresent(): void {
    cy.document().then((doc) => {
        return new Cypress.Promise((resolve) => {
            const checkInterval = setInterval(() => {
                const closeButton = doc.querySelector(BasePage.COOKIE_BANNER_CLOSE_BUTTON);
                if (closeButton) {
                    clearInterval(checkInterval);
                    resolve(true);
                }
            }, 100);
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve(false);
            }, 3000);
        });
    }).then((bannerFound) => {
        if (bannerFound) {
            cy.get(BasePage.COOKIE_BANNER_CLOSE_BUTTON).click();
        }
    });
}
}