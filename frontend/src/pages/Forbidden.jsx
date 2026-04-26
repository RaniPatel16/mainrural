import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldAlert } from 'lucide-react';

const Forbidden = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div style={{ 
            height: '70vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center' 
        }}>
            <div style={{ color: '#ef4444', marginBottom: '2rem' }}>
                <ShieldAlert size={80} />
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>403 - Access Denied</h1>
            <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '500px', marginBottom: '2.5rem' }}>
                Sorry, you do not have the required permissions to access this administrative area.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link 
                    to={user?.role === 'admin' ? '/admin' : user?.role === 'agent' ? '/agent/dashboard' : '/dashboard'} 
                    className="btn btn-primary" 
                    style={{ width: 'auto' }}
                >
                    Return to Dashboard
                </Link>
                <Link to="/" className="btn btn-secondary" style={{ width: 'auto' }}>Go Home</Link>
            </div>
        </div>
    );
};

export default Forbidden;
