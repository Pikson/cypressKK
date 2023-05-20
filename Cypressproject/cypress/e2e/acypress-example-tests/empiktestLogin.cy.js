import selectors from '../../support/selectors.js'

describe('Empik shop test', () => {



  beforeEach(() => {
    cy.session('accept cookies', () => {
      cy.visit('https://www.empik.com/')
      cy.get(selectors.acceptCookies).first().click({force: true})


      //cy.get('[data-ta="cookie-btn-accept-all"]').first().click({force: true})
      //cy.contains("button", "Zaakceptuj zgody").click({force: true})
      //cy.contains("cookie-btn-accept-all", "Zaakceptuj zgody").click({force: true})
    })
  })

      it('Logs in and tries to buy', () => {
        cy.clearCookies()
        cy.visit('https://www.empik.com/')
      
      })
      
    })
    
  