import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { PatientLogin } from './pages/PatientLogin';
import { DoctorLogin } from './pages/DoctorLogin';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';

export default function App() {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/patient/login" 
          element={<PatientLogin onLogin={() => setUserRole('patient')} />} 
        />
        <Route 
          path="/doctor/login" 
          element={<DoctorLogin onLogin={() => setUserRole('doctor')} />} 
        />
        <Route 
          path="/patient/dashboard" 
          element={<PatientDashboard darkMode={darkMode} setDarkMode={setDarkMode} />} 
        />
        <Route 
          path="/doctor/dashboard" 
          element={<DoctorDashboard darkMode={darkMode} setDarkMode={setDarkMode} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
