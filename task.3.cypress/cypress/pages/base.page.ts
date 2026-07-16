export class BasePage {
    navigateTo(url: string): void {
        cy.visit(url);
    }

    protected acceptCookiesIfPresent(): void {
        cy.get('body').then(($body) => {
            const acceptButton = $body.find('button:contains("Accept All")');
            if (acceptButton.length > 0) {
                cy.wrap(acceptButton.first()).click();
            }
        });
    }

    protected get headerContainer() {
        return cy.get('#site-header');
    }

    protected get footerContainer() {
        return cy.get('#site-footer');
    }

    protected get telnyxLogo() {
        return this.headerContainer.find('a[href="/"]').first();
    }

    clickLogo(): void {
        this.telnyxLogo.click();
    }
}