import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectCurrentUser } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector((state) => selectCurrentUser(state.user));
  return <AppHeaderUI userName={user?.name} />;
};
