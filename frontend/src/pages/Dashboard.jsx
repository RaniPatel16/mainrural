import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../features/orders/orderSlice';
import { getAddresses } from '../features/addresses/addressSlice';
import { 
    MapPin, ShoppingBag, History, Plus, 
    ArrowUpRight, Clock, CheckCircle2, 
    Package, TrendingUp, ChevronRight, Activity, Truck, Info, Globe, Map as MapIcon, DollarSign, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orders = [] } = useSelector((state) => state.orders);
    const { addresses = [] } = useSelector((state) => state.addresses);

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getAddresses());
    }, [dispatch]);

    // Safety check for user
    if (!user) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <Activity size={40} className="animate-pulse" color="#455af7" />
                <p style={{ fontWeight: 600, color: '#64748b' }}>Hydrating your workspace...</p>
            </div>
        );
    }

    const agentStats = [
        { 
            title: 'Daily Earnings', 
            value: '₹850', 
            icon: <DollarSign size={22} />, 
            color: '#10b981', bg: '#f0fdf4',
            trend: '+15% bonus today'
        },
        { 
            title: 'Assigned Orders', 
            value: orders?.length || '0', 
            icon: <ShoppingBag size={22} />, 
            color: '#455af7', bg: '#eff6ff',
            trend: 'Live monitoring active'
        },
        { 
            title: 'Efficiency Score', 
            value: '98%', 
            icon: <Activity size={22} />, 
            color: '#7c3aed', bg: '#f5f3ff',
            trend: 'Elite Agent Status'
        },
    ];

    const userStats = [
        { 
            title: 'Active Orders', 
            value: orders?.filter(o => o.status !== 'delivered').length || 0, 
            icon: <ShoppingBag size={22} />, 
            color: '#455af7', bg: '#eff6ff',
            trend: 'Live updates'
        },
        { 
            title: 'In Transit', 
            value: orders?.filter(o => o.status === 'out-for-delivery').length || 0, 
            icon: <Truck size={22} />, 
            color: '#f59e0b', bg: '#fff7ed',
            trend: 'Tracking active'
        },
        { 
            title: 'Completed', 
            value: orders?.filter(o => o.status === 'delivered').length || 0, 
            icon: <CheckCircle2 size={22} />, 
            color: '#10b981', bg: '#f0fdf4',
            trend: '99% success rate'
        },
    ];

    const stats = user?.role === 'agent' ? agentStats : userStats;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            style={{ paddingBottom: '4rem' }}
        >
            <div style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#455af7', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Activity size={16} />
                    System Live
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
                    Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
                </h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Monitor your logistics and deliveries in real-time.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i} 
                        variants={item}
                        whileHover={{ y: -5 }}
                        style={{ 
                            background: 'white', padding: '2rem', borderRadius: '32px', 
                            border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            display: 'flex', flexDirection: 'column', gap: '1.5rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ padding: '1rem', background: stat.bg, color: stat.color, borderRadius: '16px' }}>
                                {stat.icon}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', background: '#f0fdf4', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>
                                <TrendingUp size={14} />
                                UP
                            </div>
                        </div>
                        <div>
                            <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.title}</p>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>{stat.value}</h2>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', fontWeight: 500 }}>{stat.trend}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
                {/* Recent Activity Card */}
                <motion.div variants={item} style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Recent Shipments</h3>
                        <Link to="/orders/history" style={{ 
                            fontSize: '0.85rem', fontWeight: 800, color: '#455af7', 
                            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' 
                        }}>
                            View All <ChevronRight size={16} />
                        </Link>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {orders && orders.length > 0 ? (
                            orders.slice(0, 4).map((order) => (
                                <div key={order._id} style={{ 
                                    padding: '1.25rem', borderRadius: '20px', background: '#f8fafc',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ background: 'white', padding: '0.6rem', borderRadius: '12px', color: '#64748b', overflow: 'hidden', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {order.addressId?.photo ? (
                                                <img src={`http://localhost:5000${order.addressId.photo}`} alt="Loc" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <Package size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{order.addressId?.landmark || 'Regional Delivery'}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}</p>
                                        </div>
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.7rem', fontWeight: 900, padding: '0.5rem 1rem', borderRadius: '100px',
                                        background: order.status === 'delivered' ? '#f0fdf4' : '#eff6ff',
                                        color: order.status === 'delivered' ? '#10b981' : '#455af7'
                                    }}>
                                        {order.status || 'pending'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <Package size={40} color="#e2e8f0" style={{ marginBottom: '1rem' }} />
                                <p style={{ color: '#94a3b8', fontWeight: 600 }}>No active shipments.</p>
                            </div>
                        )}
                    </div>

                    {/* New Feature: Your Collection Points */}
                    <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 900 }}>Collection Points</h4>
                            <Link to="/addresses" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#455af7', textDecoration: 'none' }}>Manage All</Link>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                            {addresses && addresses.length > 0 ? (
                                addresses.slice(0, 3).map((addr) => (
                                    <div key={addr._id} style={{ 
                                        minWidth: '200px', padding: '1.25rem', borderRadius: '20px', 
                                        background: '#f8fafc', border: '1px solid #f1f5f9' 
                                    }}>
                                        <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#455af7' }}>
                                            <MapPin size={16} />
                                        </div>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{addr.landmark || 'Unnamed'}</p>
                                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Lat: {addr?.gpsLocation?.latitude ? parseFloat(addr.gpsLocation.latitude).toFixed(2) : '0.00'}</p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>No addresses saved yet.</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column */}
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Feature: Live Network Status */}
                    <motion.div variants={item} style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Globe size={20} color="#455af7" />
                            Network Status
                        </h3>
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            {[
                                { city: 'Regional Hub A', status: 'Operational', load: '45%' },
                                { city: 'Village Cluster B', status: 'High Traffic', load: '82%' }
                            ].map((hub, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>{hub.city}</p>
                                        <p style={{ fontSize: '0.75rem', color: hub.status === 'Operational' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{hub.status}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '10px' }}>
                                            <div style={{ width: hub.load, height: '100%', background: '#455af7', borderRadius: '10px' }}></div>
                                        </div>
                                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem', fontWeight: 600 }}>{hub.load} load</p>
                                    </div>
                                </tr>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions Card */}
                    <motion.div variants={item} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '32px', color: 'white' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Instant Actions</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {user?.role === 'agent' ? (
                                <>
                                    <Link to="/logistics" style={{ 
                                        background: '#455af7', color: 'white', textDecoration: 'none',
                                        padding: '1.1rem', borderRadius: '16px', display: 'flex', alignItems: 'center',
                                        gap: '1rem', fontWeight: 800
                                    }}>
                                        <Zap size={18} /> Start Smart Route
                                    </Link>
                                    <Link to="/logistics" style={{ 
                                        background: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none',
                                        padding: '1.1rem', borderRadius: '16px', display: 'flex', alignItems: 'center',
                                        gap: '1rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <MapIcon size={18} /> View Collection Map
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/addresses/new" style={{ 
                                        background: '#455af7', color: 'white', textDecoration: 'none',
                                        padding: '1.1rem', borderRadius: '16px', display: 'flex', alignItems: 'center',
                                        gap: '1rem', fontWeight: 800
                                    }}>
                                        <Plus size={18} /> Register Collection Point
                                    </Link>
                                    <Link to="/orders/new" style={{ 
                                        background: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none',
                                        padding: '1.1rem', borderRadius: '16px', display: 'flex', alignItems: 'center',
                                        gap: '1rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <Plus size={18} /> Create New Shipment
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
