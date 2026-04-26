import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAddresses, reset } from '../features/addresses/addressSlice';
import { 
    MapPin, Plus, Navigation, Camera, 
    MoreVertical, Trash2, Map, ChevronRight,
    Loader2, Search, ArrowUpRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapModal = ({ address, onClose }) => {
    if (!address) return null;
    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                style={{ background: 'white', width: '100%', maxWidth: '800px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)' }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>{address.landmark}</h3>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>Collection Point Visualization</p>
                    </div>
                    <button onClick={onClose} style={{ background: '#f8fafc', border: 'none', padding: '0.5rem', borderRadius: '12px', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>
                <div style={{ height: '400px' }}>
                    <MapContainer center={[address?.gpsLocation?.latitude || 0, address?.gpsLocation?.longitude || 0]} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[address?.gpsLocation?.latitude || 0, address?.gpsLocation?.longitude || 0]}>
                            <Popup>{address?.landmark}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div style={{ padding: '1.5rem 2rem', background: '#f8fafc', display: 'flex', gap: '2rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Latitude</p>
                        <p style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{address?.gpsLocation?.latitude || 'N/A'}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Longitude</p>
                        <p style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{address?.gpsLocation?.longitude || 'N/A'}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AddressList = () => {
    const [selectedMapAddr, setSelectedMapAddr] = useState(null);
    const dispatch = useDispatch();
    const { addresses, isLoading } = useSelector((state) => state.addresses);

    useEffect(() => {
        dispatch(getAddresses());
        return () => dispatch(reset());
    }, [dispatch]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ paddingBottom: '4rem' }}
        >
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#455af7', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <MapPin size={16} />
                        Collection Network
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
                        Saved Addresses
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Manage your delivery points and collection hubs.</p>
                </div>
                
                <Link to="/addresses/new" style={{ 
                    background: '#0f172a', color: 'white', textDecoration: 'none',
                    padding: '1.1rem 2rem', borderRadius: '16px', display: 'flex', 
                    alignItems: 'center', gap: '0.75rem', fontWeight: 800,
                    boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)',
                    transition: 'all 0.2s'
                }}>
                    <Plus size={20} />
                    Add New Address
                </Link>
            </div>

            {/* List or Empty State */}
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
                    <Loader2 size={48} className="animate-spin" color="#455af7" />
                </div>
            ) : (addresses && addresses.length > 0) ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                    {addresses.map((address) => (
                        <motion.div 
                            key={address._id}
                            whileHover={{ y: -5 }}
                            style={{ 
                                background: 'white', borderRadius: '24px', overflow: 'hidden', 
                                border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                            }}
                        >
                            <div style={{ height: '200px', position: 'relative', background: '#f8fafc' }}>
                                {address.photo && address.photo !== 'no-photo.jpg' ? (
                                    <img 
                                        src={`http://localhost:5000${address.photo}`} 
                                        alt="Location" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div style={{ 
                                    width: '100%', height: '100%', 
                                    display: (address.photo && address.photo !== 'no-photo.jpg') ? 'none' : 'flex', 
                                    alignItems: 'center', justifyContent: 'center', color: '#cbd5e1',
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                                }}>
                                    <MapPin size={48} color="#94a3b8" />
                                </div>
                                <div style={{ 
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                                    padding: '0.5rem', borderRadius: '10px', color: '#0f172a'
                                }}>
                                    <Navigation size={18} />
                                </div>
                            </div>
                            
                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>{address.landmark}</h3>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                                            <span>Lat: {parseFloat(address?.gpsLocation?.latitude || 0).toFixed(4)}</span>
                                            <span>Lon: {parseFloat(address?.gpsLocation?.longitude || 0).toFixed(4)}</span>
                                        </div>
                                    </div>
                                    <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                                    <button 
                                        onClick={() => setSelectedMapAddr(address)}
                                        style={{ 
                                            flex: 1, padding: '0.8rem', borderRadius: '12px', background: '#f8fafc',
                                            border: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.9rem',
                                            fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', 
                                            justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <MapPin size={16} /> View on Map
                                    </button>
                                    <button style={{ 
                                        width: '44px', height: '44px', borderRadius: '12px', background: '#fee2e2',
                                        border: 'none', color: '#dc2626', display: 'flex', alignItems: 'center', 
                                        justifyContent: 'center', cursor: 'pointer'
                                    }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div style={{ 
                    background: 'white', borderRadius: '32px', padding: '6rem 2rem', 
                    textAlign: 'center', border: '1px solid #f1f5f9',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #f8fafc 0%, transparent 70%)'
                }}>
                    <div style={{ 
                        width: '80px', height: '80px', background: '#eff6ff', 
                        color: '#455af7', borderRadius: '24px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem'
                    }}>
                        <MapPin size={40} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>No Addresses Saved</h2>
                    <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        You haven't registered any collection points yet. Add your first address to start shipping.
                    </p>
                    <Link to="/addresses/new" style={{ 
                        background: '#0f172a', color: 'white', textDecoration: 'none',
                        padding: '1.2rem 3rem', borderRadius: '18px', fontWeight: 800,
                        fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                        boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)'
                    }}>
                        <Plus size={20} />
                        New Collection Point
                    </Link>
                </div>
            )}
            {/* Map Modal */}
            <AnimatePresence>
                {selectedMapAddr && (
                    <MapModal 
                        address={selectedMapAddr} 
                        onClose={() => setSelectedMapAddr(null)} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AddressList;
