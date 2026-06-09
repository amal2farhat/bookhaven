// import React from 'react';
// import Sidebar from './sidbar';
// // import Sidebar from './booksdashboard/sidbar2';
// // import Sidebar from './sidbar';
// // import Sidebar from './Sidebar'; // Make sure to import your Sidebar component

// const AdminLayout = ({ children }) => (
  
//   <div style={{ display: 'flex' }}>
//     <Sidebar />
//     {/* <Sidebar /> */}
//     <div style={{ flex: 1 }}>
//       <main>{children}</main>
//     </div>
//   </div>
// );

// export default AdminLayout;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidbar';


const AdminLayout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); 
  
  const navigate = useNavigate();
  useEffect(() => {
  const checkAdminStatus = () => {
    try {

      const userAdmin = localStorage.getItem('userAdmin') === 'true';
      setIsAdmin(userAdmin);

      // Redirect if not an admin
      if (!userAdmin) {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    
    };

  };
  checkAdminStatus();
}, [navigate]); 
  
if (isAdmin === null) {
  // Show a loading state while determining admin status
  return <div>Loading...</div>;
}
return(
 
  <div style={{ display: 'flex' }}>
  <Sidebar />
  {/* <Sidebar /> */}
  <div style={{ flex: 1 }}>
    <main>{children}</main>
  </div>
</div>
)
};

export default AdminLayout;
