describe('Index', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/characters', { fixture: 'characters.json' })
    cy.visit('/');
  })

  it('should load the page', () => {
    cy.findAllByText(/Harry Potter Characters/i).should('have.length', 1);
  });

  it('table should have 5 rows', () => {
    cy.get('table tbody').find('tr').should('have.length', 5);
  });

  it('should filter on search', () => {
    cy.get('input').type('potter{enter}');
    cy.get('table tbody').find('tr').should('have.length', 1);
  });

  it('should reset search', () => {
    cy.get('input').clear();
    cy.get('input').type('{enter}');
    cy.get('table tbody').find('tr').should('have.length', 5);
  });

  it('should navigate to detail', () => {
    cy.get('table tbody a').first().click();
    cy.findAllByText(/DETAILS/i).should('have.length', 1);
  });
})