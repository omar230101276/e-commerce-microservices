import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import ClusterStatus from './pages/ClusterStatus';
import Orders from './pages/Orders';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ marginLeft: '250px', flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/cluster" element={<ClusterStatus />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
