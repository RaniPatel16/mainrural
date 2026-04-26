import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/admin/adminSlice';
import { Truck, Mail, ShieldCheck } from 'lucide-react';

const AgentManagement = () => {
    const dispatch = useDispatch();
    const { agents = [], isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div className="container">
            <div style={{ marginBottom: '2rem' }}>
                <h1>Delivery Agent Network</h1>
                <p className="text-muted">Manage and monitor your regional delivery staff.</p>
            </div>

            {isLoading ? <p>Loading agents...</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {agents && agents.map(agent => (
                        <div key={agent._id} className="card">
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: '#10b98115', color: '#10b981', borderRadius: '1rem' }}>
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: 0 }}>{agent.name}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.8125rem' }}>ID: {agent._id.slice(-8).toUpperCase()}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Mail size={16} /> {agent.email}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                    <ShieldCheck size={16} /> Verified Agent
                                </div>
                            </div>

                            <button className="btn btn-secondary">View Delivery Performance</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AgentManagement;
