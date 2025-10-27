describe('User and Comments Endpoint E2E tests', () => {
  it('Check if user is visible in the API after opening CKEditor', () => {
    
    cy.request('http://localhost:9001/users?document_id=document-1').then((resp)=>{
      expect(resp.body).to.be.empty
    })

    cy.visit('http://localhost:5173/');
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    })
    cy.intercept('POST','https://proxy-event.ckeditor.com/').as('loaded')
    cy.wait('@loaded')

    cy.request('http://localhost:9001/users?document_id=document-1').then((resp)=>{
      expect(resp.body).not.to.be.empty
    })
  });

  it('Check if comment appears in the API after adding new one', () => {
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const comment = `comment-${id}`
    cy.request('http://localhost:9001/comments?document_id=document-1').then((resp)=>{
      const last_element = resp.body.data.pop()
      expect(last_element.content).not.to.deep.include(comment)
    })

    cy.visit('http://localhost:5173/');
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    })
    cy.intercept('POST','https://proxy-event.ckeditor.com/').as('loaded')
    cy.wait('@loaded')
    cy.get('#editor').type('{ctrl+a}').press(Cypress.Keyboard.Keys.DELETE)
    cy.get('#editor').type(comment)
    cy.get('#editor').type('{ctrl+a}')
    cy.get('[data-cke-tooltip-text="Comment"]').first().click()
    cy.get('[aria-label="Comment editor"]').type(comment)
    cy.press(Cypress.Keyboard.Keys.TAB).press(Cypress.Keyboard.Keys.ENTER)

    cy.request('http://localhost:9001/comments?document_id=document-1').then((resp)=>{
      const last_element = resp.body.data.pop()
      expect(last_element.content).to.deep.include(comment)
    })
  })
})