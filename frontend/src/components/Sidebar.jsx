import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Home, MapPin, ShoppingBag, History, 
  Settings, Users, Truck, Layout, BarChart, LogOut, ChevronRight,
  Package, Map as MapIcon, Wallet, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    const menuItems = {
        user: [
            { path: '/dashboard', label: 'Overview', icon: <Home size={20} /> },
            { path: '/addresses', label: 'My Addresses', icon: <MapPin size={20} /> },
            { path: '/orders/new', label: 'New Shipment', icon: <Package size={20} /> },
            { path: '/orders/history', label: 'Order History', icon: <History size={20} /> },
        ],
        agent: [
            { path: '/agent/dashboard', label: 'Work Hub', icon: <Home size={20} /> },
            { path: '/logistics', label: 'Delivery Map', icon: <MapIcon size={20} /> },
            { path: '/earnings', label: 'My Earnings', icon: <Wallet size={20} /> },
        ],
        admin: [
            { path: '/admin', label: 'Admin Hub', icon: <Layout size={20} /> },
            { path: '/admin/orders', label: 'Shipment Dispatch', icon: <Truck size={20} /> },
            { path: '/admin/agents', label: 'Global Agents', icon: <Users size={20} /> },
            { path: '/admin/users', label: 'Customer Base', icon: <Users size={20} /> },
        ]
    };

    const commonItems = [
        { path: '/profile', label: 'My Profile', icon: <Settings size={20} /> },
    ];

    const currentItems = menuItems[user?.role?.toLowerCase()] || menuItems.user;

    return (
        <aside style={{
            width: '280px',
            background: '#ffffff',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            padding: '2.5rem 1.5rem',
            borderRight: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
        }}>
            <Link to="/" style={{ 
                marginBottom: '4rem', fontSize: '1.5rem', fontWeight: 900, 
                color: '#455af7', textDecoration: 'none', display: 'flex', 
                alignItems: 'center', gap: '0.75rem' 
            }}>
                <div style={{ 
                    padding: '0.5rem', 
                    background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)', 
                    borderRadius: '12px',
                    display: 'flex',
                    boxShadow: '0 8px 16px -4px rgba(69, 90, 247, 0.3)'
                }}>
                    <Truck color="white" size={20} />
                </div>
                RuralReach
            </Link>

            <nav style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1.5rem', marginLeft: '1rem', letterSpacing: '0.05em' }}>Menu</p>
                <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                    {currentItems.map((item) => (
                        <li key={item.path}>
                            <Link 
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.875rem 1rem',
                                    borderRadius: '14px',
                                    color: location.pathname === item.path ? '#455af7' : '#64748b',
                                    textDecoration: 'none',
                                    background: location.pathname === item.path ? '#455af70a' : 'transparent',
                                    transition: 'all 0.2s',
                                    fontWeight: location.pathname === item.path ? 700 : 500
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ 
                                        color: location.pathname === item.path ? '#455af7' : '#94a3b8',
                                        transition: 'all 0.2s'
                                    }}>
                                        {item.icon}
                                    </div>
                                    {item.label}
                                </div>
                                {location.pathname === item.path && (
                                    <motion.div layoutId="active" style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#455af7' }} />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginTop: '2.5rem', marginBottom: '1.5rem', marginLeft: '1rem', letterSpacing: '0.05em' }}>Account</p>
                <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                    {commonItems.map((item) => (
                        <li key={item.path}>
                            <Link 
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.875rem 1rem',
                                    borderRadius: '14px',
                                    color: location.pathname === item.path ? '#455af7' : '#64748b',
                                    textDecoration: 'none',
                                    background: location.pathname === item.path ? '#455af70a' : 'transparent',
                                    transition: 'all 0.2s',
                                    fontWeight: location.pathname === item.path ? 700 : 500
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ 
                                        color: location.pathname === item.path ? '#455af7' : '#94a3b8',
                                        transition: 'all 0.2s'
                                    }}>
                                        {item.icon}
                                    </div>
                                    {item.label}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ 
                padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid #f1f5f9',
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: '#f8fafc', borderRadius: '20px'
            }}>
                <div style={{ 
                    width: '44px', height: '44px', borderRadius: '14px', 
                    background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(69, 90, 247, 0.2)'
                }}>
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'capitalize', fontWeight: 600 }}>{user?.role}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
