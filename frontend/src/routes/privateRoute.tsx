// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  path: string;
  element: React.ReactNode;
  isLoggedIn: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isLoggedIn,
}) => {
  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
