import selectors from '../../support/selectors.js'

describe('Faktury login test', () =>{
 

    it('Logs in to fillup/faktury adds an invoice', () => {
        cy.visit('https://www.fillup.pl/faktury/')
        cy.get(selectors.acceptCookies).click()
        cy.wait(5000)
        cy.get(selectors.licenseAccept).contains("Akceptuję").click()
        cy.get(selectors.ksefShowWindow).check()
        cy.get(selectors.ksefClose).contains("Zamknij").click()
        cy.get(selectors.userClick).first().click()
        cy.get(selectors.loginButton).click()
        cy.get(selectors.loginField).type(selectors.login)
        cy.get(selectors.pswdField).type(selectors.pswd)
        cy.get(selectors.submitLogin).click()
        cy.url().should('be.equal', 'https://www.fillup.pl/faktury/#/moje-faktury')
        cy.get('.footer').should('contain', "Karol")

        //Test 2
        cy.wait(5000)
        cy.get(selectors.buttonInvoice).should('contain', "Wystaw fakturę").click()
        cy.get(selectors.invoiceVAT).contains("Faktura VAT (darmowa)").click()
        cy.get(selectors.buyerNIP).type("5252352907")
        cy.get(selectors.serviceName).type("test")
        cy.get(selectors.priceNet).type("123")
        cy.wait(2000)
        cy.get(selectors.actionButton).contains("Zapisz").click()
        cy.wait(1000)
        cy.get(selectors.overWriteSave).contains("Zapisz").click()
        cy.get(selectors.notifyManager).contains(/Dokument .* został poprawnie zapisany/)
       
      })
      





})