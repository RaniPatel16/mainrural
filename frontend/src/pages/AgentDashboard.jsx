import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../features/orders/orderSlice';
import { 
    Truck, Package, MapPin, Navigation, 
    CheckCircle2, Clock, IndianRupee, TrendingUp,
    Activity, Shield, ChevronRight, Zap, Map as MapIcon,
    AlertCircle, Phone, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const AgentDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orders = [] } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    // Filter orders assigned to this agent
    const assignedOrders = orders.filter(order => order.agentId === user?._id || order.agentId === user?.id);
    const pendingDeliveries = assignedOrders.filter(o => o.status === 'out-for-delivery' || o.status === 'assigned');
    const completedToday = assignedOrders.filter(o => o.status === 'delivered').length;

    const stats = [
        { 
            title: "Today's Earnings", 
            value: `₹${completedToday * 50 + 450}`, 
            icon: <IndianRupee size={22} />, 
            color: '#10b981', bg: '#f0fdf4',
            trend: '+₹120 since morning'
        },
        { 
            title: 'Active Tasks', 
            value: pendingDeliveries.length, 
            icon: <Truck size={22} />, 
            color: '#455af7', bg: '#eff6ff',
            trend: 'Priority routing active'
        },
        { 
            title: 'Reliability Score', 
            value: '99.2%', 
            icon: <Shield size={22} />, 
            color: '#7c3aed', bg: '#f5f3ff',
            trend: 'Top 5% in region'
        }
    ];

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
            {/* Header Section */}
            <div style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Activity size={16} />
                        Active Duty • On-Shift
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
                        Agent Hub: {user?.name?.split(' ')[0] || 'Partner'}
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>You have {pendingDeliveries.length} shipments scheduled for immediate dispatch.</p>
                </div>
                
                <Link to="/logistics" style={{
                    padding: '1rem 2rem', background: '#455af7', color: 'white', borderRadius: '16px',
                    textDecoration: 'none', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem',
                    boxShadow: '0 20px 40px -10px rgba(69, 90, 247, 0.3)'
                }}>
                    <Navigation size={18} /> Launch Route Optimizer
                </Link>
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
                                LIVE
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

            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2.5rem' }}>
                {/* Active Deliveries List */}
                <motion.div variants={item} style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Current Dispatch List</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.25rem' }}>Sorted by regional proximity</p>
                        </div>
                        <Link to="/logistics" style={{ color: '#455af7', fontWeight: 800, textDecoration: 'none', fontSize: '0.9rem' }}>View Full Map</Link>
                    </div>

                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                        {pendingDeliveries.length > 0 ? (
                            pendingDeliveries.map((order) => (
                                <div key={order._id} style={{ 
                                    padding: '1.5rem', borderRadius: '24px', background: '#f8fafc',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ 
                                            width: '60px', height: '60px', borderRadius: '18px', background: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#455af7',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden'
                                        }}>
                                            {order.addressId?.photo ? (
                                                <img src={`http://localhost:5000${order.addressId.photo}`} alt="Loc" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <Package size={24} />
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <p style={{ fontWeight: 800, fontSize: '1.05rem' }}>{order.addressId?.landmark || 'Regional Drop-off'}</p>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.25rem 0.6rem', borderRadius: '6px', background: '#eff6ff', color: '#455af7', textTransform: 'uppercase' }}>#{order._id.slice(-4)}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                                                    <MapPin size={14} /> {order.addressId?.village || 'Unknown Village'}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                                                    <Clock size={14} /> Priority Delivery
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button style={{ 
                                            padding: '0.75rem', borderRadius: '12px', background: 'white', 
                                            border: '1px solid #e2e8f0', color: '#455af7', cursor: 'pointer' 
                                        }}>
                                            <Phone size={18} />
                                        </button>
                                        <Link to={`/orders/${order._id}`} style={{ 
                                            padding: '0.75rem 1.25rem', borderRadius: '12px', background: '#455af7', 
                                            color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                                        }}>
                                            Dispatch <ArrowUpRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <div style={{ marginBottom: '1.5rem', color: '#e2e8f0' }}>
                                    <Package size={60} />
                                </div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Clear Skies!</h4>
                                <p style={{ color: '#94a3b8', fontWeight: 500 }}>No pending deliveries in your queue currently.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Performance & Quick Actions Sidebar */}
                <div style={{ display: 'grid', gap: '2rem', gridAutoRows: 'max-content' }}>
                    {/* Efficiency Card */}
                    <motion.div variants={item} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '32px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Zap size={20} color="#fbbf24" />
                                Power Status
                            </h3>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8 }}>Shift Progress</span>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>65%</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                    <div style={{ width: '65%', height: '100%', background: '#455af7', borderRadius: '10px' }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Avg Speed</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 900 }}>24m/del</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Fuel Bonus</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>+₹85</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '150px', height: '150px', background: '#455af7', filter: 'blur(80px)', opacity: 0.3 }}></div>
                    </motion.div>

                    {/* Quick Resources */}
                    <motion.div variants={item} style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Support & Tools</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {[
                                { label: 'Regional Hub Directory', icon: <MapIcon size={18} /> },
                                { label: 'Vehicle Maintenance', icon: <Truck size={18} /> },
                                { label: 'Emergency Support', icon: <AlertCircle size={18} />, color: '#ef4444' }
                            ].map((tool, i) => (
                                <button key={i} style={{ 
                                    width: '100%', padding: '1rem', borderRadius: '16px', background: '#f8fafc',
                                    border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem',
                                    fontWeight: 700, fontSize: '0.9rem', color: tool.color || '#0f172a', cursor: 'pointer',
                                    textAlign: 'left'
                                }}>
                                    <div style={{ color: tool.color || '#455af7' }}>{tool.icon}</div>
                                    {tool.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AgentDashboard;
