import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Pages/comp/Header3.js';
import Allbooks from './Pages/Allbooks';
import SignupUser from './Pages/Auth/signup';
import Login2 from './Pages/Auth/login2.jsx';
import Login from './Pages/Auth/Login';
import UserLayout from './Pages/layout/userLayout';
import AdminLayout from './Pages/Dashboard/adminLayout';
import CategoriesBook from './Pages/Dashboard/booksdashboard/category/CategoriesBook.jsx';
import CategoryList from './Pages/Dashboard/booksdashboard/category/categorylist.jsx';
import UpdateCategoriesPage from './Pages/Dashboard/booksdashboard/category/updatecategory.jsx';
import Createbook from './Pages/Dashboard/booksdashboard/book/createbook.jsx';
import BookList from './Pages/Dashboard/booksdashboard/book/booklist.jsx';
import UpdateBook from './Pages/Dashboard/booksdashboard/book/updatebook.jsx';
import BookDetails from './Pages/comp/bookDetails.js';
import Cart from './Pages/comp/cart.jsx';

import SuccessPage from "./Pages/comp/SuccessPage.js";
import Verify from './Pages/comp/verify.js';

import ProtectedRoute from './Pages/Auth/protectedroute.js'; 
// import MyOrders from './Pages/comp/myorders.jsx';
// import OrdersPage from './Pages/comp/myorders2.jsx';
import OrdersPage3 from './Pages/comp/myorders3.jsx';
import UpdateProfile from './Pages/Auth/updateprofile.jsx';
import HomePage from './Pages/homePage/homePage.jsx';
// import CategoriesBook from './Pages/Dashboard/CategoriesBook';

// import CategoriesBook from './Pages/Dashboard/categoriesBook'; // Ensure correct case here




function App() {
  const isLoggedIn = !!localStorage.getItem("userId");
  console.log("User logged in nnn :", isLoggedIn);
  
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/books" element={<UserLayout><Allbooks /></UserLayout>} />
        <Route path="/book/:id" element={<UserLayout><BookDetails /></UserLayout>} />
        <Route path="/homepage" element={<UserLayout><HomePage /></UserLayout>} />
        
       {/* Protected routes */}
       {/* <Route path="/cart/:userId" element={<ProtectedRoute element={<UserLayout><Cart /></UserLayout>} isLoggedIn={isLoggedIn} />} />
        <Route path="/shopingcart" element={<ProtectedRoute element={<UserLayout><Cart /></UserLayout>} isLoggedIn={isLoggedIn} />} /> */}
       {/* <Route path="/shopingcart" element={<ProtectedRoute element={<UserLayout><Cart /></UserLayout>} isLoggedIn={isLoggedIn} />} /> */}


        <Route path="/cart/:userId" element={<UserLayout>
          <Cart />
          </UserLayout>} />
        {/* <Route path="/cart/:userId" element={<UserLayout><CartNew /></UserLayout>} /> */}
      
        {/* <Route path="/shopingcart" element={<UserLayout><Cart /></UserLayout>} /> */}
        
       
        {/* <Route path="/signin" element={<UserLayout><Login2/></UserLayout>} /> */}
        <Route path="/signup" element={<UserLayout><SignupUser /></UserLayout>} />
        <Route path="/signin" element={<UserLayout><Login /></UserLayout>} />

        {/* Admin routes */}
        <Route path="/dashboard" element={<AdminLayout><CategoriesBook /></AdminLayout>} />

        <Route path="/createbookCategory" element={<AdminLayout><CategoriesBook /></AdminLayout>} />
        <Route path="/bookcategories" element={<AdminLayout><CategoryList /></AdminLayout>} />
        <Route path="/bookcategories/:id" element={<AdminLayout><UpdateCategoriesPage/></AdminLayout>} />
        {/* bookcategories */}
        <Route path="/createbook" element={<AdminLayout><Createbook /></AdminLayout>} />
        <Route path="/allbook" element={<AdminLayout><BookList /></AdminLayout>} />
        <Route path="/updatebook/:id" element={<AdminLayout><UpdateBook/></AdminLayout>} />

        <Route path="/success" element={<SuccessPage />} />
           <Route path="/verify" element={<Verify/>} />
           {/* <Route path="/myorder" element={<MyOrders/>} />
           <Route path="/myorder2" element={<OrdersPage/>} /> */}
           <Route path="/myorders" element={<UserLayout><OrdersPage3 /></UserLayout>} />

           <Route path="/order/success" element={<SuccessPage />} />
           {/* <Route path="/myprofile" element={<UpdateProfile />} /> */}
           <Route path="/myprofile" element={<UserLayout><UpdateProfile /></UserLayout>} />
        {/* '/myprofile/:userId */}
          {/* <Route path="/cancel" element={<CancelPage />} /> */}
          {/* <Route path="/cancel" element={<CancelPage />} /> */} 
        

      </Routes>
    </Router>
  );
}

export default App;
