import { BasePage } from './base.page';

export class HomePage extends BasePage {
    navigateToHome(): void {
        this.navigateTo('/');
    }

    protected get navMenuItem() {
        return (itemName: string) =>
            this.headerContainer.find('button[aria-haspopup="menu"]').contains(itemName);
    }

    clickNavMenuItem(itemName: string): void {
        this.navMenuItem(itemName)
            .trigger('pointerdown', { button: 0 })
            .trigger('pointerup', { button: 0 })
            .click({ force: true });
    }

    isDropdownOpenFor(itemName: string) {
        return cy.get('[role="menu"]').should('be.visible');
    }

    protected get submenuLink() {
        return (linkText: string) => cy.get('[role="menu"]').contains('a', linkText);
    }

    clickSubmenuLink(linkText: string): void {
        this.submenuLink(linkText).click();
    }

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