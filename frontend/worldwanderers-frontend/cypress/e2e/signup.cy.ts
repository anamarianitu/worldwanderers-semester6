describe('Signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-up'); // Replace 'http://localhost:3000/sign-up' with the URL of your signup page
  });

  it('Registers a new user successfully with valid details', () => {
    // Enter valid user details
    cy.get('#username').type('new_user');
    cy.get('#email').type('new_user@example.com');
    cy.get('#firstName').type('New');
    cy.get('#lastName').type('User');
    cy.get('#password').type('password');

    // Check the "Agreed to Terms and Conditions" checkbox
    cy.get('[name="agreedToTerms"]').check();

    // Submit the signup form
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the homepage or another expected page
    cy.url().should('include', '/');
  });

  it('Displays an error message with invalid details', () => {
    // Enter invalid user details
    cy.get('#username').type('invalid');
    cy.get('#email').type('invalid');
    cy.get('#firstName').type('invalid');
    cy.get('#lastName').type('User');
    cy.get('#password').type('password');

    // Check the "Agreed to Terms and Conditions" checkbox
    cy.get('[name="agreedToTerms"]').check();

    // Submit the signup form
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains('Please enter all required details, including a valid email address.');
  });

  it('Displays an error message when terms and conditions are not accepted', () => {
    // Enter valid user details
    cy.get('#username').type('new_user');
    cy.get('#email').type('new_user@example.com');
    cy.get('#firstName').type('New');
    cy.get('#lastName').type('User');
    cy.get('#password').type('password');

    // Do not check the "Agreed to Terms and Conditions" checkbox

    // Submit the signup form
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains('Please accept the terms and conditions.');
  });
});
