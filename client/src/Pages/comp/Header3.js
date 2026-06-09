// import { React, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';
// import MenuIcon from '@mui/icons-material/Menu';
// import ClearIcon from '@mui/icons-material/Clear';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for user profile
// import { useNavigate } from "react-router-dom";

// function Header() {
//     const [menutoggle, setMenutoggle] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
//     const navigate = useNavigate();
//     const userId = localStorage.getItem("userId");
//     const userImage = localStorage.getItem("userImage"); // Assuming you store the user's image URL in localStorage
//     const userName = localStorage.getItem("userName"); // Assuming you store the user's name in localStorage

//     const Toggle = () => {
//         setMenutoggle(!menutoggle);
//     };

//     const closeMenu = () => {
//         setMenutoggle(false);
//     };

//     const logout = () => {
//         localStorage.removeItem("userId");
//         localStorage.removeItem("userImage");
//         localStorage.removeItem("userName");
//         window.location.reload();
//     };

//     const toggleDropdown = () => {
//         console.log("Toggling dropdown");
//         setDropdownOpen(prevState => !prevState); // Toggle dropdown visibility
//     };

//     return (
//         <div className="header">
//             <div className="logonav">
//                 <Link to='/'>
//                     <a href="#home">LIBRARY</a>
//                 </Link>
//             </div>

//             <div className='divright'>
//                 <div className='nav-right'>
//                     <div>
//                         <input className='searchinput' type='text' placeholder='Search a Book' />
//                     </div>

//                     <div className="nav-options-container">
//                         <ul className={menutoggle ? "nav-options active" : "nav-options"}>
//                             <li className="option" onClick={() => { closeMenu() }}>
//                                 <Link to='/'>Home</Link>
//                             </li>
//                             <li className="option" onClick={() => { closeMenu() }}>
//                                 <Link to='/signin'>SignIn</Link>
//                             </li>
//                         </ul>
//                     </div>

//                     <div className='divr'>
//                         <ul className={menutoggle ? "nav-options active" : "nav-options"}>
//                             {userId ? (
//                                 <>
//                                     <li className="option">
//                                         <Link to={`/cart/${userId}`} className="option">
//                                             <ShoppingCartIcon style={{ fontSize: "30px" }} />
//                                         </Link>
//                                     </li>
                                    
//                                     {/* Profile image and dropdown toggle */}
//                                     <li className="option">
//                                         <div className="profile-dropdown" onClick={toggleDropdown}>
//                                         <AccountCircleIcon />
//                                             {/* <img 
//                                                 src={userImage ? userImage : 'default-profile.png'} 
//                                                 alt="User" 
//                                                 className="user-avatar" 
//                                             /> */}
//                                             {/* Or use a default icon: <AccountCircleIcon /> */}
//                                         </div>
//                                         {dropdownOpen && (
//                                             <div className="dropdown-menu">
//                                                 <Link to="/profile" className="dropdown-item">Update Profile</Link>
//                                                 <Link to="/logout" className="dropdown-item" onClick={logout}>Logout</Link>
//                                             </div>
//                                         )}
//                                     </li>
//                                 </>
//                             ) : ""}
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="mobile-menu" onClick={() => { Toggle() }}>
//                 {menutoggle ? (
//                     <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
//                 ) : (
//                     <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Header;


import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header3.css'
import MenuIcon from '@mui/icons-material/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from "react-router-dom"; // Add this for navigation
import DropDownProfile from './dropdownprofile';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for user profile

