import React from 'react';
import { userAuthStore } from './authStore';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectOptionsPage from './pages/ProjectOptionsPage';
import TeamsPage from './pages/TeamsPage';
import NotFoundPage from './pages/NotFoundPage'; // Importa tu componente de página no encontrada
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import MyProjectsPage from './pages/MyProjectsPage';

const App: React.FC = () => {
  const login = userAuthStore((state) => state.state); // Obtener el estado de autenticación del store

  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route
          path="/"
          element={login ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/project-options"
          element={login ? <ProjectOptionsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects"
          element={login ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/teams"
          element={login ? <TeamsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="my-projects"
          element={login ? <MyProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={login ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
