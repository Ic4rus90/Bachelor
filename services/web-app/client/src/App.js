import React from 'react';
import './App.css';
import HomePage from './pages/home-page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth-guard';
import NotFoundPage from './pages/not-found-page';
import DashboardPage from './pages/dashboard-page';
import UserManagementPage from './pages/user-management-page'
import AboutPage from './pages/about-page';

// Main app component where routing is configured
function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          {/*Routes setup, including AuthGuard protection for pages requiring authentication*/}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path= "/dashboard" element={<AuthGuard page={DashboardPage} />} />
            <Route path="/account" element={<AuthGuard page={UserManagementPage} />} />
            <Route path="/history" element={<AuthGuard page={NotFoundPage}/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

