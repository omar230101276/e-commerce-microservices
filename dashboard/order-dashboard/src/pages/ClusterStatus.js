import React, { useState, useEffect } from 'react';
import { Activity, Box, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

const ServiceCard = ({ name, port, type }) => {
    const [status, setStatus] = useState('checking');

    // Simulated health check
    useEffect(() => {
        const checkHealth = async () => {
            // In a real K8s dashboard this would query the API Server
            // Here we simulate checking the local ports or just assume running if deployed
            try {
                // Simulating a network delay
                await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
                setStatus('running');
            } catch (e) {
                setStatus('error');
            }
        };
        checkHealth();
        const interval = setInterval(() => {
            // Randomly flickered cpu usage
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card" style={{ padding: '20px', minWidth: '250px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                    <Box size={24} color="var(--accent-primary)" />
                </div>
                <div style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    background: status === 'running' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 193, 7, 0.2)',
                    color: status === 'running' ? 'var(--accent-secondary)' : '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    {status === 'running' ? <CheckCircle size={12} /> : <Activity size={12} />}
                    {status.toUpperCase()}
                </div>
            </div>

            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{name}</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{type}</p>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Port</span>
                    <span style={{ fontFamily: 'monospace' }}>{port}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>CPU</span>
                    <span style={{ color: 'var(--accent-secondary)' }}>{Math.floor(Math.random() * 20) + 1}%</span>
                </div>
            </div>
        </div>
    );
};

const ClusterStatus = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Cluster Status</h1>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-secondary)' }}>Active Pods</h2>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <ServiceCard name="catalog-service" port="8000" type="Python/FastAPI" />
                    <ServiceCard name="cart-service" port="8001" type="Python/FastAPI" />
                    <ServiceCard name="order-service" port="8002" type="Python/FastAPI" />
                    <ServiceCard name="payment-service" port="8003" type="Python/FastAPI" />
                    <ServiceCard name="order-dashboard" port="3000" type="Node/React" />
                </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <Cpu size={24} color="var(--accent-primary)" />
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>System Metrics</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Total Memory Usage</p>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1.2 GB / 4 GB</div>
                        <div style={{ height: '4px', background: 'var(--bg-hover)', borderRadius: '2px', marginTop: '10px' }}>
                            <div style={{ width: '30%', height: '100%', background: 'var(--accent-primary)', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Load Average</p>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0.45</div>
                        <div style={{ height: '4px', background: 'var(--bg-hover)', borderRadius: '2px', marginTop: '10px' }}>
                            <div style={{ width: '15%', height: '100%', background: 'var(--accent-secondary)', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Uptime</p>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3h 24m</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClusterStatus;
