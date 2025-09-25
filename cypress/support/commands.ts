/// <reference types="cypress" />

type IngredientKey = 'bun' | 'main' | 'sauce';

interface Ingredient {
  selector: string;
  text: string | { top?: string; bottom?: string };
}

const modal_selector = '[data-testid="modal"]';

export const INGREDIENTS: Record<IngredientKey, Ingredient> = {
  bun: {
    selector: '[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]',
    text: {
      top: 'Краторная булка N-200i (верх)',
      bottom: 'Краторная булка N-200i (низ)'
    }
  },
  main: {
    selector: '[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]',
    text: 'Биокотлета из марсианской Магнолии'
  },
  sauce: {
    selector: '[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]',
    text: 'Соус Spicy-X'
  }
};

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(type: IngredientKey, times?: number): Chainable<Element>;
      checkIngredient(name: string, times?: number): Chainable<Element>;
      openIngredientModal(selector: string): Chainable<Element>;
      closeModalByCross(): Chainable<Element>;
      closeModalByOverlay(): Chainable<Element>;
      createOrder(orderNumber_text: string): Chainable<Element>;
      checkEmptyConstructor(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('addIngredient', (type: IngredientKey, times = 1) => {
  for (let i = 0; i < times; i += 1) {
    cy.get(INGREDIENTS[type].selector).contains('Добавить').click();
  }
});

Cypress.Commands.add('checkIngredient', (name: string, times = 1) => {
  cy.get('.constructor-element__text').then(($texts) => {
    const allTexts = $texts.map((_, el) => Cypress.$(el).text()).get();
    const count = allTexts.filter((t) => t === name).length;
    expect(count, `Ожидалось ${times} вхождений ингредиента "${name}"`).to.eq(
      times
    );
  });
});

Cypress.Commands.add('openIngredientModal', (selector: string) => {
  cy.get(selector).click();
  cy.get(modal_selector).should('exist');
});

Cypress.Commands.add('closeModalByCross', () => {
  cy.get('[data-testid="close"]').click();
  cy.get(modal_selector).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-testid="modal-overlay"]').click({ force: true });
  cy.get(modal_selector).should('not.exist');
});

Cypress.Commands.add('createOrder', (orderNumber_text: string) => {
  cy.get('[data-testid="order-button"]').click();
  cy.wait('@createOrder').its('response.statusCode').should('eq', 200);
  cy.get(modal_selector).should('exist');
  cy.get('[data-testid="order-number"]').should('have.text', orderNumber_text);
});

Cypress.Commands.add('checkEmptyConstructor', () => {
  cy.contains('Выберите булки').should('exist');
  cy.contains('Выберите начинку').should('exist');
})

export {};
