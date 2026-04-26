import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Camera, CheckCircle2, Loader2, Info, AlertCircle, Trash2, Map, ShoppingBag, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createAddress, reset } from '../features/addresses/addressSlice';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue in Leaflet + Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition, setLatitude, setLongitude }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setLatitude(lat.toFixed(6));
            setLongitude(lng.toFixed(6));
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const ChangeView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 13);
        }
    }, [center, map]);
    return null;
};

const CreateAddress = () => {
    const [latitude, setLatitude] = useState('0.000000');
    const [longitude, setLongitude] = useState('0.000000');
    const [landmark, setLandmark] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default India center
    const [markerPosition, setMarkerPosition] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.addresses);

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && !isLoading) {
            const timer = setTimeout(() => {
                navigate('/addresses');
                dispatch(reset());
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, isLoading, navigate, dispatch]);

    const handleLocationDetection = () => {
        setIsDetecting(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLatitude(lat.toFixed(6));
                    setLongitude(lng.toFixed(6));
                    setMapCenter([lat, lng]);
                    setMarkerPosition([lat, lng]);
                    setIsDetecting(false);
                },
                (error) => {
                    console.error(error);
                    setIsDetecting(false);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
            setIsDetecting(false);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('landmark', landmark);
        if (photo) data.append('photo', photo);

        dispatch(createAddress(data));
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1200px' }}>
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#455af7', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                    <Navigation size={18} /> LOCATION SERVICES
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a' }}>Register New Address</h1>
                <p style={{ color: '#64748b', fontSize: '1.15rem' }}>Provide precise coordinates and visual landmarks for accurate delivery.</p>
            </div>

            <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Interactive Map Card */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden', height: '450px', position: 'relative' }}>
                        <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationMarker position={markerPosition} setPosition={setMarkerPosition} setLatitude={setLatitude} setLongitude={setLongitude} />
                            <ChangeView center={mapCenter} />
                        </MapContainer>
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
                            <button 
                                type="button" 
                                onClick={handleLocationDetection} 
                                className="btn btn-primary"
                                style={{ boxShadow: '0 10px 20px rgba(69, 90, 247, 0.3)', padding: '0.8rem 1.2rem' }}
                            >
                                {isDetecting ? <Loader2 className="animate-spin" size={20} /> : <Navigation size={20} />}
                                {isDetecting ? 'Detecting...' : 'Get Current Location'}
                            </button>
                        </div>
                    </div>

                    {/* Coordinates Info */}
                    <div className="grid-2">
                        <div className="card">
                            <label style={{ display: 'block', fontWeight: 800, marginBottom: '1rem', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Latitude</label>
                            <input 
                                type="text" className="form-control" value={latitude} 
                                onChange={(e) => {
                                    setLatitude(e.target.value);
                                    if(!isNaN(parseFloat(e.target.value)) && !isNaN(parseFloat(longitude))) {
                                        setMarkerPosition([parseFloat(e.target.value), parseFloat(longitude)]);
                                        setMapCenter([parseFloat(e.target.value), parseFloat(longitude)]);
                                    }
                                }} 
                            />
                        </div>
                        <div className="card">
                            <label style={{ display: 'block', fontWeight: 800, marginBottom: '1rem', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Longitude</label>
                            <input 
                                type="text" className="form-control" value={longitude} 
                                onChange={(e) => {
                                    setLongitude(e.target.value);
                                    if(!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(e.target.value))) {
                                        setMarkerPosition([parseFloat(latitude), parseFloat(e.target.value)]);
                                        setMapCenter([parseFloat(latitude), parseFloat(e.target.value)]);
                                    }
                                }} 
                            />
                        </div>
                    </div>

                    {/* Landmark Card */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#fff7ed', color: '#f59e0b', padding: '0.75rem', borderRadius: '12px' }}><Info size={24} /></div>
                            <div>
                                <h3 style={{ margin: 0 }}>Landmark & Info</h3>
                                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>Help our agents find you faster</p>
                            </div>
                        </div>
                        <textarea 
                            className="form-control" rows="4" style={{ resize: 'none', background: '#f8fafc' }}
                            placeholder="e.g. Blue house near the village temple, large mango tree in front..."
                            value={landmark} onChange={(e) => setLandmark(e.target.value)} required
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Photo Upload Zone */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', background: '#eff6ff', color: '#455af7', borderRadius: '12px' }}>
                                <ShoppingBag size={20} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900 }}>Collection Point Photo</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Upload a clear image of the landmark.</p>
                            </div>
                        </div>

                        <div 
                            style={{ 
                                border: '2px dashed #e2e8f0', borderRadius: '18px', padding: '3rem',
                                textAlign: 'center', background: '#f8fafc', cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = '#455af7'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                            onClick={() => document.getElementById('photo-upload').click()}
                        >
                            {photo ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)' }}>
                                        <img src={URL.createObjectURL(photo)} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <p style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{photo.name}</p>
                                    <button type="button" className="btn" style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#ef4444', fontSize: '0.8rem' }} onClick={(e) => { e.stopPropagation(); setPhoto(null); }}>Remove Photo</button>
                                </div>
                            ) : (
                                <>
                                    <Plus size={32} color="#94a3b8" style={{ marginBottom: '1rem' }} />
                                    <p style={{ fontWeight: 800, color: '#64748b' }}>Click to select image</p>
                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>PNG, JPG or WebP (Max 5MB)</p>
                                </>
                            )}
                            <input id="photo-upload" type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                        </div>
                    </div>

                    <button 
                        type="submit" disabled={isLoading} 
                        className="btn btn-primary" 
                        style={{ width: '100%', padding: '1.25rem', borderRadius: '18px', fontSize: '1.1rem', fontWeight: 900, boxShadow: '0 20px 40px -10px rgba(69, 90, 247, 0.4)' }}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <><Check size={24} /> Register Address</>}
                    </button>

                    {isError && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '14px', display: 'flex', gap: '0.75rem' }}>
                            <AlertCircle size={20} /> <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{message}</span>
                        </div>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

export default CreateAddress;
