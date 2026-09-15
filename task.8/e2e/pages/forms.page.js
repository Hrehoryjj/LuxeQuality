const BasePage = require('./base.page');

const SELECTORS = {
  navFormsButton: '~Forms',
  textInput: '~text-input',
  inputResult: '~input-text-result',
  switchToggle: '~switch',
  dropdown: '~Dropdown',
  dropdownOption2: 'android=new UiSelector().text("Appium is awesome")',
  activeButton: '~button-Active',
};

class FormsPage extends BasePage {
  async openFormsScreen() {
    await this.tap(SELECTORS.navFormsButton);
  }

  async typeText(text) {
    await this.setValue(SELECTORS.textInput, text);
  }

  async getTypedResult() {
    return this.getText(SELECTORS.inputResult);
  }

  async toggleSwitch() {
    await this.tap(SELECTORS.switchToggle);
  }

  async isSwitchOn() {
    return (await this.getAttribute(SELECTORS.switchToggle, 'checked')) === 'true';
  }

  async selectSecondDropdownOption() {
    await this.tap(SELECTORS.dropdown);
    await this.tap(SELECTORS.dropdownOption2);
  }

  async isDropdownMenuClosed() {
    const isOptionVisible = await this.isDisplayed(SELECTORS.dropdownOption2).catch(() => false);
    return !isOptionVisible;
  }

  async tapActiveButton() {
    await this.tap(SELECTORS.activeButton);
  }

  async isActiveButtonSelected() {
    return (await this.getAttribute(SELECTORS.activeButton, 'selected')) === 'true';
  }
}

module.exports = new FormsPage();
