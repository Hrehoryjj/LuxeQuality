import BasePage from './base.page';

class PricingPage extends BasePage {
  private get messagingApiLink() {
    return $('a[href="/pricing/messaging"]');
  }
  private get servicesTable() {
    return $('#services');
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
  private get priceCellsWithDollar() {
  return $$('#services div.bg-transparent');
}

async getPriceCellsValues(): Promise<number[]> {
  const cells = await this.priceCellsWithDollar;
  const values: number[] = [];
  for (const cell of cells) {
    const text = await cell.getText();
    if (text.includes('$')) {
      values.push(parseFloat(text.replace('$', '').trim()));
    }
  }
  return values;
}
}
export default new PricingPage();