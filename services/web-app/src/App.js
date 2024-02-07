import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import User from './pages/UserManagement'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/usermanagement" element={<User />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

