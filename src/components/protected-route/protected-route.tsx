import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  userDataSelector,
  isAuthCheckedSelector
} from '../../services/slices/user-slice';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(userDataSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (!isAuthChecked) {
      return;
    }

    if (onlyUnAuth && user) {
      navigate(from, { replace: true });
    } else if (!onlyUnAuth && !user) {
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [isAuthChecked, user, onlyUnAuth, navigate, from, location]);

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    return null;
  }

  if (!onlyUnAuth && !user) {
    return null;
  }

  return children;
};
