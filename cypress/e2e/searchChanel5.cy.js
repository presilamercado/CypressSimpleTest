describe('Search Favourite Perfume', () => {
  beforeEach(function () {
    // cy.fixture('chanel5').then((data) => {
    //   this.data = data;
    // });
    cy.fixture('chanel5').as('product');
    cy.visit('/collections/mariah-carey');


    // Intercepts
    // Intercept the place-order API call
    cy.intercept('GET', '**/api/place-order/store-front?shopify_domain=wholesalewarehouse.myshopify.com&customer_id=*').as('placeOrderApi');
  });

  it('View "Forever Elizabeth by Elizabeth Taylor 100ml EDP" product', function () {
    cy.get('input[name="q"]').type(this.product.searchKeyword);
    cy.get('button[data-live-search-submit]').click();
    cy.wait('@placeOrderApi');
  

    // Click search result title to go to the product detail page
    cy.contains(this.product.searchKeyword).should('exist').click();
    cy.wait('@placeOrderApi');
    cy.get('a[href*="/products/chanel-no-5-by-chanel-50ml-edp"]').first().click();
    cy.wait('@placeOrderApi');


    // Product detail assertions
    cy.get('.product-title').should('contain.text', this.product.title);
    cy.get('[data-price]').first().should('contain.text', this.product.currentPrice);
    cy.get('[data-price-compare-min]').should('contain.text', this.product.compareAtPriceMin);
    cy.get('[data-price-compare-max]').should('contain.text', this.product.compareAtPriceMax);
    // cy.get('#product-quantity-select option').should(($options) => {
    //   const values = [...$options].map(o => o.value.trim());
    //   expect(values).to.include.members(this.product.quantityOptions);
    // });
    //cy.get('.product-form__available-text').should('contain.text', this.product.stockMessage);
   // cy.get('.product-form--atc-button').should('contain.text', this.product.addToCartButton);
    cy.get('.product-details__afterpay').should('contain.text', this.product.installmentText);
    this.product.description.forEach(text => {
      cy.get('[data-product-description]').should('contain.text', text);
    });

    // Add to cart button click
   // cy.get('button[data-product-atc]').click();

    // Wait for banner to appear and the product title to be populated
    // cy.get('.atc-banner--outer').should('be.visible');

    // cy.get('[data-atc-banner-product-title]')
    //   .should('contain.text', this.product.cartBanner.productTitle, { timeout: 10000 });

    // cy.get('.atc-banner--product-title')
    //   .should('contain.text', this.product.cartBanner.bannerTitle);

    // cy.get('[data-atc-banner-product-price-quantity]')
    //   .should('contain.text', this.product.cartBanner.quantityText);

    // cy.get('[data-atc-banner-product-price-value]')
    //   .should('contain.text', this.product.cartBanner.priceValue);

    // cy.get('[data-atc-banner-cart-subtotal]')
    //   .should('contain.text', this.product.cartBanner.cartSubtotal);

    // cy.get('.atc-button--viewcart')
    //   .should('contain.text', this.product.cartBanner.viewCartText);
  })
})
