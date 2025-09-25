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
    cy.addIngredient('bun');
    cy.addIngredient('main');

    cy.createOrder('1234');

    cy.closeModalByCross();

    cy.checkEmptyConstructor();
  });
});
