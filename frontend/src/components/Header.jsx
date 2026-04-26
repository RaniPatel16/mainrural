import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogOut, User, MapPin, Package } from 'lucide-react';

import Notifications from './Notifications';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="container">
      <Link to="/" className="logo">
        RuralReach
      </Link>
      <nav>
        <ul style={{ gap: '2rem' }}>
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Notifications />
              </li>
              <li>
                <button className="btn btn-secondary" onClick={onLogout} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                  <LogOut size={18} style={{ marginRight: '0.5rem' }} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
