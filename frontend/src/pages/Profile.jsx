import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Shield, Smartphone, Globe, Camera, Check, Settings, ShieldCheck, Clock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProfile, reset } from '../features/auth/authSlice';

const Profile = () => {
    const { user, isLoading, isSuccess } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setIsEditing(false);
            dispatch(reset());
        }
    }, [isSuccess, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        if (photo) {
            data.append('profilePhoto', photo);
        }
        dispatch(updateProfile(data));
    };

    const stats = [
        { label: 'Orders Placed', value: '14', icon: <Clock size={16} />, color: '#455af7' },
        { label: 'Saved Points', value: '3', icon: <Globe size={16} />, color: '#10b981' },
        { label: 'Account Tier', value: 'Premium', icon: <ShieldCheck size={16} />, color: '#7c3aed' }
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: '#0f172a' }}>My Profile</h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Control your digital identity and account security.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '3rem', alignItems: 'start' }}>
                {/* Left: Profile Identity Card */}
                <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)', opacity: 0.05, zIndex: 0 }}></div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 2.5rem' }}>
                            <div style={{ 
                                width: '100%', height: '100%', borderRadius: '42px', 
                                background: 'white',
                                padding: '6px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                            }}>
                                {photoPreview || (user?.profilePhoto && user.profilePhoto !== 'default-avatar.png') ? (
                                    <img 
                                        src={photoPreview || `http://localhost:5000${user.profilePhoto}`} 
                                        alt="Profile" 
                                        style={{ width: '100%', height: '100%', borderRadius: '36px', objectFit: 'cover' }} 
                                    />
                                ) : (
                                    <div style={{ 
                                        width: '100%', height: '100%', borderRadius: '36px',
                                        background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                        fontSize: '3.5rem', fontWeight: 900
                                    }}>
                                        {user?.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                style={{ 
                                    position: 'absolute', bottom: '-8px', right: '-8px', width: '44px', height: '44px', 
                                    background: '#455af7', border: '4px solid white', borderRadius: '15px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                    cursor: 'pointer', boxShadow: '0 8px 16px rgba(69, 90, 247, 0.4)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Camera size={20} />
                            </button>
                            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handlePhotoChange} />
                        </div>

                        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a' }}>{user?.name}</h2>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#eff6ff', padding: '0.4rem 1rem', borderRadius: '100px', marginBottom: '3rem' }}>
                            <Shield size={14} color="#455af7" />
                            <span style={{ color: '#455af7', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.role} Access</span>
                        </div>

                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', transition: 'all 0.2s' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>{stat.icon}</div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>{stat.label}</span>
                                    </div>
                                    <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '1rem' }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Settings & Details */}
                <div style={{ display: 'grid', gap: '3rem' }}>
                    <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.3rem' }}>Personal Profile</h3>
                                <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>Updates are synced across your collection hub.</p>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setIsEditing(!isEditing)}
                                style={{ background: 'transparent', border: 'none', color: '#455af7', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}
                            >
                                {isEditing ? 'Discard Changes' : 'Edit Information'}
                            </button>
                        </div>

                        <div className="grid-2" style={{ gap: '2rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: isEditing ? '#455af7' : '#cbd5e1' }} />
                                    <input 
                                        type="text" name="name" className="form-control" 
                                        value={formData.name} onChange={handleChange}
                                        readOnly={!isEditing} 
                                        style={{ 
                                            paddingLeft: '3.5rem', height: '60px', borderRadius: '18px',
                                            background: !isEditing ? '#f8fafc' : 'white',
                                            border: isEditing ? '2px solid #455af7' : '2px solid #f1f5f9',
                                            fontWeight: 700, transition: 'all 0.2s'
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                                    <input 
                                        type="email" name="email" className="form-control" 
                                        value={formData.email} readOnly 
                                        style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '18px', background: '#f8fafc', border: '2px solid #f1f5f9', color: '#94a3b8', fontWeight: 700 }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Smartphone size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: isEditing ? '#455af7' : '#cbd5e1' }} />
                                    <input 
                                        type="text" name="phone" className="form-control" 
                                        placeholder="+91 00000-00000"
                                        value={formData.phone} onChange={handleChange}
                                        readOnly={!isEditing} 
                                        style={{ 
                                            paddingLeft: '3.5rem', height: '60px', borderRadius: '18px',
                                            background: !isEditing ? '#f8fafc' : 'white',
                                            border: isEditing ? '2px solid #455af7' : '2px solid #f1f5f9',
                                            fontWeight: 700
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <motion.button 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                type="submit" className="btn btn-primary" 
                                style={{ marginTop: '3rem', width: '240px', height: '60px', borderRadius: '18px', boxShadow: '0 20px 40px rgba(69, 90, 247, 0.3)' }}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Check size={22} />}
                                {isLoading ? 'Saving Changes...' : 'Save Profile Changes'}
                            </motion.button>
                        )}
                    </form>

                    <div className="card" style={{ padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: '#f0fdf4', borderRadius: '24px', border: '1px solid #dcfce7' }}>
                            <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)' }}>
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 900, fontSize: '1.1rem', color: '#166534', marginBottom: '0.2rem' }}>Verified Account</h4>
                                <p style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 700 }}>Your identity has been confirmed for regional logistics.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
