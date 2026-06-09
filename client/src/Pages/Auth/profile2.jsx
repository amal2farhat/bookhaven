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
import "./MemberDashboard.css";

const UpdateProfile = () => {
  const api = "http://localhost:3001";
  const [userData, setUserData] = useState({
    userFullName: "",
    address: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId"); // This should be fetched from context or props (user authentication)

  useEffect(() => {
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
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler">
          {/* <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon
                style={{ fontSize: 25, color: "rgb(234, 68, 74)" }}
              />
            )}
          </IconButton> */}
        </div>
        <div>
          <div className="dashboard-logo">
            {/* <LibraryBooksIcon style={{ fontSize: 50 }} /> */}
            <p className="logo-name">LCMS</p>
          </div>
          <a
            href="#profile@member"
            // className={`dashboard-option ${active === "profile" ? "clicked" : ""}`}
            // onClick={() => {
            //   setActive("profile");
            //   setSidebar(false);
            // }}
          >
            <AccountCircleIcon className="dashboard-option-icon" /> Profile
          </a>
          <a
            href="#activebooks@member"
            // className={`dashboard-option ${active === "active" ? "clicked" : ""}`}
            onClick={() => {
              // setActive("active");
              // setSidebar(false);
            }}
          >
            <LocalLibraryIcon className="dashboard-option-icon" /> Active
          </a>
          <a
            href="#reservedbook@member"
            // className={`dashboard-option ${active === "reserved" ? "clicked" : ""}`}
            onClick={() => {
              // setActive("reserved");
              // setSidebar(false);
            }}
          >
            <BookIcon className="dashboard-option-icon" /> Reserved
          </a>
          <a
            href="#history@member"
            // className={`dashboard-option ${active === "history" ? "clicked" : ""}`}
            onClick={() => {
              // setActive("history");
              // setSidebar(false);
            }}
          >
            <HistoryIcon className="dashboard-option-icon" /> History
          </a>
          <a
            href="#profile@member"
            // className={`dashboard-option ${active === "logout" ? "clicked" : ""}`}
            onClick={() => {
              // logout();
              // setSidebar(false);
            }}
          >
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out{" "}
          </a>
        </div>

        <div className="dashboard-option-content">
          <div className="member-profile-content" id="profile@member">
            <div className="user-details-topbar">
              <img className="user-profileimage" src="./assets/images/Profile.png" alt=""></img>
              <div className="user-info">
                <p className="user-name">"memberDetails?.userFullName"</p>
                <p className="user-id">
                  memberDetails?.userType === "Student" ? memberDetails?.admissionId :
                  memberDetails?.employeeId
                </p>
                <p className="user-email">memberDetails?.email</p>
                <p className="user-phone">memberDetails?.mobileNumber</p>
              </div>
            </div>
            <div className="user-details-specific">
              <div className="specific-left">
                <div className="specific-left-top">
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Age</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>memberDetails?.age</span>
                  </p>
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Gender</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>memberDetails?.gender</span>
                  </p>
                </div>
                <div className="specific-left-bottom">
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>DOB</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>memberDetails?.dob</span>
                  </p>
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Address</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>memberDetails?.address</span>
                  </p>
                </div>
              </div>
              <div className="specific-right">
                <div className="specific-right-top">
                  <p className="specific-right-topic">
                    <b>Points</b>
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    540
                  </p>
                </div>
                <div className="dashboard-title-line"></div>
                <div className="specific-right-bottom">
                  <p className="specific-right-topic">
                    <b>Rank</b>
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    memberDetails?.points
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="member-activebooks-content" id="activebooks@member">
            <p className="member-dashboard-heading">Issued</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book-Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Fine</th>
              </tr>
              {/* {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Issued";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                      <td>
                        {Math.floor(
                          (Date.parse(moment(new Date()).format("MM/DD/YYYY")) -
                            Date.parse(data.toDate)) /
                            86400000
                        ) <= 0
                          ? 0
                          : Math.floor(
                              (Date.parse(
                                moment(new Date()).format("MM/DD/YYYY")
                              ) -
                                Date.parse(data.toDate)) /
                                86400000
                            ) * 10}
                      </td>
                    </tr>
                  );
                })} */}
            </table>
          </div>
        </div>
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
  //       <div>
  //         <label>Email</label>
  //         <input type="email" name="email" value={userData.email} onChange={handleChange} />
  //       </div>
  //       <div>
  //         <label>Password (leave blank if not changing)</label>
  //         <input type="password" name="password" value={userData.password} onChange={handleChange} />
  //       </div>
  //       <button type="submit" disabled={loading}>
  //         {loading ? "Updating..." : "Update Profile"}
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default UpdateProfile;
