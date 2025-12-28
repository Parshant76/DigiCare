import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Eager load critical components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load route components for better performance
const HomePage = lazy(() => import("./components/HomePage"));
const PatientProfile = lazy(() => import('./components/PatientProfile'));
const DoctorProfile = lazy(() => import('./components/DoctorProfile'));
const FileUpload = lazy(() => import("./components/FileUpload.jsx"));
const AIAssistant = lazy(() => import("./components/AiAssistant"));
const Explore = lazy(() => import("./components/Explore"));
const AboutUsSection = lazy(() => import("./components/AboutUs"));
const FAQ = lazy(() => import("./components/Faq.jsx"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const PatientRegistration = lazy(() => import("./components/PatientRegistration.jsx"));
const DoctorRegistration = lazy(() => import("./components/DoctorRegistration.jsx"));
const AddPatient = lazy(() => import("./components/AddPatient.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const UserGuidedFlow = lazy(() => import("./components/UserGuidedFlow.jsx"));
const Description = lazy(() => import("./components/Description.jsx"));


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Store full user

  const handleLogin = (status, email, user) => {
    setIsLoggedIn(status);
    setUserData(user);
  };

  const handleLogout = () => {
    // Clear token or session data if stored (optional)
    localStorage.removeItem("authToken"); // if you stored token
    localStorage.removeItem("user"); // if you stored user data

    // Reset state
    setIsLoggedIn(false);
    setUserData(null);
  };


  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      {/* <Navbar isLoggedIn={isLoggedIn} userEmail={userEmail} onLogout={handleLogout} /> */}
      {/* <Navbar/> */}
      <Navbar isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />

      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: '#4F46E5' }}>
          Loading...
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* //<Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/description" element={<Description />} />
          <Route path="/user-guided-flow" element={<UserGuidedFlow />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/portal" element={<FileUpload />} />
          <Route path="/image-analysis" element={<AIAssistant />} />
          <Route path="/history" element={<AIAssistant />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-dashboard" element={<UserProfile isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />} />
          <Route path="/patient-dashboard" element={<UserProfile isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/doctor-registration" element={<DoctorRegistration />} />
          <Route path="/add-patient" element={<AddPatient />} />
          {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/UserAvatar" element={<UserAvatar />} /> */}
          <Route
            path="/profile"
            element={<UserProfile isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />}
          />
          <Route path="/patient/profile/:id" element={<PatientProfile />} />
          <Route path="/doctor/profile/:id" element={<DoctorProfile />} />

        </Routes>
      </Suspense>

      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
