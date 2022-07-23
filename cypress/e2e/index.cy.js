describe('Cypress', () => {   
  it("should load the page", () => {
    cy.visit("/");
    cy.findAllByText(/Harry Potter Characters/i).should("have.length", 1);
  });
})