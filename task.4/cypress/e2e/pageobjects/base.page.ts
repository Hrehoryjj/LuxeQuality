export class BasePage {
    private static readonly COOKIE_BANNER_CLOSE_BUTTON = '#onetrust-close-btn-container button.onetrust-close-btn-handler';

    navigateTo(url: string): void {
        cy.visit(url);
        this.dismissCookieBannerIfPresent();
    }

    private dismissCookieBannerIfPresent(): void {
        cy.get('body').then(($body) => {
            const closeButton = $body.find(BasePage.COOKIE_BANNER_CLOSE_BUTTON);
            if (closeButton.length > 0) {
                cy.wrap(closeButton.first()).click();
            }
        });
    }
}