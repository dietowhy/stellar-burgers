import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IngredientState } from '@utils-types';
import { getIngredientsApi } from '@api';

export const initialState: IngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredient/get',
  getIngredientsApi
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.loading,
    selectIngredientsError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  }
});

export const ingredientsReducer = ingredientSlice.reducer;
export const {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} = ingredientSlice.selectors;
