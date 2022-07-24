describe('Detail', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/characters', { fixture: 'characters.json' })
    cy.visit('/');
  })

  it('should load the page', () => {
    cy.get('table tbody a').first().click();
    cy.findAllByText(/Harry Potter/i).should('have.length', 2);
  });

  it('should go to index', () => {
    cy.get('table tbody a').first().click();
    cy.get('a').first().click();
    cy.findAllByText(/Harry Potter Characters/i).should('have.length', 1);
  });

  it('should show gryffindor image', () => {
    cy.get('table tbody a').first().click();
    cy.get('.house-image').should('have.attr', 'src').should('include','gryffindor');
  });

  it('should have wand information', () => {
    cy.get('table tbody a').first().click();
    cy.findAllByText(/Wand information/i).should('have.length', 1);
  });

  it('should hide wand information if character doesn\'t have it', () => {
    cy.get('table tbody a').eq(1).click();
    cy.findAllByText(/Wand information/i).should('have.length', 0);
  });
})