// Navbar.js
import axios from "axios";
import { React, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
// import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom"; // Add this for navigation
import DropDownProfile from "./dropdownprofile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon for user profile
import "./header.css"; // Assuming you're using an external CSS file
// import logoImage from "../../../src/assets/logo/logo3.png";
import logoImage from "../../../src/assets/logo/logo147.png";
// import logoImage from "../../../src/assets/logo/downloadlogo4.png";
const Navbar = () => {
  const [menutoggle, setMenutoggle] = useState(false);
  const navigate = useNavigate(); // Use history for navigation
  const [openProfile, setOpenProfile] = useState(false);

  const Toggle = () => {
    setMenutoggle(!menutoggle);
  };
  const toggleProfileDropdown = () => {
    setOpenProfile(!openProfile);
  };
  const userId = localStorage.getItem("userId");
  // const email = localStorage.getItem("email");
  const userFullName = localStorage.getItem("userName");
  const closeMenu = () => {
    setMenutoggle(false);
  };
  const logout = () => {
    try {
      localStorage.removeItem("userId");
      // navigate('/books');
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:");
    }
  };
  // const logout2 = async () => {
  //   try {
  //     // const remuserId = localStorage.getItem("userId"); // or whatever key you use to store the token

  //     // Send a request to the logout API endpoint
  //     // const response = await axios.post("/logout", null, {
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     // });

  //     if (response.status === 200) {
  //       console.log("Logout successful");

  //       // Remove user data from localStorage
  //       localStorage.removeItem("userId");

  //       // Optionally navigate to a different page (e.g., login page)
  //       window.location.reload(); // Reload the page or use navigate
  //       // navigate('/login');  // If using React Router for navigation
  //     } else {
  //       console.log("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error.response ? error.response.data : error.message);
  //     // Optionally handle errors, e.g., show an error message to the user
  //   }
  // };
  return (
    <nav className="navbar">
      <div className="nav-item left">
        <div className="logonav">
          <img src={logoImage} />
          {/* <span>LIBRARY</span> */}

          <a href="#">Bookhaven</a>
        </div>
        {/* <div className="logoname">Bookhaven</div> */}
      </div>

      <div className="nav-item center">
        <div>
          <input className="searchinput" type="text" placeholder="Search a Book" />
        </div>
        <div>
          <ul className={menutoggle ? "nav-options active" : "nav-options"}>
            <li
              className="option"
              onClick={() => {
                closeMenu();
              }}
            >
              <Link to="/">
                Home
                {/* <a href="#home">Home</a> */}
              </Link>
            </li>
            {/* <li className="option">
              <Link to={`/homepage`}>
            
                HomePage
              </Link>
            </li> */}
            <li className="option">
              <Link to={`/books`}>
                {/* <ShoppingCartIcon style={{ fontSize: "30px" }} /> */}
                Book
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

      <div className="nav-item right">
        <ul className={menutoggle ? "nav-options active" : "nav-options"}>
          <>
            {" "}
            <li
              className="optionsignin"
              onClick={() => {
                closeMenu();
              }}
            >
              <Link to="/signin">Sign In / Sign Up</Link>
            </li>
          </>
          {userId ? (
            <>
              <li className="optionsignin">
                <div className="profile-dropdown" onClick={toggleProfileDropdown}>
                  <AccountCircleIcon
                    className="accountprofile"
                    style={{ fontSize: "40px", marginTop: "5px" }}
                  />
                  {openProfile && (
                    <div className="dropdownprofile">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <Link className="optionname">{userFullName}</Link>
                        </li>
                        <li>
                          <Link to="/myprofile" className="optionlogout">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/myorders" className="optionlogout">
                            My Order
                          </Link>
                        </li>
                        <li>
                          <Link to="/logout" className="optionlogout" onClick={logout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div
        className="mobile-menu"
        onClick={() => {
          Toggle();
        }}
      >
        {menutoggle ? (
          <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
