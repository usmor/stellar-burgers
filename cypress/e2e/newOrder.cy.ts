describe('Тестирование процесса оформления заказа', () => {
  const fakeAccessToken = 'fake-access-token';
  const fakeRefreshToken = 'fake-refresh-token';

  beforeEach(() => {
    cy.setCookie('accessToken', fakeAccessToken);
    window.localStorage.setItem('refreshToken', fakeRefreshToken);

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookies();
  });

  it('создание нового заказа', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="order-button"]').click();

    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="order-number"]').should('have.text', '1234');

    cy.get('[data-testid="close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
