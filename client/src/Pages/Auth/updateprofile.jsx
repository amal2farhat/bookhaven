import React, { useState, useEffect } from "react";
import axios from "axios";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import HistoryIcon from "@mui/icons-material/History";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
//cutegirl
import emptyCartImage from "../../../src/assets/images/cutegirl.jpg";
// import emptyCartImage from "../../../src/assets/images/profile.jpg";
// import emptyCartImage2 from "../../../src/assets/images/animatedimg.gif";
import emptyCartImage2 from "../../../src/assets/images/book_10.png";
// import emptyCartImage2 from "../../../src/assets/images/bookpng2.png";
import { useNavigate } from "react-router-dom"; // Add this for navigation

import "./updateprofile.css";
// import styles from "./updateprofile.module.css";
const UpdateProfile = () => {
  const api = "http://localhost:3001";
  const navigate = useNavigate(); // Use history for navigation
  const [userData, setUserData] = useState({
    // id: "",
    userFullName: "",
    address: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const userId = localStorage.getItem("userId"); // This should be fetched from context or props (user authentication)
  const focusStyle = {
    boxShadow: "0px 1px 4px 0px rgba(70, 54, 16, 1)",
    transform: "translate(6px)",
    border: "none",
  };
  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // alert("please login");
      navigate("/signin");
    }
    // const focusStyle = isFocused
    //   ? { boxShadow: "0px 1px 4px 0px rgba(70, 54, 16, 1)", transform: "translate(6px)", border: "none" }
    //   : {};

    // Fetch the current user profile
    // await Axios.post(`${api}/signup`
    axios
      .get(`${api}/myprofile/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        setMessage("Error loading user data.");
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`${api}/updatemyprofile/${userId}`, userData)
      .then((response) => {
        setMessage("Profile updated successfully!");
        setLoading(false);
      })
      .catch((err) => {
        setMessage("Failed to update profile.");
        setLoading(false);
      });
  };
  return (
    <div className="all">
      <div className="dashboard">
        <div className="container">
          <div className="dashboardoptioncontent">
            <form onSubmit={handleSubmit}>
              <div className="userdetailstopbar">
                <img className="userprofileimage" src={emptyCartImage} alt="" />
                <div className="user-info">
                  <p className="username">{userData.userFullName}</p>
                  <p className="userid">{userId}</p>
                  <p className="useremail">{userData.email}</p>
                </div>
              </div>
              <div className="botomcontent">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label> Full Name</label>
                      </td>
                      <td>
                        {/* <input className="searchinput" type="text" placeholder="Search a Book" /> */}
                        <input
                          className="in"
                          type="text"
                          name="userFullName"
                          value={userData.userFullName}
                          onChange={handleChange}
                          // onFocus={() => focusStyle}
                          // onBlur={() => setIsFocused(false)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      {/* <input
                        className="searchinputf"
                        type="text"
                        // placeholder="Search a Book"
                        name="userFullName"
                        onChange={handleChange}
                        value={userData.userFullName}
                        required
                      /> */}
                      <td>
                        <label>Address</label>
                      </td>
                      <td>
                        <input
                          className="in"
                          type="text"
                          name="address"
                          value={userData.address}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Email</label>
                      </td>
                      <td>
                        <input
                          className="in"
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Password</label>
                      </td>
                      <td>
                        <input
                          className="in"
                          type="password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                          // style={{ backgroundColor: "transparent", borderColor: "rgb(99, 98, 96)" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div className="botomcontent">
                {" "}
                <div className="divinput">
                  <div>
                    <label>User Full Name</label>
                  </div>
                  <div>
                    <input
                      className="in"
                      type="text"
                      name="userFullName"
                      value={userData.userFullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Address</label>
                  <input
                    className="in"
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    className="in"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Password </label>
                  <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </div>
              </div> */}
            </form>
          </div>
          <div className="rightcontent">
            {" "}
            <img className="userimage" src={emptyCartImage2} alt="" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <button className="buttonpayment" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <div className="signupoption">{message && <div className="signupquestion">{message}</div>}</div>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h2>Update Profile</h2>
  //     {message && <p>{message}</p>}
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>User Full Name</label>
  //         <input
  //           type="text"
  //           name="userFullName"
  //           value={userData.userFullName}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Address</label>
  //         <input type="text" name="address" value={userData.address} onChange={handleChange} />
  //       </div>
  // <div>
  //   <label>Email</label>
  //   <input type="email" name="email" value={userData.email} onChange={handleChange} />
  // </div>
  // <div>
  //   <label>Password (leave blank if not changing)</label>
  //   <input type="password" name="password" value={userData.password} onChange={handleChange} />
  // </div>
  //       <button type="submit" disabled={loading}>
  //         {loading ? "Updating..." : "Update Profile"}
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default UpdateProfile;
