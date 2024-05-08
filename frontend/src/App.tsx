import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './routes/login';
import About from './routes/about';
import Inicio from './routes/inicio';
import ProjectTeamPage from './routes/projectTeam';
import Register from './routes/register';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Inicio /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {isLoggedIn && <Route path="/teams" element={<ProjectTeamPage />} />}
        <Route path="/register" element={<Register />} />
        <Route
          path="/inicio"
          element={isLoggedIn ? <Inicio /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
