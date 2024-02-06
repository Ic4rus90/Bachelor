import React from 'react';
import './App.css';
import HomePage from './pages/home-page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profile-page';
import NotFoundPage from './pages/not-found-page';
import DashboardPage from './pages/dashboard-page';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path= "/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

