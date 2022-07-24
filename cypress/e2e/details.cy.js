describe('Detail', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/characters', { fixture: 'characters.json' })
    cy.visit('/');
  })

  it('should load the page', () => {
    cy.wait(500);
    cy.get('table tbody a').first().click();
    cy.findAllByText(/Harry Potter/i).should('have.length', 2);
  });

  it('should go to index', () => {
    cy.wait(500);
    cy.get('table tbody a').first().click();
    cy.get('.return').first().should('have.attr', 'href').should('eq', '/');
  });

  it('should show gryffindor image', () => {
    cy.wait(500);
    cy.visit('/details/Harry Potter');
    cy.get('.house-image').should('have.attr', 'src').should('include','gryffindor');
  });

  it('should have wand information', () => {
    cy.wait(500);
    cy.visit('/details/Harry Potter');
    cy.findAllByText(/Wand information/i).should('have.length', 1);
  });

  it('should hide wand information if character doesn\'t have it', () => {
    cy.wait(500);
    cy.visit('/details/Hermione Granger');
    cy.findAllByText(/Wand information/i).should('have.length', 0);
  });
})