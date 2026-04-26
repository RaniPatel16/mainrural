import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../features/admin/adminSlice';
import { getOrders } from '../features/orders/orderSlice';
import { Users, Truck, ShoppingCart, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users = [], agents = [] } = useSelector((state) => state.admin);
    const { orders = [] } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getOrders());
    }, [dispatch]);

    const stats = [
        { title: 'Total Users', value: users.length, icon: <Users />, color: '#6366f1' },
        { title: 'Active Agents', value: agents.length, icon: <Truck />, color: '#10b981' },
        { title: 'Total Orders', value: orders.length, icon: <ShoppingCart />, color: '#fbbf24' },
        { title: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: <Activity />, color: '#f87171' },
    ];

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Administrative Control Hub</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ textAlign: 'center' }}>
                        <div style={{ color: stat.color, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                            {stat.icon}
                        </div>
                        <h2 style={{ marginBottom: '0.25rem' }}>{stat.value}</h2>
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>{stat.title}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card">
                    <h3>Management</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        <Link to="/admin/users" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            <Users size={20} style={{ marginRight: '0.75rem' }} /> Manage All Users
                        </Link>
                        <Link to="/admin/agents" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            <Truck size={20} style={{ marginRight: '0.75rem' }} /> Manage Delivery Agents
                        </Link>
                        <Link to="/admin/orders" className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
                            <ShoppingCart size={20} style={{ marginRight: '0.75rem' }} /> Assign Agents to Orders
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <h3>Pending Orders</h3>
                    <ul style={{ listStyle: 'none', marginTop: '1.5rem' }}>
                        {orders && orders.filter(o => o.status === 'pending').slice(0, 5).map(order => (
                            <li key={order._id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ fontWeight: 600 }}>{order.userId?.name}</p>
                                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>#{order._id.slice(-6).toUpperCase()}</p>
                                </div>
                                <Link to="/admin/orders" style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>Assign</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
