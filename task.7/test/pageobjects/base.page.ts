export default abstract class BasePage {
  private static readonly COOKIE_BANNER_ACCEPT_BUTTON = '#onetrust-accept-btn-handler';
    async navigateTo(url: string) {
        await browser.url(url);
        await browser.waitUntil(
        async () => (await browser.getUrl()).includes(url === '/' ? 'telnyx.com' : url),
        { timeout: 10000, timeoutMsg: `URL did not navigate to ${url} in time` }
    );
    await this.dismissCookieBannerIfPresent();
    }
  private async dismissCookieBannerIfPresent() {
        const acceptButton = $(BasePage.COOKIE_BANNER_ACCEPT_BUTTON);
        const bannerFound = await acceptButton
        .waitForExist({ timeout: 8000, timeoutMsg: '' })
        .catch(() => false);
    if (bannerFound) {
        await acceptButton.click();
        await browser.pause(500);
    }
   }
}