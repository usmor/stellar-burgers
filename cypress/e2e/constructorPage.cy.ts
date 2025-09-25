import { INGREDIENTS } from "../support/commands";

describe('Constructor Page тестирование', () => {
  const ingredient_selector = '[data-testid^="ingredient-"]';


  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Проверка загрузки ингредиентов', () => {
    cy.get('h1').should('have.text', 'Соберите бургер');
    cy.get(ingredient_selector).should('have.length.at.least', 1);
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('добавление булки', () => {
      cy.addIngredient('bun');

      const bunText = INGREDIENTS.bun.text;
      if (typeof bunText !== 'string' && 'top' in bunText && 'bottom' in bunText) {
        cy.checkIngredient(bunText.top!);
        cy.checkIngredient(bunText.bottom!);
      }
    });

    it('добавление начинки', () => {
      cy.addIngredient('main');

      const mainText = INGREDIENTS.main.text;
      if (typeof mainText === 'string') {
        cy.checkIngredient(mainText);
      }
    });

    it('добавление соуса', () => {
      cy.addIngredient('sauce');

      const sauceText = INGREDIENTS.sauce.text;
      if (typeof sauceText === 'string') {
        cy.checkIngredient(sauceText);
      }
    });

    it('добавление нескольких ингредиентов', () => {
      cy.addIngredient('bun');

      const bunText = INGREDIENTS.bun.text;
      if (typeof bunText !== 'string' && 'top' in bunText && 'bottom' in bunText) {
        cy.checkIngredient(bunText.top!);
        cy.checkIngredient(bunText.bottom!);
      }

      cy.addIngredient('main', 2);
      const mainText = INGREDIENTS.main.text;
      if (typeof mainText === 'string') {
        cy.checkIngredient(mainText, 2);
      }

      cy.addIngredient('sauce');
      const sauceText = INGREDIENTS.sauce.text;
      if (typeof sauceText === 'string') {
        cy.checkIngredient(sauceText);
      }
    });
  });
});
