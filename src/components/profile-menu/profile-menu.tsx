import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { ProfileMenuUI } from '@ui';
import { logout } from '../../services/slices/user-slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
