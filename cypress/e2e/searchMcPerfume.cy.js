describe('Search Favourite Perfume', () => {
  beforeEach(function () {
    cy.fixture('searchProduct').then((data) => {
      this.data = data;
    });
    cy.fixture('productDetails').as('product');
    cy.visit('/collections/mariah-carey');


    // Intercepts
    cy.intercept('GET', '**/cart.js').as('getCart');
  });

  it('View "Forever Elizabeth by Elizabeth Taylor 100ml EDP" product', function () {
    cy.get('input[name="q"]').type(this.data.searchKeyword);
    cy.get('button[data-live-search-submit]').click();
    cy.wait('@getCart');

    // Click search result title to go to the product detail page
    cy.contains(this.data.searchKeyword).should('exist').click();

    // Product detail assertions
    cy.get('@product').then(({ title, price, soldOutBadge, description }) => {
      cy.get('div.product-main').within(() => {
        cy.get('h1.product-title')
          .invoke('text')
          .then(text => {
            const normalized = text.replace(/\s+/g, ' ').trim();
            expect(normalized).to.eq(title);
          });

        cy.get('div.price__current span.money').should('contain.text', price);

        cy.get('span.product__badge--soldout')
          .should('be.visible')
          .and('contain.text', soldOutBadge);

        description.forEach(text => {
          cy.get('div.product-description').should('contain.text', text);
        });
      });
    });
  });
});



//test ci