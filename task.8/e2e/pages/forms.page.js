const BasePage = require('./base.page');

class FormsPage extends BasePage {
  get navFormsButton() { return '~Forms'; }
  get textInput() { return '~text-input'; }
  get inputResult() { return '~input-text-result'; }
  get switchToggle() { return '~switch'; }
  get dropdown() { return '~Dropdown'; }
  get dropdownOption2() { return 'android=new UiSelector().text("Appium is awesome")'; }
  get activeButton() { return '~button-Active'; }
  get inactiveButton() { return '~button-Inactive'; }

  async openFormsScreen() {
    await this.tap(this.navFormsButton);
  }

  async typeText(text) {
    await this.setValue(this.textInput, text);
  }

  async getTypedResult() {
    return this.getText(this.inputResult);
  }

  async toggleSwitch() {
    await this.tap(this.switchToggle);
  }

  async selectSecondDropdownOption() {
    await this.tap(this.dropdown);
    await this.tap(this.dropdownOption2);
  }

  async tapActiveButton() {
    await this.tap(this.activeButton);
  }
}

module.exports = new FormsPage();