import BasePage from './base.page';

class HomePage extends BasePage {
  private get headerContainer() {
    return $('#site-header');
  }

  private get footerContainer() {
    return $('#site-footer');
  }

  private get telnyxLogo() {
    return this.headerContainer.$('a[href="/"]');
  }

  private navMenuItem(itemName: string) {
    return this.headerContainer.$(`//*[self::button or self::a][contains(., "${itemName}")]`);
  }

  private get dropdownContent() {
    return $('#main-menu-content');
  }

  private submenuLink(linkText: string) {
    return this.dropdownContent.$(`a*=${linkText}`);
  }

  private get contactUsButton() {
    return $('a[href="/contact-us"]');
  }

  private get shopLink() {
    return this.footerContainer.$('a[href="https://shop.telnyx.com/"]');
  }

  private get footerCopyrightText() {
    return this.footerContainer.$('div.flex.flex-col.gap-new-xs').$$('.typography-p-caption-mobile')[0];
  }

  private get securityBadgesText() {
    return this.footerContainer.$('div.typography-p-caption-mobile*=ISO');
  }

  private getSocialLink(hostFragment: string) {
    return this.footerContainer.$(`a[href*="${hostFragment}"]`);
  }


  async navigateToHome() {
    await this.navigateTo('/');
  }

  async isHeaderDisplayed() {
    return this.headerContainer.isDisplayed();
  }
    private get useCaseSectionHeading() {
  return $('p*=SELECT USE CASE');
}

private get useCaseButtons() {
  return $$('button[aria-pressed]');
}

async getUseCaseButtonsCount() {
  await this.useCaseSectionHeading.scrollIntoView();
  await browser.pause(500);
  const buttons = await this.useCaseButtons;
  let visibleCount = 0;
  for (const button of buttons) {
    if (await button.isDisplayed()) visibleCount++;
  }
  return visibleCount;
}

async areAllUseCaseButtonsClickable() {
  await this.useCaseSectionHeading.scrollIntoView();
  await browser.pause(500);
  const buttons = await this.useCaseButtons;
  const visibleButtons = [];
  for (const button of buttons) {
    if (await button.isDisplayed()) visibleButtons.push(button);
  }
  if (visibleButtons.length === 0) return false;
  for (const button of visibleButtons) {
    await button.scrollIntoView();
    const clickable = await button.isClickable();
    if (!clickable) return false;
  }
  return true;
}

  async getSecurityBadgesText() {
    await this.securityBadgesText.scrollIntoView();
    return this.securityBadgesText.getText();
  }

  async clickLogo() {
    await this.telnyxLogo.click();
  }

  async areAllTopLevelNavItemsDisplayed() {
    const items = ['Products', 'Solutions', 'Pricing', 'Why Telnyx', 'Resources', 'Developers'];
    for (const item of items) {
      const displayed = await this.navMenuItem(item).isDisplayed();
      if (!displayed) return false;
    }
    return true;
  }

  async openSolutionsDropdown() {
    await this.navMenuItem('Solutions').click();
    await this.dropdownContent.waitForDisplayed();
  }

  async openProductsDropdown() {
    await this.navMenuItem('Products').click();
    await this.dropdownContent.waitForDisplayed();
  }

  async openWhyTelnyxDropdown() {
    await this.navMenuItem('Why Telnyx').click();
    await this.dropdownContent.waitForDisplayed();
  }

  async openDevelopersDropdown() {
    await this.navMenuItem('Developers').click();
    await this.dropdownContent.waitForDisplayed();
  }

  async isDropdownDisplayed() {
    return this.dropdownContent.isDisplayed();
  }

  async clickViewAllPrimitivesLink() {
    const links = await $$('a*=View all primitives');
    for (const link of links) {
        if (await link.isDisplayed()) {
        await link.click();
        return;
    }
    }
    }

  async isDevDocsLinkDisplayed() {
    return this.submenuLink('Dev Docs').isDisplayed();
  }

  async isDevDocsLinkClickable() {
    return this.submenuLink('Dev Docs').isClickable();
  }

  async clickContactUsButton() {
    await this.contactUsButton.click();
  }

  async getFooterColumnLinks(columnTitle: string): Promise<string[]> {
    const column = this.footerContainer.$(`*=${columnTitle}`).$('..');
    const links = await column.$$('a[href]');
    const hrefs: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) hrefs.push(href.startsWith('http') ? href : `https://telnyx.com${href}`);
    }
    return [...new Set(hrefs)];
  }

  async getSocialLinkTarget(hostFragment: string) {
    return this.getSocialLink(hostFragment).getAttribute('target');
  }

  async getShopLinkHref() {
    return this.shopLink.getAttribute('href');
  }

  async getShopLinkTarget() {
    return this.shopLink.getAttribute('target');
  }

  async getFooterCopyrightText() {
    await this.footerContainer.scrollIntoView();
    return this.footerCopyrightText.getText();
  }
}

export default new HomePage();