describe('Empik shop test', () => {



  beforeEach(() => {
    cy.session('accept cookies', () => {
      cy.visit('https://www.empik.com/')
      cy.get('[data-ta="cookie-btn-accept-all"]').first().click({force: true})


      //cy.get('[data-ta="cookie-btn-accept-all"]').first().click({force: true})
      //cy.contains("button", "Zaakceptuj zgody").click({force: true})
      //cy.contains("cookie-btn-accept-all", "Zaakceptuj zgody").click({force: true})
    })
  })

    it('Adds harry potter to the basket', () => {
      cy.visit('https://www.empik.com/')
      cy.get('.css-ys01em-triggerLayer').click()
      cy.contains('form', 'POPULARNE WYSZUKIWANIA')
      cy.get('[title="Wpisz czego szukasz"]').type('harry potter', {force: true}).type('{enter}')
      cy.contains('Harry Potter i Kamień Filozoficzny. Tom 1').click()
      cy.wait(1000)
      cy.contains('button', 'DODAJ DO KOSZYKA').click()
      cy.get('[data-ta="close-btn"]').click()
    })

    it('Opens basket and tries to buy', () => {
      cy.visit('https://www.empik.com/')
      cy.get('.inlineImage--basket').click()
      cy.wait(1000)
      cy.get('[data-ta= "proceed-button"]').first().click()
      cy.contains('ZAMÓW BEZ REJESTRACJI').click()
      cy.get('form').find('[type="email"]').type('pikson420@gmail.com')
      cy.get('form').submit()
      cy.get('[data-ta="STORE"]').click()
      cy.intercept("POST", "https://www.empik.com/gateway/api/graphql/cart").as("storeList")
      cy.get('[data-ta="search-input"]').type('20-246')
      cy.wait("@storeList")
      cy.get("@storeList").then(res => {
        console.log(res)
        expect(res.response.statusCode).to.equal(200)
      })


      
    })
    
  })