import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TBurgerConstructorState } from '@utils-types';

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const withId = (item: TIngredient): TConstructorIngredient => ({
  ...item,
  id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
});

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorItemsSelector: (state) => state,
    constructorBunSelector: (state) => state.bun,
    constructorIngredientsSelector: (state) => state.ingredients
  },
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<{ ingredient: TIngredient }>
    ) => {
      const ing = withId(action.payload.ingredient);
      if (ing.type === 'bun') {
        state.bun = ing;
      } else {
        state.ingredients.push(ing);
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex < 0 ||
        toIndex >= state.ingredients.length
      )
        return;
      const updated = [...state.ingredients];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      state.ingredients = updated;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export const {
  constructorItemsSelector,
  constructorBunSelector,
  constructorIngredientsSelector
} = burgerConstructorSlice.selectors;
