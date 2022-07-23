describe('Detail', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/characters', { fixture: 'characters.json' })
    cy.visit('/');
    cy.get('table tbody a').first().click();
  })

  it('should load the page', () => {
    cy.findAllByText(/Harry Potter/i).should('have.length', 1);
  });

  it('should go to index', () => {
    cy.get('a').first().click();
    cy.findAllByText(/Harry Potter Characters/i).should('have.length', 1);
  });
})