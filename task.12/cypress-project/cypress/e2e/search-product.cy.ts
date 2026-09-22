describe('TC-04 Search Product', () => {
  it('returns products matching the search query', () => {
    cy.visit('/');

    cy.prompt([
      'click the Products link in the navigation menu',
      'type "Top" into the product search input',
      'click the search button',
      'verify the page heading text "Searched Products" is visible',
      'verify a list of products is visible',
      'verify most of the displayed products are related to the search term "Top", allowing for the site\'s known loose/fuzzy search matching',
    ]);
  });
});
