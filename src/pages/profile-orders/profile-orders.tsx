import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  loadingSelector,
  ordersSelector
} from '../../services/slices/order-slice';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../../services/slices/user-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);
  const isLoading = useSelector(loadingSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);

  useEffect(() => {
    if (isAuthChecked && user && !orders.length) {
      dispatch(getOrders());
    }
  }, [dispatch, isAuthChecked, user, orders.length]);

  return <ProfileOrdersUI orders={orders} />;
};
