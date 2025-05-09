import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import {
  getFeeds,
  selectFeedOrders,
  selectFeedLoading
} from '../../services/slices/feed';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectFeedOrders);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
