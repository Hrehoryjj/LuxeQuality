const FormsPage = require('../pages/forms.page');

describe('TC-01: Forms interaction', () => {
  it('should fill input, toggle switch, select dropdown, tap active button', async () => {
    const { faker } = await import('@faker-js/faker');
    const randomText = faker.word.words(2);

    await FormsPage.openFormsScreen();
    await FormsPage.typeText(randomText);

    const result = await FormsPage.getTypedResult();
    expect(result).toContain(randomText);

    await FormsPage.toggleSwitch();
    expect(await FormsPage.isSwitchOn()).toBe(true);

    await FormsPage.selectSecondDropdownOption();
    const dropdownLabel = await FormsPage.getSelectedDropdownLabel();
    expect(dropdownLabel).toContain('awesome');

    await FormsPage.tapActiveButton();
    expect(await FormsPage.isActiveButtonSelected()).toBe(true);
  });
});