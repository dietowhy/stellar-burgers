import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  feedIsLoadingSelector,
  feedOrdersSelector,
  getFeeds
} from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(feedIsLoadingSelector);
  const orders = useSelector(feedOrdersSelector);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
