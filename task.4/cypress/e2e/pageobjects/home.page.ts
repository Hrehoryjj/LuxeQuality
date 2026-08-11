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
    getHeaderContainer() {
        return cy.get('#site-header');
    }
    waitForDropdownToOpen() {
        return cy.get('#main-menu-content');
    }
    protected get submenuLink() {
        return (linkText: string) => cy.get('#main-menu-content a:visible').contains(linkText);
    }
    protected get contactUsButton() {
        return cy.get('a[href="/contact-us"]');
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