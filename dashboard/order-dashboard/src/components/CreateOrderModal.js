import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ShoppingCart, Check } from 'lucide-react';

const CreateOrderModal = ({ isOpen, onClose, onOrderCreated }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchProducts();
        }
    }, [isOpen]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/products');
            setProducts(res.data);
            if (res.data.length > 0) {
                setSelectedProduct(res.data[0].id);
            }
        } catch (err) {
            console.error("Failed to load products for order", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Construct payload matching Order Service API
            const payload = {
                user_id: "user1",
                items: [
                    {
                        product_id: selectedProduct,
                        quantity: parseInt(quantity)
                    }
                ]
            };

            await axios.post('http://localhost:8002/orders', payload);
            onOrderCreated();
            onClose();
        } catch (err) {
            alert('Failed to place order');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-card" style={{ width: '400px', padding: '30px', position: 'relative' }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
                }}>
                    <X size={20} />
                </button>

                <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Place New Order</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Select Product</label>
                        <select
                            value={selectedProduct}
                            onChange={e => setSelectedProduct(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px',
                                background: 'var(--bg-dark)', border: '1px solid var(--border-color)',
                                color: 'white', outline: 'none'
                            }}
                        >
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (${p.price}) - {p.stock > 0 ? 'In Stock' : 'OOS'}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px',
                                background: 'var(--bg-dark)', border: '1px solid var(--border-color)',
                                color: 'white', outline: 'none'
                            }}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{
                        marginTop: '10px',
                        padding: '12px',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: disabled => disabled ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                    }}>
                        <ShoppingCart size={18} /> {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrderModal;
