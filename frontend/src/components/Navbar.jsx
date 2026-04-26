import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { LogOut, Search, Settings, HelpCircle, Bell, User } from 'lucide-react';
import Notifications from './Notifications';
import { motion } from 'framer-motion';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4rem',
            padding: '0.25rem 0',
            background: 'transparent',
            position: 'sticky',
            top: 0,
            zIndex: 90
        }}>
            {/* Search Bar Container */}
            <div style={{ position: 'relative', width: '500px' }}>
                <Search size={18} style={{ 
                    position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', 
                    color: '#94a3b8', zIndex: 2 
                }} />
                <input 
                    type="text" 
                    placeholder="Search anything..." 
                    style={{ 
                        width: '100%',
                        padding: '1.25rem 1.5rem 1.25rem 4rem', 
                        border: 'none',
                        borderRadius: '24px',
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        outline: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03), inset 0 0 0 2px #f1f5f9',
                        color: '#0f172a'
                    }}
                    onFocus={(e) => {
                        e.target.style.boxShadow = '0 15px 35px rgba(69, 90, 247, 0.1), inset 0 0 0 2px #455af7';
                        e.target.style.width = '550px';
                        e.target.style.background = 'white';
                    }}
                    onBlur={(e) => {
                        e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03), inset 0 0 0 2px #f1f5f9';
                        e.target.style.width = '500px';
                        e.target.style.background = 'rgba(255,255,255,0.8)';
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <motion.button 
                        whileHover={{ y: -3, scale: 1.05 }}
                        style={{ width: '52px', height: '52px', border: 'none', background: 'white', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
                    >
                        <HelpCircle size={22} />
                    </motion.button>
                    <Notifications />
                </div>
                
                <div style={{ height: '32px', width: '2px', background: '#e2e8f0', borderRadius: '10px' }}></div>

                {/* Profile Link */}
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <motion.div 
                        whileHover={{ x: 3 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                    >
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: '#0f172a' }}>{user.name}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>Account Setting</p>
                        </div>
                        <div style={{ 
                            width: '52px', height: '52px', 
                            background: (user?.profilePhoto && user.profilePhoto !== 'default-avatar.png') ? 'white' : 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)',
                            borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                            fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(69, 90, 247, 0.2)',
                            overflow: 'hidden'
                        }}>
                            {user?.profilePhoto && user.profilePhoto !== 'default-avatar.png' ? (
                                <img src={`http://localhost:5000${user.profilePhoto}`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                user?.name?.charAt(0)
                            )}
                        </div>
                    </motion.div>
                </Link>

                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onLogout}
                    style={{ 
                        background: '#fef2f2', 
                        color: '#ef4444', 
                        border: 'none',
                        width: '52px', height: '52px',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
                    }}
                    title="Logout Session"
                >
                    <LogOut size={22} />
                </motion.button>
            </div>
        </nav>
    );
};

export default Navbar;
