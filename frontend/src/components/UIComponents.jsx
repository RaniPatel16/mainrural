export const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.05)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

export const EmptyState = ({ icon, title, message, action }) => (
    <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '300px', margin: '0 auto 2rem' }}>{message}</p>
        {action}
    </div>
);
