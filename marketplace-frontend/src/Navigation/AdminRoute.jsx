import React from 'react';
import ForbiddenPage from '../Pages/ForbiddenPage/ForbiddenPage';

function AdminRoute({ children }) {
  let isAdmin = localStorage.getItem('isAdmin');

  return isAdmin === "true" ? children : <ForbiddenPage />;
}

export default AdminRoute;
