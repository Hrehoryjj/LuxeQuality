import { BasePage } from './base.page';

export class HomePage extends BasePage {
    navigateToHome(): void {
        this.navigateTo('/');
    }
    protected get navMenuItem() {
       return (itemName: string) =>
            this.headerContainer.find('button, a').contains(itemName);
    }
    clickNavMenuItem(itemName: string): void {
        this.navMenuItem(itemName)
            .trigger('pointerdown', { button: 0 })
            .trigger('pointerup', { button: 0 })
            .click();
    }
    waitForDropdownToOpen() {
        return cy.get('#main-menu-content');
    }
    protected get submenuLink() {
        return (linkText: string) => cy.get('#main-menu-content a:visible').contains(linkText);
    }
    clickSubmenuLink(linkText: string): void {
        this.submenuLink(linkText).click();
    }
    protected get contactUsButton() {
        return cy.get('a[href="/contact-us"]');
    }
    clickContactUsButton(): void {
        this.contactUsButton.click();
    }
    isContactUsButtonClickable() {
        return this.contactUsButton;
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
    isNavMenuItemVisible(itemName: string) {
    return this.navMenuItem(itemName);
    }
    getFooterColumnLinks(columnTitle: string) {
        return this.footerContainer
        .contains(columnTitle)
        .parent()
        .find('a[href]')
        .then(($links) =>
            Cypress._.uniq($links.map((_, el) => (el as HTMLAnchorElement).href).get())
        );
    }
    getSocialLink(hostFragment: string) {
    return this.footerContainer.find(`a[href*="${hostFragment}"]`);
    }
    protected get aiAgentTabs() {
        return cy.get('[role="tablist"][aria-orientation="horizontal"] button[role="tab"]');
    }
    getAiAgentTabs() {
        return this.aiAgentTabs;
    }
    getAiAgentTabByName(tabName: string) {
        return this.aiAgentTabs.contains('span', tabName).parent('button[role="tab"]');
    }
    clickAiAgentTab(tabName: string): void {
        this.getAiAgentTabByName(tabName).click();
    }
}