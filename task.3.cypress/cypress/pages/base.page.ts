export class BasePage {
    navigateTo(url: string): void {
        cy.visit(url);
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