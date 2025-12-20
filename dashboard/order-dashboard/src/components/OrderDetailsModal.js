import React, { useState } from 'react';
import axios from 'axios';
import { X, Package, Truck, CheckCircle } from 'lucide-react';

const OrderDetailsModal = ({ isOpen, onClose, order, onOrderUpdated }) => {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !order) return null;

    const updateStatus = async (newStatus) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8002/orders/${order.id}/status?status=${newStatus}`);
            onOrderUpdated();
            onClose();
        } catch (err) {
            alert('Failed to update status');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-card" style={{ width: '500px', padding: '30px', position: 'relative' }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
                }}>
                    <X size={20} />
                </button>

                <h2 style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>Order Details</h2>
                <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                    ID: {order.id}
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '10px' }}>Items</h3>
                    <div style={{ background: 'var(--bg-dark)', borderRadius: '8px', padding: '15px' }}>
                        {order.items.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: index < order.items.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: index < order.items.length - 1 ? '8px' : '0' }}>
                                <span style={{ color: 'var(--text-primary)' }}>Product ID: {item.product_id.slice(0, 8)}...</span>
                                <span style={{ color: 'var(--text-secondary)' }}>x{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current Status: <strong style={{ color: 'var(--accent-primary)' }}>{order.status}</strong></span>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {order.status !== 'shipped' && order.status !== 'delivered' && (
                            <button onClick={() => updateStatus('shipped')} disabled={loading} style={{
                                padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                background: 'var(--accent-secondary)', color: 'var(--bg-card)', fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <Truck size={16} /> Mark Shipped
                            </button>
                        )}

                        {order.status === 'shipped' && (
                            <button onClick={() => updateStatus('delivered')} disabled={loading} style={{
                                padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                background: 'var(--accent-success || #10B981)', color: 'white', fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <CheckCircle size={16} /> Mark Delivered
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
