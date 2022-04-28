import React from 'react';
import { Routes, Route } from "react-router-dom";
import 'antd/dist/antd.min.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
