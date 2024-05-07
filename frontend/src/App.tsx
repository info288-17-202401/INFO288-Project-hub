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
import ErrorSignInComponent from './routes/errorSession';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <ProjectTeamPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          {isLoggedIn && <Route path="/teams" element={<ProjectTeamPage />} />}
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/about" element={<About />} />
          <Route path="/error-signin" element={<ErrorSignInComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
