import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Plus } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            // Connect to Catalog Service (Port 8000)
            const res = await axios.get('http://localhost:8000/products');
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={fetchProducts}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>Inventory</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div className="glass-card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Product Name</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Price</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Stock</th>
                            <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 && (
                            <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No products in catalog.</td></tr>
                        )}
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--bg-card)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Package size={20} color="var(--text-secondary)" />
                                    </div>
                                    <span style={{ fontWeight: 'bold' }}>{product.name}</span>
                                </td>
                                <td style={{ padding: '20px' }}>${product.price}</td>
                                <td style={{ padding: '20px' }}>{product.stock} units</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem',
                                        background: product.stock > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        color: product.stock > 0 ? 'var(--accent-secondary)' : 'var(--accent-danger)'
                                    }}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products;
