import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { userDataSelector } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);

  return <AppHeaderUI userName={user?.name || ''} />;
};
