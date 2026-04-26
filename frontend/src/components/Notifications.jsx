import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Your order #8F2A was assigned to Agent Sam.", type: "info", time: "2m ago" },
        { id: 2, text: "New delivery request in your cluster!", type: "alert", time: "5m ago" }
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const remove = (id) => setNotifications(n => n.filter(item => item.id !== id));

    return (
        <div style={{ position: 'relative' }}>
            <motion.button 
                whileHover={{ y: -3, scale: 1.05 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    width: '52px', height: '52px', border: 'none', 
                    background: 'white', borderRadius: '18px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: '#64748b', cursor: 'pointer', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    position: 'relative'
                }}
            >
                <Bell size={22} color={isOpen ? '#455af7' : '#64748b'} />
                {notifications.length > 0 && (
                    <span style={{ 
                        position: 'absolute', top: '12px', right: '12px', background: '#ef4444', 
                        color: 'white', fontSize: '9px', fontWeight: 900, borderRadius: '6px', 
                        minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', border: '2px solid white',
                        boxShadow: '0 2px 5px rgba(239, 68, 68, 0.3)'
                    }}>
                        {notifications.length}
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        style={{ 
                            position: 'absolute', top: '120%', right: 0, width: '340px', 
                            zIndex: 1000, padding: '1.5rem',
                            background: 'white', borderRadius: '24px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px #f1f5f9'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Recent Notifications</h4>
                            <X size={18} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', color: '#94a3b8' }} />
                        </div>

                        {notifications.length > 0 ? (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {notifications.map(n => (
                                    <div key={n.id} style={{ 
                                        padding: '1rem', background: '#f8fafc', 
                                        borderRadius: '16px', border: '1px solid #f1f5f9',
                                        transition: 'all 0.2s'
                                    }}>
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 700, color: '#334155', lineHeight: '1.5' }}>{n.text}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>{n.time}</span>
                                            <button 
                                                onClick={() => remove(n.id)} 
                                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontSize: '0.75rem', fontWeight: 800 }}
                                            >
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid #f1f5f9', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 800, color: '#455af7', cursor: 'pointer', marginTop: '0.5rem' }}>
                                    View All Activity
                                </button>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#cbd5e1' }}>
                                    <Bell size={24} />
                                </div>
                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>Your inbox is empty</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
