import { $$, $ } from '@wdio/globals';
import BasePage from './base.page';

class PricingPage extends BasePage {
  private get messagingApiLink() {
    return $('a[href="/pricing/messaging"]');
  }
  private get servicesTable() {
    return $('#services');
  }
  private get priceCellsWithDollar() {
    return $$('#services div.bg-transparent');
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
    await browser.waitUntil(
      async () => {
        const cells = await this.priceCellsWithDollar;
        if ((await cells.length) === 0) return false;
        
        const firstText = await cells[0].getText();
        return firstText.includes('$');
      },
      { timeout: 15000, interval: 500 }
    ).catch(() => {});

    const cells = await this.priceCellsWithDollar;
    const values: number[] = [];
    
    for (const field of cells) {
      const text = await field.getText();
      if (text.includes('$')) {
        const cleanedText = text.replace('$', '').trim();
        const parsed = parseFloat(cleanedText);
        if (!isNaN(parsed)) {
          values.push(parsed);
        }
      }
    }
    return values;
  }
}

export default new PricingPage();
