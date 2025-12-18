import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddPlant from './pages/AddPlant';
import PlantDetails from './pages/PlantDetails';
import Community from './pages/Community';
import AdminPanel from './pages/AdminPanel';
import Plants from './pages/Plants';
import Alerts from './pages/Alerts';
import LandingPage from './pages/LandingPage';
import AIGardener from './components/AIGardener';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
          <Route path="/add-plant" element={user ? <AddPlant /> : <Navigate to="/login" />} />
          <Route path="/plants" element={user ? <Plants /> : <Navigate to="/login" />} />
          <Route path="/plant/:id" element={user ? <PlantDetails /> : <Navigate to="/login" />} />
          <Route path="/community" element={user ? <Community /> : <Navigate to="/login" />} />
          <Route path="/alerts" element={user ? <Alerts /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
        {user && <AIGardener />}
      </div>
    </Router>
  );
}

export default App;
