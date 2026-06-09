import React from 'react';
// import Header from '../comp/Header3';
import Navbar from '../comp/header';
// import Header from './Header'; // Make sure to import your Header component

const UserLayout = ({ children }) => (
  <div>
    <Navbar/>
    {/* <Header /> */}
    <main>{children}</main>
  </div>
);

export default UserLayout;