import { Truck, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: '#f8fafc', borderTop: '1px solid var(--border)', padding: '5rem 1.5rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.4rem', background: 'var(--primary)', borderRadius: '8px' }}>
                                <Truck color="white" size={18} />
                            </div>
                            RuralReach
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.9375rem' }}>
                            Transforming rural logistics with smart tracking, regional clustering, and community-verified delivery systems.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 700 }}>Platform</h4>
                        <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem', fontSize: '0.9375rem' }}>
                            <li><Link to="/register" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Get Started</Link></li>
                            <li><Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Agent Network</Link></li>
                            <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Pricing</Link></li>
                            <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Smart Address</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 700 }}>Company</h4>
                        <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem', fontSize: '0.9375rem' }}>
                            <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>About Us</Link></li>
                            <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Success Stories</Link></li>
                            <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Security</Link></li>
                            <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 700 }}>Contact Info</h4>
                        <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Mail size={16} /> support@ruralreach.com</li>
                            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Phone size={16} /> +1 (555) 000-0000</li>
                            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><MapPin size={16} /> Silicon Valley, CA</li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <p>© 2026 RuralReach Inc. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of Service</a>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
