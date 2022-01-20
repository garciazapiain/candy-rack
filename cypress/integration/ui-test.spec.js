import {selectors} from  '../support/selectors'

Cypress.on('uncaught:exception', (err, runnable) => false);

describe('Candy Rack Tests', () => {

  it('API works', () => {
    const option = {
      url: "https://private-803503-digismoothietest.apiary-mock.com/offers",
      method: 'GET',
    };
    cy.request(option).then((optionResponse) => {
      expect(optionResponse.status).to.equal(200);
      expect(optionResponse.body).to.not.be.null;
    });
  });
    
  it('Popup Window Opens', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get(selectors.popUpButton).click()
    cy.get(selectors.popUpWindow).should('exist')
  })

  it('Add Offers and Verify Price Update', () => {
    //check initial state of cart
    cy.get(selectors.cartPrice).should('contain','0')
    cy.get(selectors.offer1).click()
    //check addition works for first offer
    cy.get(selectors.cartPrice).should('contain','7.99')
    // check removal works
    cy.get(selectors.offer1).click()
    cy.get(selectors.cartPrice).should('contain','0')
    // check addition of all offers work
    cy.get(selectors.offer1).click()
    cy.get(selectors.offer2).click()
    cy.get(selectors.offer3).click()
    cy.get(selectors.cartPrice).should('contain','17.97')
  })

  it('Confirm Submission and dialog closes', () => {
    cy.get(selectors.confirmSubmission).click()
    cy.get(selectors.popUpButton).should('exist')
  })
})