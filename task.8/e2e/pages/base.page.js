class BasePage {
  async tap(selector) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    await el.click();
  }

  async setValue(selector, value) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    await el.setValue(value);
  }

  async getText(selector) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    return el.getText();
  }

  async isDisplayed(selector) {
    const el = await $(selector);
    return el.isDisplayed();
  }
  async waitForDisplayed(selector, timeout = 15000) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    return el;
}
}

module.exports = BasePage;