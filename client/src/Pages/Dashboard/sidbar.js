// Sidebar.js
import React, { useState } from 'react';

import { Outlet, Link } from 'react-router-dom'; // If using React Router for navigation
// import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
// import App from './App';
// import  './sidebar.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ViewListIcon from '@mui/icons-material/ViewList'; // Import ViewListIcon

import EditIcon from '@mui/icons-material/Edit'; 
import AddIcon from '@mui/icons-material/Add'; // Add icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon
import styles from './sidebar.module.css';
const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleMouseEnter = () => setShowSubmenu(true);
  const handleMouseLeave = () => setShowSubmenu(false);
  const [showSubmenub, setShowSubmenub] = useState(false);
  const handlebookMouseEnter = () => setShowSubmenub(true);
  const handlebooMouseLeave = () => setShowSubmenub(false);

  const logout = () => {
    localStorage.removeItem("userAdmin");
    window.location.reload();
}

  return (
    <>

      <div className={styles.sidebar}>
        {/* <h3 className={styles.sidebarh3}>Admin </h3> */}
        <div className={styles.dashboardlogo}>
                        <LibraryBooksIcon style={{ fontSize: 50 }} />
                        <p className="logo-name">Admin Library</p>
          </div>
        <ul className={styles.sidebarul}>
     
        <li className={styles.dashboardoption3} onMouseEnter={handlebookMouseEnter} onMouseLeave={handlebooMouseLeave} >
               
     
     
     
        

 {/* router.get("/getbook/:id",getbookbyid), */}
   
               <Link className={styles.sidebarlink}> 
                  {/* <Link to="/allcategories" className={styles.sidebarlink}> */}
                <BookIcon className={styles.dashboardoptionicon} /> Book</Link>
      
                {showSubmenub && (
                    <ul className={styles.submenu3}>
                       <li className={styles.submenu3item}>
                        <Link to="/allbook" className={styles.subsidebarLink}>
                          <ViewListIcon className={styles.submenuIcon} />
                          All Book
                        </Link>
                      </li>
                      <li className={styles.submenu3item}>
                        <Link to="/createbook" className={styles.subsidebarLink}>
                          <AddIcon className={styles.submenuIcon} />
                          Add Book
                        </Link>
                      </li>
                      <li className={styles.submenu4item}>
                        <Link to="/deletebook" className={styles.subsidebarLink}>
                          <DeleteIcon className={styles.submenuIcon} />
                          Delete Book
                        </Link>
                      </li>
                      <li className={styles.submenu4item}>
                        <Link to="/updatebook/:id" className={styles.subsidebarLink}>
                          <EditIcon className={styles.submenuIcon} />
                          Update Book
                        </Link>
                      </li>
                    </ul>
                  )}
               
      
                </li>
          

    
         
         <li className={styles.dashboardoption3} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
               
         
   
         <Link className={styles.sidebarlink}> 
       
          <CategoryIcon className={styles.dashboardoptionicon} /> Categories</Link>

          {showSubmenu && (
              <ul className={styles.submenu3}>
                 <li className={styles.submenu3item}>
                  <Link to="/bookcategories" className={styles.subsidebarLink}>
                    <ViewListIcon className={styles.submenuIcon} />
                    All Category
                  </Link>
                </li>
                <li className={styles.submenu3item}>
                  <Link to="/createbookCategory" className={styles.subsidebarLink}>
                    <AddIcon className={styles.submenuIcon} />
                    Add Category
                  </Link>
                </li>
                <li className={styles.submenu4item}>
                  <Link to="/deletecategory" className={styles.subsidebarLink}>
                    <DeleteIcon className={styles.submenuIcon} />
                    Delete Category
                  </Link>
                </li>
                <li className={styles.submenu4item}>
                  <Link to="/bookcategories/:id" className={styles.subsidebarLink}>
                    <EditIcon className={styles.submenuIcon} />
                    Update Category
                  </Link>
                </li>
              </ul>
            )}
         
          
          </li>
       
          {/* <li className={styles.dashboardoption}><Link to="/category/:id" className={styles.sidebarlink}>UpdateCategory
          </Link></li> */}
   

          <li className={styles.dashboardoption}>
          {/* <button onClick={logout} className={styles.sidebarlink} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <PowerSettingsNewIcon className={styles.dashboardoptionicon} />Logout
                </button> */}
            <Link to="/logout" className={styles.sidebarlink}  onClick={logout}>

          <PowerSettingsNewIcon className={styles.dashboardoptionicon} />Logout</Link>
          </li>
        </ul>



      </div>

      <Outlet />
    </>

  );
};

export default Sidebar;
// Sidebar.js

// import React, { useState } from 'react';
// import { Outlet, Link } from 'react-router-dom'; // For navigation
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import BookIcon from '@mui/icons-material/Book';
// import CategoryIcon from '@mui/icons-material/Category';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import AddIcon from '@mui/icons-material/Add'; // Add icon
// import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon
// import styles from './sidebar.module.css';

// const Sidebar1= () => {
//   const [showSubmenu, setShowSubmenu] = useState(false);

//   const handleMouseEnter = () => setShowSubmenu(true);
//   const handleMouseLeave = () => setShowSubmenu(false);

//   return (
//     <>
//       <div className={styles.sidebar}>
//         <div className={styles.dashboardLogo}>
//           <LibraryBooksIcon style={{ fontSize: 50 }} />
//           <p className={styles.logoName}>AM</p>
//         </div>
//         <ul className={styles.sidebarUl}>
//           <li className={styles.dashboardOption}>
//             <Link to="/category" className={styles.sidebarLink}>
//               <BookIcon className={styles.dashboardOptionIcon} />
//               New Book
//             </Link>
//           </li>
//           <li 
//             className={styles.dashboardOption} 
//             onMouseEnter={handleMouseEnter} 
//             onMouseLeave={handleMouseLeave}
//           >
//             <Link to="/allcategories" className={styles.sidebarLink}>
//               <CategoryIcon className={styles.dashboardOptionIcon} />
//               All Categories
//             </Link>
//             {showSubmenu && (
//               <ul className={styles.submenu}>
//                 <li className={styles.submenuOption}>
//                   <Link to="/addcategory" className={styles.sidebarLink}>
//                     <AddIcon className={styles.submenuIcon} />
//                     Add
//                   </Link>
//                 </li>
//                 <li className={styles.submenuOption}>
//                   <Link to="/deletecategory" className={styles.sidebarLink}>
//                     <DeleteIcon className={styles.submenuIcon} />
//                     Delete
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li className={styles.dashboardOption}>
//             <Link to="/category/:id" className={styles.sidebarLink}>
//               Update Category
//             </Link>
//           </li>
//           <li className={styles.dashboardOption}>
//             <Link to="/logout" className={styles.sidebarLink}>
//               <PowerSettingsNewIcon className={styles.dashboardOptionIcon} />
//               Logout
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <Outlet />
//     </>
//   );
// };