function Header() {

    const [menutoggle, setMenutoggle] = useState(false)
    const navigate = useNavigate(); // Use history for navigation
    const [openProfile,setOpenProfile]=useState(false)
    
    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }
    const toggleProfileDropdown = () => {
        setOpenProfile(!openProfile);
      };
    const userId = localStorage.getItem("userId");
    const closeMenu = () => {
        setMenutoggle(false)
    }
    const logout = () => {
        localStorage.removeItem("userId");
        // navigate('/books');
        window.location.reload();
    
    }

    return (
        <div className="header">
          <div className="logonav">
            <Link to='/'>
              <a href="#home">LIBRARY</a>
            </Link>
          </div>
        
          <div className="divright">
            <div className="nav-right">
              <div>
                <input className='searchinput' type='text' placeholder='Search a Book' />
              </div>
              <div>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                  <li className="option" onClick={() => { closeMenu() }}>
                    <Link to='/'>
                      <a href="#home">Home</a>
                    </Link>
                  </li>
                  <li className="option">
                    <Link to={`/cart/${userId}`}>
                      <ShoppingCartIcon style={{ fontSize: "30px" }} />
                    </Link>
                  </li>
                  {/* <li className="optionsignin"  onClick={() => { closeMenu() }}>
                    <Link to='/signin'>SignIn / Register</Link>
                  </li> */}
                </ul>
              </div>
    

            </div>
            <div style={{flexGrow:"2",flexBasis:"200px"}}></div>
            <div style={{flexGrow:"2"}}></div>
            <div style={{flexGrow:"2"}}></div>
            <div className='divr'>
                    <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                        {userId ? (
                        <>
                            <li className="optionsignin" onClick={() => { closeMenu() }}>
                            <Link to='/signin'>SignIn / Register</Link>
                            </li>
                            <li className="optionsignin">
                            <div className="profile-dropdown" onClick={toggleProfileDropdown}>
                                <AccountCircleIcon className='accountprofile' style={{ fontSize: '40px', marginTop: '5px' }} />
                                {openProfile && (
                                <div className="dropdownprofile">
                                    <ul className="flex flex-col gap-4">
                                    <li><Link to="/logout" className="optionlogout">Profile</Link></li>
                                    <li><Link to="/logout" className="optionlogout" onClick={logout}>Logout</Link></li>
                                    </ul>
                                </div>
                                )}
                            </div>
                            </li>
                        </>
                        ) : ""}
                    </ul>
</div>
          </div>
      
          <div className="mobile-menu" onClick={() => { Toggle() }}>
            {menutoggle ? (
              <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
            ) : (
              <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
            )}
          </div>
        </div>
      );
      
    // return (
    //     <div className="header">
    //         <div className="logonav">
    //         <Link to='/'>
    //             <a href="#home">LIBRARY</a>
    //         </Link>
    //         </div>
    //    <div className='divright'>

    //    <div className='nav-right'>
    //          <div>   <input className='searchinput' type='text' placeholder='Search a Book'/></div>
    //           <div>  <ul className={menutoggle ? "nav-options active" : "nav-options"}>
    //                 <li className="option" onClick={() => { closeMenu() }}>
    //                     <Link to='/'>
    //                         <a href="#home">Home</a>
    //                     </Link>
    //                 </li>
    //                 <li className="option">
    //                     <Link to={`/cart/${userId}`} className="option">
    //                     <ShoppingCartIcon style={{  fontSize: "30px"}}  />
    //                     </Link>
    //                 </li>
    //                 {/* <li className="option" onClick={() => { closeMenu() }}>
    //                     <Link to='/books'>
    //                     <a href="#books">Books</a>
    //                     </Link>
    //                 </li> */}
    //                 <li className="option" onClick={() => { closeMenu() }}>
    //                     <Link to='/signin'>SignIn
    //                     <a href='signin'></a>
    //                     </Link>
    //                 </li>
    


                  
                   
    //             </ul>
    //         </div>

    //         <div className='divr'>  <ul className={menutoggle ? "nav-options active" : "nav-options"}>
              
             
    //                 {userId ? (

    //           <>
                  

     
    //       <li className="option">
    //         <div className="profile-dropdown" onClick={toggleProfileDropdown}>
    //         <AccountCircleIcon className='accountprofile' style={{fontSize:'40px',marginTop:'5px'}}/>
    //         <li className="option">
    //             {openProfile &&  <>
    //                 <div className="flex flex-col dropdownprofile">
    //             <ul className="flex flex-col gap-4">
    //             <li>   <Link to="/logout"
    //                 className="optionlogout" 
    //                 >Profile

    //         {/* <PowerSettingsNewIcon style={{  fontSize: "30px"}} /> */}
    //         </Link></li>
    //                 <li>   <Link to="/logout"
    //                 className="optionlogout" 
    //                 onClick={logout}>Logout

    //         {/* <PowerSettingsNewIcon style={{  fontSize: "30px"}} /> */}
    //         </Link></li>
    //             </ul>
    //             </div></> }
            
    //         </li>
                                      
    // </div>
                                     
    //                                  </li>

    //           </>

    //                 ) : (
    //                 ""
    //                 )}
            


                  
                   
    //             </ul>
    //         </div>
    //         </div>
    //    </div>

    //         <div className="mobile-menu" onClick={() => { Toggle() }}>
    //             {menutoggle ? (
    //                 <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
    //             ) : (
    //                 <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
    //             )}
    //         </div>
    //     </div>
    // )
}

export default Header
