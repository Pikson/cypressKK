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

import selectors from "./selectors";

// Cypress.Commands.add('clearBasket', () => { 
//     cy.get(selectors.openBasket).click()
//     cy.get(selectors.itemQuantity).clear().type('{enter}')
//     cy.visit('https://www.empik.com/')
// })


Cypress.Commands.add('clearBasket', () => { 
    cy.get(selectors.openBasket).click()
    cy.get(selectors.itemQuantity).each(($el) => {
        cy.wrap($el).clear().type('1', '{enter}')
    })
    
})