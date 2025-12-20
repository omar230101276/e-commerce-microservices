import React, { useState } from 'react';
import axios from 'axios';
import { X, Save } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/products', {
                name,
                price: parseFloat(price),
                stock: parseInt(stock)
            });
            onProductAdded();
            onClose();
            setName('');
            setPrice('');
            setStock('');
        } catch (err) {
            alert('Failed to add product');
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
            <div className="glass-card" style={{ width: '400px', padding: '30px', position: 'relative' }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
                }}>
                    <X size={20} />
                </button>

                <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Add New Product</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Product Name</label>
                        <input
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px',
                                background: 'var(--bg-dark)', border: '1px solid var(--border-color)',
                                color: 'white', outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Price ($)</label>
                        <input
                            required
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px',
                                background: 'var(--bg-dark)', border: '1px solid var(--border-color)',
                                color: 'white', outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Initial Stock</label>
                        <input
                            required
                            type="number"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
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
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
