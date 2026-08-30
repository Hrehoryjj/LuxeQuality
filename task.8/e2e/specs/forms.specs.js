const FormsPage = require('../pages/forms.page');
const { faker } = require('@faker-js/faker');

describe('TC-01: Forms interaction', () => {
  it('should fill input, toggle switch, select dropdown, tap active button', async () => {
    const randomText = faker.random.words(2);

    await FormsPage.openFormsScreen();
    await FormsPage.typeText(randomText);

    const result = await FormsPage.getTypedResult();
    expect(result).toContain(randomText);

    await FormsPage.toggleSwitch();
    await FormsPage.selectSecondDropdownOption();
    await FormsPage.tapActiveButton();
  });
});