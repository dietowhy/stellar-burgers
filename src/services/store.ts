import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../services/slices/ingredients-slice';
import { orderReducer } from '../services/slices/order-slice';
import { feedReducer } from '../services/slices/feed-slice';
import { userReducer } from '../services/slices/user-slice';
import { burgerConstructorReducer } from '../services/slices/burgerConstructor-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
