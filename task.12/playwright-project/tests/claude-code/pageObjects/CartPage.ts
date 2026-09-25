import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  async clickCartLink(): Promise<void> {
    await this.page.getByRole('banner').getByRole('link', { name: 'Cart' }).click();
  }

  getProductRow(productId: number): Locator {
    return this.page.locator(`#product-${productId}`);
  }

  async removeProduct(productId: number): Promise<void> {
    await this.page.locator(`.cart_quantity_delete[data-product-id="${productId}"]`).click();
  }
}
