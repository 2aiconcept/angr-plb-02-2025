describe('Page Sign Up', () => {
  beforeEach(() => {
    // Visiter la page d'inscription
    cy.visit('/auth/sign-up');
  });

  it('should display the sign up form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[formControlName="firstname"]').should('exist');
    cy.get('input[formControlName="lastName"]').should('exist');
    cy.get('input[formControlName="email"]').should('exist');
    cy.get('input[formControlName="password"]').should('exist');
  });

  it('should show validation messages for invalid inputs', () => {
    // On simule le blur pour déclencher la validation
    cy.get('input[formControlName="firstname"]').focus().blur();
    cy.get('input[formControlName="lastName"]').focus().blur();
    cy.get('input[formControlName="email"]').focus().blur();
    cy.get('input[formControlName="password"]').focus().blur();
    // Vérifier que le message d'erreur attendu apparaît
    cy.contains('champs invalide').should('be.visible');
    cy.contains('Veuillez saisir une adresse email valide').should(
      'be.visible'
    );
    cy.contains('Veuillez saisir 5 caractères minimum').should('be.visible');
  });

  it('should successfully sign up a user', () => {
    // Stub de l'appel POST
    cy.intercept('POST', '/register', {
      statusCode: 200,
      body: { success: true },
    }).as('postRegister');

    // Remplir le formulaire avec des valeurs valides
    cy.get('input[formControlName="firstname"]').type('John');
    cy.get('input[formControlName="lastName"]').type('Doe');
    cy.get('input[formControlName="email"]').type('john.doe@example.com');
    cy.get('input[formControlName="password"]').type('12345');
    cy.get('form').submit();

    // Attendre et vérifier l'interception
    cy.wait('@postRegister').its('response.statusCode').should('eq', 200);
    // Vérifier que la navigation se fait (par exemple, via URL ou un autre indice)
    cy.url().should('include', '/auth/sign-in');
  });
});
