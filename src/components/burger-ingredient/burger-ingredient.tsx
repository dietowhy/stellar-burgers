import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  constructorItemsSelector
} from '../../services/slices/burgerConstructor-slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count: countProp }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const constructorItems = useSelector(constructorItemsSelector);

    const count = useMemo(() => {
      if (typeof countProp === 'number') return countProp;
      let c = 0;
      if (constructorItems.bun && constructorItems.bun._id === ingredient._id) {
        c += 2;
      }
      c += constructorItems.ingredients.filter(
        (i) => i._id === ingredient._id
      ).length;
      return c;
    }, [constructorItems, ingredient._id, countProp]);

    const handleAdd = () => {
      dispatch(addIngredient({ ingredient }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
