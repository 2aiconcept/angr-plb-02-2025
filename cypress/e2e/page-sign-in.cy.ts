describe('Page Sign In', () => {
  beforeEach(() => {
    // Visiter la page de connexion
    cy.visit('/auth/sign-in');
  });

  it('should display the sign in form', () => {
    // Vérifier que le formulaire contient les champs email et password
    cy.get('form').should('be.visible');
    cy.get('input[formControlName="email"]').should('exist');
    cy.get('input[formControlName="password"]').should('exist');
  });

  it('should allow the user to sign in', () => {
    // Remplir le formulaire de connexion
    cy.get('input[formControlName="email"]').type('contact@2ai-group.com');
    cy.get('input[formControlName="password"]').type('test1');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Après la connexion, on suppose que l'utilisateur est redirigé vers la page "orders"
    cy.url().should('include', '/orders');
  });
});
