context('Activate', () => {
  before(() => {
    cy.clearCookies();
  });

  it('Should allow account activation', () => {
    cy.server();
    cy.route('POST', '/api/v2/activation', 'fixture:activeUser.json');

    cy.fixture('inactiveUser.json').then(json => {
      cy.setCookie('token', escape(JSON.stringify(json)));
    });

    cy.visit('/activate')
      .queryByTestId('activate-card')
      .queryByTestId('password')
      .type('test12345!@#')
      .queryByTestId('password-confirmation')
      .type('test12345!@#')
      .queryByTestId('submit')
      .click()
      .location('pathname', { timeout: 10000 })
      .should('eq', '/admin');
  });

  it('Should validate required fields', () => {
    cy.fixture('inactiveUser.json').then(json => {
      cy.setCookie('token', escape(JSON.stringify(json)));
    });

    cy.visit('/activate')
      .queryByTestId('activate-card')
      .queryByTestId('submit')
      .click()
      .queryByTestId('password-helper')
      .should('be.visible')
      .queryByTestId('password-confirmation-helper')
      .should('be.visible');
  });

  it('Should validate password confirmation', () => {
    cy.fixture('inactiveUser.json').then(json => {
      cy.setCookie('token', escape(JSON.stringify(json)));
    });

    cy.visit('/activate')
      .queryByTestId('activate-card')
      .queryByTestId('password')
      .type('test12345!@#')
      .queryByTestId('password-confirmation')
      .type('test12345!@#typo')
      .queryByTestId('submit')
      .click()
      .queryByTestId('password-confirmation-helper')
      .should('be.visible');
  });

  it('Should NOT open activation page when active', () => {
    cy.fixture('activeUser.json').then(json => {
      cy.setCookie('token', escape(JSON.stringify(json)));
    });

    cy.visit('/activate')
      .location('pathname')
      .should('eq', '/admin');
  });

  it('Should NOT open activation page when not logged in', () => {
    cy.visit('/activate')
      .location('pathname')
      .should('eq', '/login');
  });
});
