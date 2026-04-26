import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Truck, MapPin, ShieldCheck, Users, ArrowRight, Zap, Globe, 
    Clock, ChevronRight, BarChart3, Cloud, ShoppingBag, 
    LayoutDashboard, Database, Activity, LogIn, Layout, 
    CheckCircle2, Star, Target, Zap as ZapIcon, Shield
} from 'lucide-react';
import Footer from '../components/Footer';

const Landing = () => {
    const { user } = useSelector(state => state.auth);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const floatingVariant = {
        animate: {
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <div style={{ 
            background: '#ffffff', 
            color: '#0f172a',
            minHeight: '100vh', 
            overflowX: 'hidden',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            {/* Navigation */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ 
                    maxWidth: '1300px', margin: '0 auto', padding: '1.25rem 2rem', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.8)', 
                    backdropFilter: 'blur(16px)', zIndex: 1000, borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}
            >
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#455af7', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)', 
                        padding: '0.5rem', borderRadius: '12px', display: 'flex',
                        boxShadow: '0 8px 16px -4px rgba(69, 90, 247, 0.4)'
                    }}>
                        <Truck color="white" size={22} />
                    </div>
                    <span style={{ letterSpacing: '-0.02em' }}>RuralReach</span>
                </div>
                
                <div style={{ display: 'none', lg: 'flex', gap: '2.5rem', alignItems: 'center', fontSize: '0.95rem', fontWeight: 600, color: '#64748b' }}>
                    {['Solutions', 'Infrastructure', 'Global Agents'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} style={{ 
                            textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' 
                        }} onMouseEnter={(e) => e.target.style.color = '#455af7'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>
                            {item}
                        </a>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {!user ? (
                        <>
                            <Link to="/login" style={{ 
                                textDecoration: 'none', color: '#0f172a', fontWeight: 700, fontSize: '0.95rem', padding: '0.7rem 1.5rem' 
                            }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ 
                                padding: '0.8rem 1.8rem', borderRadius: '50px', textDecoration: 'none',
                                background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)',
                                boxShadow: '0 10px 25px -5px rgba(69, 90, 247, 0.4)',
                                border: 'none', color: 'white', fontWeight: 700
                            }}>Get Started</Link>
                        </>
                    ) : (
                        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-primary" style={{ 
                            padding: '0.8rem 1.8rem', borderRadius: '50px', textDecoration: 'none',
                            background: '#0f172a', color: 'white', fontWeight: 700,
                            display: 'flex', gap: '0.6rem', alignItems: 'center'
                        }}>
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                    )}
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div style={{ 
                position: 'relative', overflow: 'hidden', padding: '6rem 2rem 10rem',
                backgroundImage: 'radial-gradient(circle at 90% 10%, #f5f3ff 0%, transparent 40%), radial-gradient(circle at 10% 90%, #eff6ff 0%, transparent 40%)'
            }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} style={{ 
                            display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
                            background: 'rgba(69, 90, 247, 0.08)', color: '#455af7', 
                            padding: '0.6rem 1.25rem', borderRadius: '100px', 
                            fontSize: '0.85rem', fontWeight: 800, marginBottom: '2.5rem',
                            border: '1px solid rgba(69, 90, 247, 0.1)'
                        }}>
                            <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                                <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '9999px', background: '#455af7', opacity: 0.75 }}></span>
                                <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '8px', width: '8px', background: '#455af7' }}></span>
                            </span>
                            v2.4 UPDATE: PREDICTIVE LOGISTICS LIVE
                        </motion.div>

                        <motion.h1 variants={itemVariants} style={{ 
                            fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, color: '#0f172a', 
                            marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.04em' 
                        }}>
                            Empowering Rural <br/>
                            Communities with <br/>
                            <span style={{ 
                                background: 'linear-gradient(90deg, #455af7, #7c3aed)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent' 
                            }}>Smart Supply Chains</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} style={{ 
                            color: '#64748b', fontSize: '1.25rem', lineHeight: 1.6, 
                            marginBottom: '3.5rem', maxWidth: '580px', fontWeight: 450
                        }}>
                            Bridging the last mile with satellite-verified tracking, regional predictive clustering, and sub-meter mapping for the world's most remote areas.
                        </motion.p>

                        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {!user ? (
                                <>
                                    <Link to="/register" className="btn btn-primary" style={{ 
                                        borderRadius: '50px', padding: '1.2rem 2.8rem', fontSize: '1.1rem', fontWeight: 800,
                                        background: '#0f172a', color: 'white', border: 'none', transition: 'all 0.3s'
                                    }}>Start Shipping Free</Link>
                                    <Link to="/login" className="btn btn-secondary" style={{ 
                                        borderRadius: '50px', padding: '1.2rem 2.8rem', fontSize: '1.1rem', fontWeight: 700,
                                        background: 'transparent', border: '2px solid #e2e8f0', color: '#0f172a', textDecoration: 'none'
                                    }}>Watch Product Tour</Link>
                                </>
                            ) : (
                                <Link to="/dashboard" className="btn btn-primary" style={{ 
                                    borderRadius: '50px', padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 800,
                                    background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)', color: 'white', border: 'none'
                                }}>Resume Active Deliveries</Link>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} style={{ marginTop: '4rem', display: 'flex', gap: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem' }}>300+</h4>
                                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Villages Served</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem' }}>42ms</h4>
                                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Latency Avg</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem' }}>99.9%</h4>
                                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Arrival Accuracy</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div style={{ position: 'relative' }}>
                        <motion.div 
                            variants={floatingVariant}
                            animate="animate"
                            style={{ 
                                position: 'relative', zIndex: 2,
                                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.12))'
                            }}
                        >
                            <div style={{ 
                                background: 'white', padding: '0.75rem', borderRadius: '32px',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <img 
                                    src="/hero.png" 
                                    alt="SaaS Platform Preview" 
                                    style={{ width: '100%', borderRadius: '24px', display: 'block' }} 
                                />
                            </div>
                        </motion.div>

                        {/* Floating Interaction Cards */}
                        <motion.div 
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            style={{ 
                                position: 'absolute', top: '10%', right: '-10%', 
                                zIndex: 3, background: 'white', padding: '1.25rem',
                                borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                width: '200px', border: '1px solid #f1f5f9'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#f0fdf4', color: '#10b981', padding: '0.4rem', borderRadius: '8px' }}>
                                    <Activity size={18} />
                                </div>
                                <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#10b981' }}>CONNECTED</span>
                            </div>
                            <div style={{ display: 'grid', gap: '0.4rem' }}>
                                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px' }}>
                                    <div style={{ width: '70%', height: '100%', background: '#455af7', borderRadius: '10px' }}></div>
                                </div>
                                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>Syncing mesh nodes...</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="solutions" style={{ padding: '10rem 2rem', background: '#fcfdff' }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Advanced Tech, Local Impact</h2>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
                            We've engineered a logistics stack specifically for non-standard environments, ensuring no location is ever "off the grid."
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {[
                            { 
                                icon: <MapPin size={28} />, 
                                title: "Adaptive Mapping", 
                                desc: "Proprietary grid system that indexes dirt tracks and unmapped paths using satellite telemetry.",
                                color: "#455af7", bg: "#eff6ff"
                            },
                            { 
                                icon: <ZapIcon size={28} />, 
                                title: "Mesh Routing", 
                                desc: "Network-aware routing that updates dynamically based on flash floods or road blockages.",
                                color: "#f59e0b", bg: "#fff7ed"
                            },
                            { 
                                icon: <Shield size={28} />, 
                                title: "Proof-of-Life delivery", 
                                desc: "Multimodal verification using localized OTPs and community-verified agent handoffs.",
                                color: "#10b981", bg: "#f0fdf4"
                            }
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                style={{ 
                                    background: 'white', padding: '3.5rem 2.5rem', borderRadius: '32px',
                                    border: '1px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                                }}
                            >
                                <div style={{ 
                                    width: '64px', height: '64px', background: feature.bg, color: feature.color,
                                    borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '2.5rem'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>{feature.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '1.05rem' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Infrastructure Showcase */}
            <div id="infrastructure" style={{ padding: '10rem 2rem', background: '#0f172a', color: 'white', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative gradients */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2, background: 'radial-gradient(circle at 10% 10%, #455af7 0%, transparent 40%), radial-gradient(circle at 90% 90%, #7c3aed 0%, transparent 40%)' }}></div>
                
                <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '6rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <div>
                        <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            THE PHYSICAL LAYER
                        </div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.1 }}>Regional Collection Hubs</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                            Our physical network consists of over 500+ solar-powered modular hubs that serve as decentralized nerve centers for regional sorting and distribution.
                        </p>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {[
                                "Hyper-local sorting within 2km of production",
                                "Solar-powered climate controlled storage",
                                "Community-owned mesh hotspots"
                            ].map((text, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#455af7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CheckCircle2 size={14} color="white" />
                                    </div>
                                    <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img 
                            src="/infrastructure.png" 
                            alt="Infrastructure Hub" 
                            style={{ width: '100%', borderRadius: '40px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)' }} 
                        />
                        <div style={{ position: 'absolute', bottom: '-2rem', left: '2rem', background: '#455af7', padding: '2rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                            <h5 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.25rem' }}>+500</h5>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>Active Hubs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div style={{ padding: '10rem 2rem' }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Trusted by Regional Partners</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} fill="#f59e0b" color="#f59e0b" size={24} />)}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
                        {[
                            { name: "John Doe", role: "Dairy Cooperative Manager", text: "RuralReach reduced our spoilage rates by 60% through their climate-controlled cluster delivery system." },
                            { name: "Jane Smith", role: "Farmer Association Lead", text: "The transparent tracking provides our buyers with confidence that was never possible before." }
                        ].map((t, i) => (
                            <div key={i} style={{ background: '#f8fafc', padding: '3.5rem', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                                <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#1e293b', marginBottom: '2.5rem', lineHeight: 1.6 }}>"{t.text}"</p>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#455af7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{t.name[0]}</div>
                                    <div>
                                        <h5 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{t.name}</h5>
                                        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final Conversion Section */}
            <div style={{ padding: '8rem 2.5rem' }}>
                <div style={{ 
                    maxWidth: '1300px', margin: '0 auto', 
                    background: 'linear-gradient(135deg, #455af7 0%, #7c3aed 100%)',
                    borderRadius: '48px', padding: '8rem 2rem', textAlign: 'center',
                    boxShadow: '0 40px 80px -15px rgba(69, 90, 247, 0.4)',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'white', marginBottom: '2rem', letterSpacing: '-0.03em' }}>
                            Start shipping to the <br/> unreached today.
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
                            Join thousands of producers and logistics agents building a more connected world. Setup takes less than 2 minutes.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                             <Link to="/register" style={{ 
                                background: 'white', color: '#455af7', padding: '1.25rem 3rem', borderRadius: '100px',
                                textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                             }}>Get Started for Free</Link>
                             <Link to="/login" style={{ 
                                background: 'rgba(255,255,255,0.1)', color: 'white', padding: '1.25rem 3rem', borderRadius: '100px',
                                textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem', border: '1px solid rgba(255,255,255,0.2)'
                             }}>Login to Dashboard</Link>
                        </div>
                    </div>
                    {/* Decorative abstract shapes */}
                    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'white', opacity: 0.05 }}></div>
                    <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'white', opacity: 0.05 }}></div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Landing;
