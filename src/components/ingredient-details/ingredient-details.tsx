import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading,
  getIngredients
} from '../../services/slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === id) || null,
    [ingredients, id]
  );

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
