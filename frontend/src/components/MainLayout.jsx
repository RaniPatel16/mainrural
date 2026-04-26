import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    // Define paths where the MainLayout (Sidebar/Navbar) should NOT be shown
    const noLayoutPaths = ['/', '/login', '/register'];
    const currentPath = location.pathname.endsWith('/') && location.pathname !== '/' 
        ? location.pathname.slice(0, -1) 
        : location.pathname;
    
    const isNoLayoutPath = noLayoutPaths.includes(currentPath);

    if (!user || isNoLayoutPath) return <>{children}</>;

    return (
        <div className="layout-wrapper">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
