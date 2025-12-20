import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 5px 0', fontSize: '0.9rem' }}>{title}</p>
                <h3 style={{ margin: 0, fontSize: '1.8rem' }}>{value}</h3>
            </div>
            <div style={{
                width: '40px', height: '40px',
                borderRadius: '10px',
                background: `${color}20`, // 20% opacity using hex
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon color={color} size={20} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
            <TrendingUp size={14} color="#10b981" />
            <span style={{ color: '#10b981' }}>{change}</span>
            <span style={{ color: 'var(--text-secondary)' }}>vs last week</span>
        </div>
    </div>
);

const Overview = () => {
    // Determine color hexes because we can't use var() inside recharts effectively without config? 
    // Actually we can, but let's be safe with hex
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={DollarSign} color="#3b82f6" />
                <StatCard title="Total Orders" value="+2350" change="+180.1%" icon={ShoppingBag} color="#10b981" />
                <StatCard title="Active Users" value="+12,234" change="+19%" icon={Users} color="#f59e0b" />
                <StatCard title="Avg. Order Value" value="$128.90" change="+4.5%" icon={TrendingUp} color="#ec4899" />
            </div>

            <div className="glass-card" style={{ padding: '24px', height: '400px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Revenue Analytics</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <Line type="monotone" dataKey="sales" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-dark)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Overview;
