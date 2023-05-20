import selectors from '../../support/selectors.js'

describe('Empik shop test', () => {



  beforeEach(() => {
    cy.session('accept cookies', () => {
      cy.visit('https://www.empik.com/')
      cy.get(selectors.acceptCookies).first().click({force: true})
    })

  })

    it('Adds harry potter to the basket', () => {
      cy.visit('https://www.empik.com/')
      cy.get(selectors.searchBarTrigger).click()
      cy.contains('form', 'POPULARNE WYSZUKIWANIA')
      cy.get(selectors.searchBarInput).type('harry potter', {force: true}).type('{enter}')
      cy.contains('Harry Potter i Zakon Feniksa. Tom 5').click()
      cy.wait(1000)
      cy.contains('button', 'DODAJ DO KOSZYKA').click()
      cy.get(selectors.closeBasketUpdateWindow).click()
    })

    it('Open the basket and try to buy without logging in, intercept store list', () => {
      cy.visit('https://www.empik.com/')
      cy.clearBasket()
      cy.wait(1000)
      cy.get(selectors.proceedToCheckout).first().click()
      cy.contains('ZAMÓW BEZ REJESTRACJI').click()
      cy.get('form').find('[type="email"]').type('pikson420@gmail.com')
      cy.get('form').submit()
      cy.get(selectors.deliveryEmpik).click()
      cy.intercept("POST", "https://www.empik.com/gateway/api/graphql/cart").as("storesList")
      cy.get(selectors.storeSearchByPostCode).type('20-246')
      cy.wait("@storesList")
      cy.get("@storesList").then(res => {
        console.log(res)//to sie w ogole nie wyswietla
        cy.log(res)
        const requestBody = res.request.body
        const responseBody = res.response.body
        const storeFields = res.response.body.data.findDeliveryPointsWithStores.deliveryPoints
        const expectedData = {
          postalCode: "20-246"
        }
        
        expect(res.response.statusCode).to.equal(200)
        expect(storeFields[0].name).to.equal("Lublin Olimp (SP)")
        expect(storeFields[1].name).to.equal("Lublin Vivo (SP)")
        
        //expect(requestBody).to.equal(expectedData) nie dziala
        
        //expect(res.response.duration).to.be.lessThan(500) 

         // expect(res.response.body["data"]["findDeliveryPointsWithStores"]["deliveryPoints"][0])
        // .should('include', {'name':'Lublin Olimp (SP)'})

        //expect(res.response.body).its("deliveryPoints").should('include', {
          //'name':'Lublin Olimp (SP)'})
      })

      it('Removes unnecessary copies of the book from the basket', () => {
        cy.visit('https://www.empik.com/')
        cy.get(selectors.openBasket).click()
        cy.get(selectors.itemQuantity).clear().type("1")
      })
      
    })
    
})