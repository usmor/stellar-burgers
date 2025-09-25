describe('Тестирование функциональности модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открытие модального окна ингредиента', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal"]')
      .should('contain.text', 'Краторная булка N-200i')
      .should('contain.text', 'Калории, ккал')
      .and('contain.text', 'Белки, г')
      .and('contain.text', 'Жиры, г')
      .and('contain.text', 'Углеводы, г');
  });

  it('закрытие по крестику', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .click();

    cy.get('[data-testid="close"]')
      .click();

    cy.get('[data-testid="modal"]').should('not.exist')
  })

  it('закрытие по оверлею', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .click();

    cy.get('[data-testid="modal-overlay"]')
    .click({ force: true });

    cy.get('[data-testid="modal-overlay"]').should('not.exist')
  })
});
