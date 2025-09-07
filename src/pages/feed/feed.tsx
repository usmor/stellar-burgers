import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getAllOrders, getIsLoading } from '../../services/feedInfo/slice';
import { FeedInfoAction } from '../../services/feedInfo/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FeedInfoAction());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getAllOrders);
  const isLoading: boolean = useSelector(getIsLoading);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(FeedInfoAction());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
