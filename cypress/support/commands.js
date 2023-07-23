
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addProductTwice',() => {
    cy.get('.sc-uhudcz-0').first().contains('Add to cart').click();
    cy.get('.sc-uhudcz-0').first().contains('Add to cart').click();
})

Cypress.Commands.add('clearSizeFilter',() => {
    const selectedSize1 = "M";
    const selectedSize2 = "XXL";

    // click on size filter to select both sizes
    cy.get('.sc-bj2vay-1').contains(selectedSize1).click();
    cy.get('.sc-bj2vay-1').contains(selectedSize2).click();
    cy.wait(200);

    // click on again sizes for reset
    cy.get('.sc-bj2vay-1').contains(selectedSize1).click();
    cy.get('.sc-bj2vay-1').contains(selectedSize2).click();
})