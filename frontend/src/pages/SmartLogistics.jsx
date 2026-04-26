import { useState, useEffect } from 'react';
import { Map as MapIcon, Zap, Layers, MapPin, Navigation, ChevronRight, Activity, Target, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toast from 'react-hot-toast';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view updates
const MapViewHandler = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const SmartLogistics = () => {
    const [view, setView] = useState('clusters'); // clusters or route
    const [mapCenter, setMapCenter] = useState([23.0225, 72.5814]);
    const [mapZoom, setMapZoom] = useState(13);
    const [isOptimizing, setIsOptimizing] = useState(false);
    
    const clusters = [
        { id: 1, name: "North Sector (Village A)", orders: 5, color: '#6366f1', distance: '4.2 km', position: [23.0225, 72.5714] },
        { id: 2, name: "East Sector (River Side)", orders: 3, color: '#10b981', distance: '6.8 km', position: [23.0335, 72.6014] },
        { id: 3, name: "Market Area", orders: 12, color: '#fbbf24', distance: '1.5 km', position: [23.0115, 72.5614] }
    ];

    const route = [
        { id: 1, stop: "Base Warehouse", time: "09:00 AM", status: 'completed', position: [23.0225, 72.5714] },
        { id: 2, stop: "Checkpoint #1 (Near Temple)", time: "09:20 AM", status: 'active', position: [23.0285, 72.5814] },
        { id: 3, stop: "River Path Cluster", time: "09:45 AM", status: 'pending', position: [23.0335, 72.6014] },
        { id: 4, stop: "Village School Dropoff", time: "10:15 AM", status: 'pending', position: [23.0405, 72.6114] }
    ];

    const routeCoordinates = route.map(r => r.position);

    useEffect(() => {
        if (view === 'clusters') {
            setMapCenter([23.0225, 72.5814]);
            setMapZoom(13);
        } else {
            setMapCenter([23.0315, 72.5914]);
            setMapZoom(14);
        }
    }, [view]);

    const handleClusterClick = (pos) => {
        setMapCenter(pos);
        setMapZoom(15);
        toast.success('Focusing on sector area');
    };

    const handleOptimize = () => {
        setIsOptimizing(true);
        const toastId = toast.loading('AI Engines optimizing clusters...');
        setTimeout(() => {
            setIsOptimizing(false);
            toast.success('Clusters optimized for maximum efficiency!', { id: toastId });
        }, 2000);
    };

    const handleOpenNavigation = () => {
        if (route.length === 0) return;
        
        const origin = `${route[0].position[0]},${route[0].position[1]}`;
        const destination = `${route[route.length - 1].position[0]},${route[route.length - 1].position[1]}`;
        const waypoints = route.slice(1, -1).map(r => `${r.position[0]},${r.position[1]}`).join('|');
        
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
        
        window.open(googleMapsUrl, '_blank');
        toast.success('Opening Google Maps Navigation...');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                <div>
                   <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: '#0f172a' }}>AI Logistics Hub</h1>
                   <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Intelligent route optimization and regional clustering.</p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <button 
                        className={`btn ${view === 'clusters' ? 'btn-primary' : ''}`} 
                        onClick={() => setView('clusters')}
                        style={{ 
                            width: 'auto', padding: '0.75rem 1.5rem', borderRadius: '14px',
                            background: view === 'clusters' ? '#455af7' : 'transparent',
                            color: view === 'clusters' ? 'white' : '#64748b',
                            boxShadow: view === 'clusters' ? '0 8px 16px rgba(69, 90, 247, 0.25)' : 'none'
                        }}
                    >
                        <Layers size={18} style={{ marginRight: '0.5rem' }} /> Region Clusters
                    </button>
                    <button 
                        className={`btn ${view === 'route' ? 'btn-primary' : ''}`} 
                        onClick={() => setView('route')}
                        style={{ 
                            width: 'auto', padding: '0.75rem 1.5rem', borderRadius: '14px',
                            background: view === 'route' ? '#455af7' : 'transparent',
                            color: view === 'route' ? 'white' : '#64748b',
                            boxShadow: view === 'route' ? '0 8px 16px rgba(69, 90, 247, 0.25)' : 'none'
                        }}
                    >
                        <Zap size={18} style={{ marginRight: '0.5rem' }} /> Optimized Route
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2.5rem', alignItems: 'start' }}>
                {/* Left Side: Map Overlay Card */}
                <div className="card" style={{ padding: '0', height: '620px', overflow: 'hidden', position: 'relative', background: '#0f172a', borderRadius: '32px' }}>
                    <div style={{ 
                        position: 'absolute', inset: 0, 
                        background: 'radial-gradient(circle at 20% 30%, rgba(69, 90, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
                        zIndex: 1
                    }}></div>
                    
                    {/* Simulated Map UI Elements */}
                    <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', marginBottom: '0.5rem' }}>
                                    <Activity size={18} color="#10b981" />
                                    <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>Live Grid Analysis</span>
                                </div>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>3 active clusters detected in your sector.</p>
                            </div>
                            
                            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                                <Target size={24} />
                            </div>
                        </div>

                        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                             <MapContainer 
                                center={mapCenter} 
                                zoom={mapZoom} 
                                style={{ height: '100%', width: '100%' }}
                                zoomControl={false}
                                attributionControl={false}
                             >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                />
                                <MapViewHandler center={mapCenter} zoom={mapZoom} />
                                
                                {view === 'clusters' ? clusters.map(c => (
                                    <Marker key={c.id} position={c.position}>
                                        <Popup>
                                            <div style={{ padding: '5px' }}>
                                                <strong style={{ color: '#0f172a' }}>{c.name}</strong><br/>
                                                <span style={{ color: '#64748b' }}>{c.orders} orders • {c.distance}</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )) : (
                                    <>
                                        <Polyline positions={routeCoordinates} color="#455af7" weight={4} opacity={0.6} dashArray="10, 10" />
                                        {route.map(r => (
                                            <Marker key={r.id} position={r.position}>
                                                <Popup>
                                                    <div style={{ padding: '5px' }}>
                                                        <strong style={{ color: '#0f172a' }}>{r.stop}</strong><br/>
                                                        <span style={{ color: '#64748b' }}>Scheduled: {r.time}</span>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </>
                                )}
                             </MapContainer>
                        </div>
                        
                        {/* Map Indicators */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={view}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-around' }}
                            >
                                {view === 'clusters' ? clusters.map(c => (
                                    <motion.div 
                                        whileHover={{ scale: 1.1 }}
                                        key={c.id} 
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.color, border: '4px solid rgba(255,255,255,0.2)', boxShadow: `0 0 20px ${c.color}` }}></div>
                                        <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 800 }}>{c.name}</span>
                                    </motion.div>
                                )) : (
                                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity }} style={{ height: '100%', background: 'linear-gradient(90deg, transparent, #455af7, transparent)' }} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Data Feed */}
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <AnimatePresence mode="wait">
                        {view === 'clusters' ? (
                            <motion.div key="clusters" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRadius: '12px', color: '#455af7' }}><Layers size={22} /></div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900 }}>Collection Clusters</h3>
                                    </div>

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {clusters.map(c => (
                                            <motion.div 
                                                whileHover={{ x: 5, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                key={c.id} 
                                                onClick={() => handleClusterClick(c.position)}
                                                style={{ 
                                                    padding: '1.25rem', background: '#f8fafc', borderRadius: '20px', 
                                                    border: '1px solid #f1f5f9', borderLeft: `6px solid ${c.color}`, 
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    cursor: 'pointer', transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <div>
                                                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.2rem' }}>{c.name}</h4>
                                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>{c.orders} Pending Orders</span>
                                                        <span style={{ width: '4px', height: '4px', background: '#cbd5e1', borderRadius: '50%' }}></span>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#455af7' }}>{c.distance}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight size={18} color="#cbd5e1" />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <button 
                                        className="btn" 
                                        onClick={handleOptimize}
                                        disabled={isOptimizing}
                                        style={{ 
                                            marginTop: '2rem', background: '#eff6ff', color: '#455af7', 
                                            fontWeight: 800, border: 'none', width: '100%',
                                            opacity: isOptimizing ? 0.7 : 1
                                        }}
                                    >
                                        {isOptimizing ? 'Optimizing...' : 'Optimize Clustering'}
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="route" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                                        <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRadius: '12px', color: '#10b981' }}><Zap size={22} /></div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900 }}>Live Route Planner</h3>
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.5rem', position: 'relative' }}>
                                        {route.map((r, i) => (
                                            <div key={r.id} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <div style={{ 
                                                        width: '28px', height: '28px', borderRadius: '50%', 
                                                        background: r.status === 'completed' ? '#10b981' : (r.status === 'active' ? '#455af7' : 'white'), 
                                                        border: r.status === 'pending' ? '2px solid #e2e8f0' : 'none',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                                        zIndex: 2, boxShadow: r.status === 'active' ? '0 0 15px rgba(69, 90, 247, 0.4)' : 'none'
                                                    }}>
                                                        {r.status === 'completed' ? <Check size={14} /> : (i + 1)}
                                                    </div>
                                                    {i !== route.length - 1 && <div style={{ 
                                                        width: '2px', height: '60px', 
                                                        background: r.status === 'completed' ? '#10b981' : '#e2e8f0',
                                                        margin: '0.25rem 0'
                                                    }}></div>}
                                                </div>
                                                <div style={{ paddingTop: '0.2rem' }}>
                                                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: r.status === 'pending' ? '#94a3b8' : '#0f172a', marginBottom: '0.2rem' }}>{r.stop}</h4>
                                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: r.status === 'active' ? '#455af7' : '#94a3b8' }}>{r.time} Arrival</span>
                                                        {r.status === 'active' && <span style={{ background: '#eff6ff', color: '#455af7', fontSize: '0.6rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 900 }}>EN ROUTE</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={handleOpenNavigation}
                                        style={{ 
                                            marginTop: '2.5rem', height: '56px', borderRadius: '18px', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                            gap: '0.75rem', fontSize: '1rem', fontWeight: 800, 
                                            background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)', 
                                            border: 'none', boxShadow: '0 15px 35px rgba(69, 90, 247, 0.3)',
                                            width: '100%'
                                        }}
                                    >
                                        <Navigation size={20} /> Open Map Navigation
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Efficiency Card */}
                    <div className="card" style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #dcfce7' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'white', borderRadius: '10px', color: '#22c55e' }}><ShieldCheck size={20} /></div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: '#166534' }}>98% Route Efficiency</h4>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Saving ~40 mins today with AI pathing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SmartLogistics;
