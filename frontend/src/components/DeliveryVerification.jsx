import { useState } from 'react';
import { User, Users, ShieldCheck, Camera } from 'lucide-react';

const DeliveryVerification = ({ deliveryId, onComplete }) => {
    const [method, setMethod] = useState('self'); // self or neighbor
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('status', 'delivered');
        formData.append('otp', otp);
        formData.append('deliveredTo', method);
        if (method === 'neighbor') formData.append('neighborName', neighborName);
        if (file) formData.append('proofPhoto', file);

        onComplete({ deliveryId, formData });
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2 className="text-center" style={{ marginBottom: '1.5rem' }}>Complete Delivery</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div 
                    onClick={() => setMethod('self')}
                    style={{ 
                        flex: 1, padding: '1rem', borderRadius: '1rem', cursor: 'pointer', textAlign: 'center',
                        background: method === 'self' ? '#6366f115' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${method === 'self' ? 'var(--primary)' : 'transparent'}`
                    }}>
                    <User size={24} style={{ marginBottom: '0.5rem', color: method === 'self' ? 'var(--primary)' : 'var(--text-muted)' }} />
                    <p style={{ fontSize: '0.875rem' }}>Recipient</p>
                </div>
                <div 
                    onClick={() => setMethod('neighbor')}
                    style={{ 
                        flex: 1, padding: '1rem', borderRadius: '1rem', cursor: 'pointer', textAlign: 'center',
                        background: method === 'neighbor' ? '#6366f115' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${method === 'neighbor' ? 'var(--primary)' : 'transparent'}`
                    }}>
                    <Users size={24} style={{ marginBottom: '0.5rem', color: method === 'neighbor' ? 'var(--primary)' : 'var(--text-muted)' }} />
                    <p style={{ fontSize: '0.875rem' }}>Neighbor</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {method === 'neighbor' && (
                    <div className="form-group">
                        <label>Neighbor's Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={neighborName} 
                            onChange={(e) => setNeighborName(e.target.value)}
                            placeholder="Who received the package?"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Verification OTP</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        required
                    />
                    <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                        OTP sent to the recipient's registered phone number.
                    </p>
                </div>

                <div className="form-group">
                    <label>Photo Proof</label>
                    <input 
                        type="file" 
                        id="proofFile" 
                        style={{ display: 'none' }} 
                        onChange={(e) => setFile(e.target.files[0])} 
                    />
                    <label htmlFor="proofFile" className="form-control" style={{ borderStyle: 'dashed', textAlign: 'center', padding: '2rem', cursor: 'pointer' }}>
                        <Camera size={24} style={{ color: file ? 'var(--primary)' : 'var(--text-muted)' }} />
                        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                            {file ? `File: ${file.name}` : 'Click to take a photo of the delivered package'}
                        </p>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    <ShieldCheck size={18} style={{ marginRight: '0.5rem' }} /> Verify & Finish
                </button>
            </form>
        </div>
    );
};

export default DeliveryVerification;
