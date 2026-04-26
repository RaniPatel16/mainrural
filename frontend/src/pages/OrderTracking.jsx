import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../features/orders/orderSlice';
import { LoadingSpinner, EmptyState } from '../components/UIComponents';
import { MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderTracking = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, isLoading, isError, message } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrder(id));
    }, [id, dispatch]);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <EmptyState title="Error" message={message} icon={<Clock size={48}/>} />;
    if (!order) return <EmptyState title="Not Found" message="We couldn't find that order." icon={<Package size={48}/>} />;

    const steps = [
        { status: 'pending', label: 'Order Placed', icon: <Clock />, desc: 'Waiting for confirmation' },
        { status: 'confirmed', label: 'Confirmed', icon: <Package />, desc: 'Agent assigned to order' },
        { status: 'out-for-delivery', label: 'In Transit', icon: <Truck />, desc: 'Agent is on the way' },
        { status: 'delivered', label: 'Delivered', icon: <CheckCircle />, desc: 'Successfully delivered' },
    ];

    const currentStepIndex = steps.findIndex(s => s.status === order.status);

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/orders/history" className="btn btn-secondary" style={{ width: 'auto', padding: '0.5rem' }}>←</Link>
                <h1 style={{ margin: 0 }}>Track Order #{order._id.slice(-6).toUpperCase()}</h1>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {steps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.status} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: '40px', height: '40px', borderRadius: '50%', 
                                        background: isCompleted ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: isCompleted ? 'white' : 'var(--text-muted)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        zIndex: 2,
                                        boxShadow: isCurrent ? '0 0 15px var(--primary-glow)' : 'none'
                                    }}>
                                        {step.icon}
                                    </div>
                                    {index !== steps.length - 1 && (
                                        <div style={{ 
                                            width: '2px', height: '100%', 
                                            background: index < currentStepIndex ? 'var(--primary)' : 'var(--border)',
                                            position: 'absolute', top: '20px', bottom: '-20px', left: '19px', zIndex: 1
                                        }}></div>
                                    )}
                                </div>
                                <div style={{ paddingBottom: '2.5rem' }}>
                                    <h4 style={{ color: isCompleted ? 'white' : 'var(--text-muted)', marginBottom: '0.25rem' }}>{step.label}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>{isCompleted ? (isCurrent ? 'Current Status' : 'Completed') : step.desc}</p>
                                    {isCurrent && (
                                        <div className="badge badge-info" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Active</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.25rem' }}>Delivery Details</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                           <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Landmark</p>
                           <p style={{ fontWeight: 500 }}>{order.addressId?.landmark}</p>
                        </div>
                        <div>
                           <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Smart ID</p>
                           <p style={{ fontWeight: 500 }}>{order.addressId?.addressId}</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '1.25rem' }}>GPS Coordinates</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: '#06b6d415', color: '#06b6d4', borderRadius: '1rem' }}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 600 }}>{order.addressId?.gpsLocation.latitude.toFixed(6)}</p>
                            <p style={{ fontWeight: 600 }}>{order.addressId?.gpsLocation.longitude.toFixed(6)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
