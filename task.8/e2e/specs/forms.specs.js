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
    await FormsPage.selectSecondDropdownOption();
    await FormsPage.tapActiveButton();
  });
});