import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ roles }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Case-insensitive role check
    const userRole = user.role?.toLowerCase();
    const allowedRoles = roles?.map(r => r.toLowerCase());

    if (roles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/forbidden" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
