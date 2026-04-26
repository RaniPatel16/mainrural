import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/orders/orderSlice';
import { getAddresses } from '../features/addresses/addressSlice';
import { createOrder } from '../features/orders/orderSlice';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders, isLoading } = useSelector((state) => state.orders);
    const { addresses } = useSelector((state) => state.addresses);

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getAddresses());
    }, [dispatch]);

    const handleQuickOrder = (addressId) => {
        if (window.confirm('Place a new order for this address?')) {
            dispatch(createOrder({ addressId }));
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Order History</h1>
                <Link to="/orders/new" className="btn btn-primary" style={{ width: 'auto' }}>New Shipment</Link>
            </div>

            {isLoading ? <p>Loading orders...</p> : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {orders && orders.length > 0 ? orders.map((order) => (
                        <Link to={`/orders/${order._id}`} key={order._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ padding: '0.75rem', background: '#6366f115', color: '#6366f1', borderRadius: '0.75rem' }}>
                                    <ShoppingBag size={20} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Order #{order._id.slice(-6).toUpperCase()}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                        {order.addressId?.landmark || 'Saved Address'} • {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <span style={{ 
                                    fontSize: '0.875rem', 
                                    padding: '0.4rem 1rem', 
                                    borderRadius: '2rem',
                                    background: order.status === 'delivered' ? '#10b98120' : '#6366f120',
                                    color: order.status === 'delivered' ? '#10b981' : '#6366f1',
                                    fontWeight: 500,
                                    textTransform: 'capitalize'
                                }}>
                                    {order.status}
                                </span>
                                <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
                            </div>
                        </Link>
                    )) : (
                        <div className="text-center card" style={{ padding: '4rem 2rem' }}>
                            <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                            <h3>No orders yet</h3>
                            <p className="text-muted">Once you place an order, it will appear here.</p>
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: '4rem' }}>
                <h2>Your Saved Addresses</h2>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Pick an address to place a quick order</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {addresses && addresses.map((address) => (
                        <div key={address._id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
                                    {address.addressId}
                                </span>
                            </div>
                            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{address.landmark}</p>
                            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                GPS: {address.gpsLocation.latitude.toFixed(4)}, {address.gpsLocation.longitude.toFixed(4)}
                            </p>
                            <button className="btn btn-primary" onClick={() => handleQuickOrder(address._id)}>Order Here</button>
                        </div>
                    ))}
                    <Link to="/addresses/new" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', textDecoration: 'none' }}>
                        <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
                            <ShoppingBag size={24} style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>Add New Location</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
