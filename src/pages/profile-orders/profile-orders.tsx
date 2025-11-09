import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  loadingSelector,
  ordersSelector
} from '../../services/slices/order-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrders());
    }
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
