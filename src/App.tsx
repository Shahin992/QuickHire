import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplyJobPage from './pages/ApplyJobPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import PostJobPage from './pages/PostJobPage';
import JobListingsPage from './pages/JobListingsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-light">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/apply/:id" element={<ApplyJobPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/post" element={<PostJobPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
