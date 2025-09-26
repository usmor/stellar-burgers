describe('Тестирование функциональности модальных окон', () => {
  const modal_selector = '[data-testid="modal"]';

  const ingredient_selector = '[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]';
  const ingredient_name = 'Краторная булка N-200i';
  const calories_text = 'Калории, ккал';
  const proteins_text = 'Белки, г';
  const fat_text = 'Жиры, г';
  const carbohydrates_text = 'Углеводы, г';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открытие модального окна ингредиента', () => {
    cy.openIngredientModal(ingredient_selector)

    cy.get(modal_selector)
      .should('exist')
      .should('contain.text', ingredient_name)
      .and('contain.text', calories_text)
      .and('contain.text', proteins_text)
      .and('contain.text', fat_text)
      .and('contain.text', carbohydrates_text);
  });

  it('закрытие по крестику', () => {
    cy.openIngredientModal(ingredient_selector)

    cy.closeModalByCross();
  });

  it('закрытие по оверлею', () => {
    cy.openIngredientModal(ingredient_selector)

    cy.closeModalByOverlay()
  });
});
