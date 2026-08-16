export default abstract class BasePage {
  private static readonly COOKIE_BANNER_ACCEPT_BUTTON = '#onetrust-accept-btn-handler';
  async navigateTo(url: string) {
    await browser.url(url);
    await this.dismissCookieBannerIfPresent();
  }
  private async dismissCookieBannerIfPresent() {
    const acceptButton = $(BasePage.COOKIE_BANNER_ACCEPT_BUTTON);
    const bannerFound = await acceptButton
      .waitForExist({ timeout: 3000, timeoutMsg: '' })
      .catch(() => false);
    if (bannerFound) {
      await acceptButton.click();
    }
  }
}