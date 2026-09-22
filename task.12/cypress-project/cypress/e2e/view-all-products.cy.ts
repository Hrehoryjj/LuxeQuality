describe('TC-03 Verify All Products and product detail page', () => {
  it('displays the products list and correct product detail page', () => {
    cy.visit('/');

    cy.prompt([
      'click the Products link in the navigation menu',
      'verify the page heading text "All Products" is visible',
      'verify a list of products is visible',
      'click the View Product link on the first product in the list',
      'verify the product detail page shows the product name',
      'verify the product detail page shows the product category',
      'verify the product detail page shows the product price',
      'verify the product detail page shows the product availability',
      'verify the product detail page shows the product condition',
      'verify the product detail page shows the product brand',
    ]);
  });
});
