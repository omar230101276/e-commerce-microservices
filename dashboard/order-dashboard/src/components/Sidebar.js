import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Server, ShoppingCart, Package } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Overview' },
        { path: '/cluster', icon: Server, label: 'Cluster Status' },
        { path: '/orders', icon: ShoppingCart, label: 'Orders' },
        { path: '/products', icon: Package, label: 'Products' },
    ];

    return (
        <div className="sidebar" style={{
            width: '250px',
            height: '100vh',
            backgroundColor: 'var(--bg-card)',
            borderRight: '1px solid var(--border-color)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', background: 'var(--accent-primary)', borderRadius: '8px' }}></div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>E-Comm Hub</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                            transition: 'all 0.2s ease',
                            borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent'
                        })}
                    >
                        <item.icon size={20} style={{ marginRight: '12px' }} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', padding: '20px', background: 'var(--bg-dark)', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>System Status</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)', boxShadow: '0 0 8px var(--accent-secondary)' }}></div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--accent-secondary)' }}>Operational</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
