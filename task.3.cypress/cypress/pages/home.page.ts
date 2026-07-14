import { BasePage } from './base.page';

export class HomePage extends BasePage {
    navigateToHome(): void {
        this.navigateTo('/');
    }

    // ---- Navigation dropdown ----
    protected get navMenuItem() {
        return (itemName: string) =>
            this.headerContainer.contains('button, a', itemName);
    }

    protected get openDropdownMenu() {
        return cy.get('[data-state="open"], .nav-dropdown--open, .dropdown-menu--open');
    }

    protected get submenuLink() {
        return (linkText: string) => this.openDropdownMenu.contains('a', linkText);
    }

    clickNavMenuItem(itemName: string): void {
        this.navMenuItem(itemName).click();
    }

    clickSubmenuLink(linkText: string): void {
        this.submenuLink(linkText).click();
    }

    isDropdownVisible() {
        return this.openDropdownMenu;
    }

    // ---- AI Chat ----
    protected get aiChatInput() {
        return cy.get('input[placeholder="Type message here"]');
    }

    protected get aiChatSendButton() {
        return cy.get('button[type="submit"]');
    }

    protected get aiChatResponse() {
        return cy.get('.ai-chat-response');
    }

    typeAiChatMessage(message: string): void {
        this.aiChatInput.clear().type(message);
    }

    submitAiChatMessage(): void {
        this.aiChatSendButton.click();
    }

    getAiChatResponse() {
        return this.aiChatResponse;
    }

    // ---- Contact Us ----
    protected get contactUsButton() {
        return cy.get('a[href="/contact-us"]');
    }

    clickContactUsButton(): void {
        this.contactUsButton.click();
    }

    isContactUsButtonClickable() {
        return this.contactUsButton;
    }
}