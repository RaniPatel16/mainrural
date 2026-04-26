import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { Truck, CheckCircle2, UserCircle, Briefcase, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const { name, email, password, role } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            if (user?.role === 'admin') navigate('/admin');
            else if (user?.role === 'agent') navigate('/agent/dashboard');
            else navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const selectRole = (newRole) => setFormData({ ...formData, role: newRole });
    const onSubmit = e => {
        e.preventDefault();
        dispatch(register(formData));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'white', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {/* Left Side: Brand Panel */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ 
                    flex: '1.1', background: '#455af7', padding: '3rem 4rem', 
                    display: 'flex', flexDirection: 'column', color: 'white', 
                    position: 'relative', overflow: 'hidden' 
                }}
            >
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 900, marginBottom: '4rem', zIndex: 10 }}>
                    <div style={{ background: 'white', padding: '0.4rem', borderRadius: '10px', display: 'flex' }}>
                        <Truck color="#455af7" size={20} />
                    </div>
                    RuralReach
                </Link>

                <div style={{ position: 'relative', zIndex: 10, marginTop: '2rem' }}>
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}
                    >
                        Join the future of <br/> rural logistics.
                    </motion.h1>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'grid', gap: '1.25rem' }}
                    >
                        {[
                            'Real-time tracking for every shipment',
                            'Optimized routes across any terrain',
                            'Secure community verification'
                        ].map((text, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <CheckCircle2 size={18} style={{ opacity: 0.8 }} />
                                <span style={{ fontWeight: 600, fontSize: '1.1rem', opacity: 0.9 }}>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Glass Testimonial */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                        padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)',
                        maxWidth: '500px'
                    }}>
                        <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="white" color="white" />)}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, fontStyle: 'italic', opacity: 0.9 }}>
                            "RuralReach is a game-changer for regional distribution."
                        </p>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            </motion.div>

            {/* Right Side */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
            >
                <div style={{ width: '100%', maxWidth: '440px' }}>
                    <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a' }}>Create Account</h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Choose your role to get started.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div 
                            onClick={() => selectRole('user')}
                            style={{ 
                                padding: '1.25rem', borderRadius: '12px', border: `2px solid ${role === 'user' ? '#455af7' : '#f1f5f9'}`, 
                                background: role === 'user' ? 'white' : '#f8fafc', cursor: 'pointer', textAlign: 'center',
                                transition: 'all 0.2s', boxShadow: role === 'user' ? '0 10px 20px -5px rgba(69, 90, 247, 0.1)' : 'none'
                            }}
                        >
                            <UserCircle size={24} color={role === 'user' ? '#455af7' : '#94a3b8'} style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.85rem', fontWeight: 800, color: role === 'user' ? '#455af7' : '#64748b', margin: 0 }}>Customer</p>
                        </div>
                        <div 
                            onClick={() => selectRole('agent')}
                            style={{ 
                                padding: '1.25rem', borderRadius: '12px', border: `2px solid ${role === 'agent' ? '#455af7' : '#f1f5f9'}`, 
                                background: role === 'agent' ? 'white' : '#f8fafc', cursor: 'pointer', textAlign: 'center',
                                transition: 'all 0.2s', boxShadow: role === 'agent' ? '0 10px 20px -5px rgba(69, 90, 247, 0.1)' : 'none'
                            }}
                        >
                            <Briefcase size={24} color={role === 'agent' ? '#455af7' : '#94a3b8'} style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.85rem', fontWeight: 800, color: role === 'agent' ? '#455af7' : '#64748b', margin: 0 }}>Agent</p>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                        <input 
                            type="text" name="name" value={name} onChange={onChange} 
                            style={{ padding: '1.1rem 1.25rem', borderRadius: '12px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: 500, width: '100%', outline: 'none' }} 
                            placeholder="Full Name" required 
                        />
                        <input 
                            type="email" name="email" value={email} onChange={onChange} 
                            style={{ padding: '1.1rem 1.25rem', borderRadius: '12px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: 500, width: '100%', outline: 'none' }} 
                            placeholder="Email" required 
                        />
                        <input 
                            type="password" name="password" value={password} onChange={onChange} 
                            style={{ padding: '1.1rem 1.25rem', borderRadius: '12px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: 500, width: '100%', outline: 'none' }} 
                            placeholder="Password" required 
                        />

                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="btn btn-primary" 
                            style={{ 
                                padding: '1.1rem', borderRadius: '12px', fontSize: '1rem', 
                                fontWeight: 800, marginTop: '1rem',
                                background: '#455af7', color: 'white', border: 'none',
                                cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(69, 90, 247, 0.3)'
                            }} 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : `Register as ${role === 'user' ? 'Customer' : 'Agent'}`}
                        </motion.button>
                        
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>
                                Joined already? <Link to="/login" style={{ color: '#455af7', textDecoration: 'none', fontWeight: 800 }}>Log In</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
