import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import CreateOrderModal from '../components/CreateOrderModal';
import OrderDetailsModal from '../components/OrderDetailsModal';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            // Attempt to fetch from Order Service (Port 8002)
            // If running in Docker via localhost mapping
            // Note: browser treats 3000 -> 8002 as Cross-Origin if strictly separate. 
            // We assume User has CORS handled or is running local.
            // For 'user1' as per original code
            const res = await axios.get('http://localhost:8002/orders/user/user1');
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000); // Polling every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <CreateOrderModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onOrderCreated={fetchOrders}
            />
            <OrderDetailsModal
                isOpen={!!selectedOrder}
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onOrderUpdated={fetchOrders}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>Orders</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>New Order</button>
            </div>

            <div className="glass-card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', gap: '15px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 40px',
                            background: 'var(--bg-dark)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                </div>
                <button style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'var(--bg-dark)', border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer'
                }}>
                    <Filter size={18} /> Filter
                </button>
            </div>

            <div className="glass-card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Order ID</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Status</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Items</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Total</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && !loading && (
                            <tr>
                                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No orders found.</td>
                            </tr>
                        )}
                        {orders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '20px', fontFamily: 'monospace' }}>#{order.id.slice(0, 8)}...</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem',
                                        background: order.status === 'paid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                        color: order.status === 'paid' ? 'var(--accent-secondary)' : 'var(--accent-primary)'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>{order.items.length} items</td>
                                <td style={{ padding: '20px' }}>$ --</td>
                                <td style={{ padding: '20px' }}>
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
