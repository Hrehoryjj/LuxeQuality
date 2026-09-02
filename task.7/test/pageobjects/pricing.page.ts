import BasePage from './base.page';

class PricingPage extends BasePage {
  private static readonly SERVICES_TABLE = 'div[data-state="active"] table';
private static readonly PRICE_CELLS = 'div[data-state="active"] table tbody td div.bg-transparent';

  private static readonly MESSAGING_API_LINK = 'a[href="/pricing/messaging"]';

  private get messagingApiLink() {
    return $(PricingPage.MESSAGING_API_LINK);
  }

  private get servicesTable() {
    return $(PricingPage.SERVICES_TABLE);
  }

  private get priceCellsWithDollar() {
    return $$(PricingPage.PRICE_CELLS);
  }

  async navigateToPricing() {
    await this.navigateTo('/pricing');
  }

  async clickMessagingApiLink() {
    await this.messagingApiLink.scrollIntoView();
    await browser.execute((el) => (el as HTMLElement).click(), await this.messagingApiLink);
  }

  async isServicesTableDisplayed() {
    return this.servicesTable.isDisplayed();
  }

  async getPriceCellsValues(): Promise<number[]> {
    const cells = await this.priceCellsWithDollar;
    const values: number[] = [];
    for (const cell of cells) {
      const text = await cell.getText();
      if (text.includes('$')) {
        const cleanPrice = text.replace('$', '').split(' ')[0].trim();
        values.push(parseFloat(cleanPrice));
      }
    }
    return values;
  }
}

export default new PricingPage();