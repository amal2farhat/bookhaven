
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ isAuthenticated, role }) => {
//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }

//     if (role === 'admin') {
//         return <Outlet />;
//     } else {
//         return <Navigate to="/home" />;
//     }
// };

// export default ProtectedRoute;

// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;

