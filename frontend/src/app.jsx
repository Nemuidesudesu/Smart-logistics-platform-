import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DispatcherDashboard from './pages/DispatcherDashboard';
import CourierDashboard from './pages/CourierDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="font-black text-xl text-blue-600">SmartLogistics</div>
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/dispatcher" className="text-gray-600 hover:text-blue-600">Диспетчер</Link>
          <Link to="/courier" className="text-gray-600 hover:text-blue-600">Курьер</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/dispatcher" element={<DispatcherDashboard />} />
        <Route path="/courier" element={<CourierDashboard />} />
        <Route path="*" element={<DispatcherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}