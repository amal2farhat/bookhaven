// import React, { useState } from 'react';
// import Menu from './Menu';

// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import BookIcon from '@mui/icons-material/Book';
// import CategoryIcon from '@mui/icons-material/Category';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import AddIcon from '@mui/icons-material/Add'; // Add icon
// import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon
// import './sidbar2.css'; // Import CSS for styling

// import { Link } from 'react-router-dom';



// const categories = ['Category', 'Book', 'Logout'];

// const Sidebar = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleCategoryClick = (category) => {
//     // Toggle category only if it's Category 1
//     if (category === 'Category') {
//       setSelectedCategory(selectedCategory === category ? null : category);
//     } else {
//       // If it's not Category 1, just close the submenu if open
//       setSelectedCategory(null);
//     }
//   };

//   return (
//     <div className="sidebar">
//             <div className='dashboardlogo'>
//                         <LibraryBooksIcon style={{ fontSize: 50 }} />
//                         <p className="logo-name">AM</p>
//           </div>
//       <ul className='sidebarul'>
//         {categories.map((category) => (
//           <li key={category} className='sidebarli'>
//             <div
//               onClick={() => handleCategoryClick(category)}
//               className="category"
//             >
//               {category}
//             </div>
//             {selectedCategory === category && category === 'Category' && (
//               <ul className="submenu">
//                 <li>
//                   <Link to="/addcategory" className="sidebarLink">Add</Link>
//                 </li>
//                 <li>
//                   <Link to="/deletecategory" className="sidebarLink">Delete</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
