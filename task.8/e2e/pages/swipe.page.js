const BasePage = require('./base.page');

class SwipePage extends BasePage {
  get navSwipeButton() { return '~Swipe'; }
  get foundMeText() { return '//*[@text="You found me!!!"]'; }
  get carousel() { return '~Carousel'; }
  get slide2Text() { return '//*[@text="GREAT COMMUNITY"]'; }

  async restartApp() {
    const appId = 'com.wdiodemoapp';
    await driver.terminateApp(appId);
    await driver.activateApp(appId);
  }

  async openSwipeScreen() {
    await this.restartApp();
    await this.tap(this.navSwipeButton);
  }

  async swipeUpUntilFound() {
    const { width, height } = await driver.getWindowRect();
    let found = false;
    for (let i = 0; i < 8 && !found; i++) {
      found = await this.isDisplayed(this.foundMeText).catch(() => false);
      if (!found) {
        await driver.action('pointer')
          .move({ x: Math.floor(width / 2), y: Math.floor(height * 0.8) })
          .down()
          .move({ x: Math.floor(width / 2), y: Math.floor(height * 0.2), duration: 300 })
          .up()
          .perform(true);
      }
    }
    return found;
  }

  async scrollToTop() {
  const { width, height } = await driver.getWindowRect();
  for (let i = 0; i < 5; i++) {
    await driver.action('pointer')
      .move({ x: Math.floor(width / 2), y: Math.floor(height * 0.2) })
      .down()
      .move({ x: Math.floor(width / 2), y: Math.floor(height * 0.8), duration: 300 })
      .up()
      .perform(true);
  }
}

async swipeCarouselOnce() {
  await this.scrollToTop();

  const el = await $(this.carousel);
  await el.waitForDisplayed({ timeout: 10000 });

  let attempts = 0;
  let slideChanged = false;

  while (attempts < 3 && !slideChanged) {
    const rect = await el.getElementRect(el.elementId);
    const startX = rect.x + rect.width * 0.8;
    const endX = rect.x + rect.width * 0.2;
    const y = rect.y + rect.height / 2;

    await driver.action('pointer')
      .move({ x: Math.floor(startX), y: Math.floor(y) })
      .down()
      .move({ x: Math.floor(endX), y: Math.floor(y), duration: 300 })
      .up()
      .perform(true);

    slideChanged = await this.isDisplayed(this.slide2Text).catch(() => false);
    attempts++;
  }

  return slideChanged;
}
}

module.exports = new SwipePage();