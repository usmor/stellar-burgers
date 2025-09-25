describe('Constructor Page тестирование', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('/');

    cy.wait('@getIngredients');
  });

  it('Проверка загрузки ингредиентов', () => {
    cy.get('h1').should('have.text', 'Соберите бургер');
    cy.get('[data-testid^="ingredient-"]').should('have.length.at.least', 1);
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('добавление булки', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
        .contains('Добавить')
        .click();

      cy.get('.constructor-element_pos_top')
        .find('.constructor-element__text')
        .should('have.text', 'Краторная булка N-200i (верх)');

      cy.get('.constructor-element_pos_bottom')
        .find('.constructor-element__text')
        .should('have.text', 'Краторная булка N-200i (низ)');
    });

    it('добавление начинки', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
        .contains('Добавить')
        .click();

      cy.get('.constructor-element')
        .find('.constructor-element__text')
        .should('have.text', 'Биокотлета из марсианской Магнолии');
    });

    it('добавление соуса', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]')
        .contains('Добавить')
        .click();

      cy.get('.constructor-element')
        .find('.constructor-element__text')
        .should('have.text', 'Соус Spicy-X');
    });

    it('добавление нескольких ингредиентов', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
        .contains('Добавить')
        .click();

      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
        .contains('Добавить')
        .click()
        .click();

      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]')
        .contains('Добавить')
        .click();

      cy.get('.constructor-element__text')
        .should('have.length', 5)
        .then(($texts) => {
          const allTexts = $texts.map((_, el) => Cypress.$(el).text()).get();

          expect(allTexts).to.include('Краторная булка N-200i (верх)');
          expect(allTexts).to.include('Краторная булка N-200i (низ)');

          const main = allTexts.filter(
            (t) => t === 'Биокотлета из марсианской Магнолии'
          ).length;
          expect(main).to.eq(2);

          const sauce = allTexts.filter((t) => t === 'Соус Spicy-X').length;
          expect(sauce).to.eq(1);
        });
    });
  });
});
