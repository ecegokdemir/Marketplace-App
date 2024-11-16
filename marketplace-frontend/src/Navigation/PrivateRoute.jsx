import React from 'react';
import ForbiddenPage from '../Pages/ForbiddenPage/ForbiddenPage';

function PrivateRoute({ children}) {
    let userInfo = localStorage.getItem('userInfo');
    return userInfo==="USER" ? children : <ForbiddenPage />;
}

export default PrivateRoute;