import { expect, test, describe } from '@jest/globals';
import {
  BurgerConstructorSlice,
  initialState as initialBurgerConstructorState,
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../services/burgerConstructor/slice';

describe('тесты синхронных экшенов BurgerConstructor', () => {
  const bun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 50,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  };

  const sauce = {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945'
  };

  const main = {
    calories: 986,
    carbohydrates: 609,
    fat: 689,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    name: 'Хрустящие минеральные кольца',
    price: 300,
    proteins: 808,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0946'
  };

  describe('тесты на добавление ингредиентов ', () => {
    test('добавление булочки', () => {
      const newState = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        addIngredient(bun)
      );

      expect(newState.bun).toEqual({
        ...bun,
        id: expect.any(String)
      });
      expect(newState.ingredients).toEqual([]);
    });

    test('добавление начинки и соуса', () => {
      let state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        addIngredient(main)
      );

      state = BurgerConstructorSlice.reducer(state, addIngredient(sauce));

      state = BurgerConstructorSlice.reducer(state, addIngredient(main));

      expect(state.bun).toBe(null);

      expect(state.ingredients).toHaveLength(3);

      expect(state.ingredients).toEqual([
        {
          ...main,
          id: expect.any(String)
        },
        {
          ...sauce,
          id: expect.any(String)
        },
        {
          ...main,
          id: expect.any(String)
        }
      ]);
      expect(state.ingredients[0].id).not.toBe(state.ingredients[1].id);
    });

    test('замена булочки', () => {
      const newBun = {
        ...bun,
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3'
      };

      let state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        addIngredient(bun)
      );

      state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        addIngredient(newBun)
      );

      expect(state.bun!._id).toBe(newBun._id);
    });
  });

  describe('тесты на удаление ингредиента', () => {
    const initialBurgerConstructorState = {
      ingredients: [
        { ...main, id: '123' },
        { ...sauce, id: '456' },
        { ...sauce, id: '789' }
      ],
      bun: { ...bun, id: '000' }
    };

    test('удаление неповторяющегося ингредиента', () => {
      const state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        removeIngredient('123')
      );

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients).toEqual([
        { ...sauce, id: '456' },
        { ...sauce, id: '789' }
      ]);
      expect(state.bun).toEqual({ ...bun, id: '000' });
    });

    test('удаление повторяющегося ингредиента', () => {
      const state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        removeIngredient('456')
      );

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients).toEqual([
        { ...main, id: '123' },
        { ...sauce, id: '789' }
      ]);
      expect(state.bun).toEqual({ ...bun, id: '000' });
    });

    test('удаление нескольких ингредиентов', () => {
      let state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        removeIngredient('123')
      );
      state = BurgerConstructorSlice.reducer(state, removeIngredient('456'));

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients).toEqual([{ ...sauce, id: '789' }]);
      expect(state.bun).toEqual({ ...bun, id: '000' });
    });

    test('удаление несуществующего ингредиента', () => {
      const state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        removeIngredient('345')
      );

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients).toEqual([
        { ...main, id: '123' },
        { ...sauce, id: '456' },
        { ...sauce, id: '789' }
      ]);
      expect(state.bun).toEqual({ ...bun, id: '000' });
    });
  });

  describe('тесты на изменение порядка ингредиентов в бургере', () => {
    const initialBurgerConstructorState = {
      ingredients: [
        { ...main, id: '123' },
        { ...sauce, id: '456' },
        { ...main, id: '789' }
      ],
      bun: { ...bun, id: '000' }
    };

    test('перемещение ингредиента на соседнюю позицию', () => {
      const state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        moveIngredient({ fromIndex: 1, toIndex: 0 })
      );

      expect(state.bun).toEqual({
        ...bun,
        id: '000'
      });

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients).toEqual([
        { ...sauce, id: '456' },
        { ...main, id: '123' },
        { ...main, id: '789' }
      ]);
    });

    test('многократное перемещение ингредиента', () => {
      let state = BurgerConstructorSlice.reducer(
        initialBurgerConstructorState,
        moveIngredient({ fromIndex: 0, toIndex: 1 })
      );

      state = BurgerConstructorSlice.reducer(
        state,
        moveIngredient({ fromIndex: 1, toIndex: 2 })
      );

      expect(state.bun).toEqual({
        ...bun,
        id: '000'
      });

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients).toEqual([
        { ...sauce, id: '456' },
        { ...main, id: '789' },
        { ...main, id: '123' }
      ]);
    });
  });
});
