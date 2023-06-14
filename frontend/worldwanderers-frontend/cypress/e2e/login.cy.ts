describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/log-in');
  });

  it('Logs in successfully with valid credentials', () => {
    // Enter valid username and password
    cy.get('#username').type('ionpopescu');
    cy.get('#password').type('test');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the homepage or another expected page
    cy.url().should('include', '/');
  });

  it('Displays an error message with invalid credentials', () => {
    // Enter invalid username and password
    cy.get('#username').type('invalid_username');
    cy.get('#password').type('invalid_password');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains('Username or password may be incorrect.');
  });
});
