import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/orders/orderSlice';
import { getAllUsers } from '../features/admin/adminSlice';
import { assignAgent } from '../features/deliveries/deliverySlice';
import { Truck, CheckCircle } from 'lucide-react';

const AdminOrderManagement = () => {
    const dispatch = useDispatch();
    const { orders = [] } = useSelector((state) => state.orders);
    const { agents = [] } = useSelector((state) => state.admin);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState('');

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleAssign = (e) => {
        e.preventDefault();
        if (!selectedOrder || !selectedAgent) return;
        
        dispatch(assignAgent({ orderId: selectedOrder._id, agentId: selectedAgent }));
        setSelectedOrder(null);
        setSelectedAgent('');
        // Refresh orders
        setTimeout(() => dispatch(getOrders()), 1000);
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Order Management</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div>
                    <div className="card">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '1rem' }}>Order ID</th>
                                    <th style={{ padding: '1rem' }}>Customer</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map(order => (
                                    <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}>#{order._id.slice(-6).toUpperCase()}</td>
                                        <td style={{ padding: '1rem' }}>{order.userId?.name}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                padding: '0.2rem 0.6rem', 
                                                borderRadius: '1rem',
                                                background: order.status === 'pending' ? '#f8717120' : '#10b98120',
                                                color: order.status === 'pending' ? '#f87171' : '#10b981'
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {order.status === 'pending' ? (
                                                <button 
                                                    className="btn btn-primary" 
                                                    style={{ padding: '0.4rem 0.8rem', width: 'auto', fontSize: '0.875rem' }}
                                                    onClick={() => setSelectedOrder(order)}
                                                >
                                                    Assign Agent
                                                </button>
                                            ) : (
                                                <CheckCircle size={20} style={{ color: '#10b981' }} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className="card" style={{ position: 'sticky', top: '2rem' }}>
                        <h3>Assign Agent</h3>
                        {selectedOrder ? (
                            <form onSubmit={handleAssign} style={{ marginTop: '1.5rem' }}>
                                <p className="text-muted" style={{ marginBottom: '1rem' }}>Assigning agent for Order <strong>#{selectedOrder._id.slice(-6).toUpperCase()}</strong></p>
                                
                                <div className="form-group">
                                    <label>Select Delivery Agent</label>
                                    <select 
                                        className="form-control" 
                                        value={selectedAgent} 
                                        onChange={(e) => setSelectedAgent(e.target.value)}
                                        style={{ appearance: 'auto' }}
                                        required
                                    >
                                        <option value="">-- Choose Agent --</option>
                                        {agents && agents.map(agent => (
                                            <option key={agent._id} value={agent._id}>{agent.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Confirm Assignment</button>
                                <button type="button" className="btn btn-secondary" style={{ marginTop: '0.5rem' }} onClick={() => setSelectedOrder(null)}>Cancel</button>
                            </form>
                        ) : (
                            <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '2rem 0' }}>
                                <Truck size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                                <p className="text-muted">Select a pending order to assign an agent.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderManagement;
