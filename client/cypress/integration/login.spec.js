context('Login', () => {
  before(() => {
    cy.clearCookies();
  });

  it('Should login and redirect to admin', () => {
    cy.server();
    cy.route('POST', '/api/v2/auth/login', 'fixture:activeUser.json');

    cy.visit('/login')
      .queryByTestId('login-card')
      .queryByTestId('email')
      .type('test@example.com')

      .queryByTestId('password')
      .type('test')
      .queryByTestId('submit')
      .click()
      .url()
      .should('be', '/admin');
  });

  it('Should login and redirect to activation page', () => {
    cy.server();
    cy.route('POST', '/api/v2/auth/login', 'fixture:inactiveUser.json');

    cy.visit('/login')
      .queryByTestId('login-card')
      .queryByTestId('email')
      .type('test@example.com')

      .queryByTestId('password')
      .type('test')
      .queryByTestId('submit')
      .click()
      .url()
      .should('be', '/activate');
  });
});
