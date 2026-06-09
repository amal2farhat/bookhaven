
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import styles from  './signup.module.css';
import './signup.css'
// import { Container, Form } from 'react-bootstrap';

// import Home from './Home'; // Import the UI component
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default function SignupUser() {
  const api = "http://localhost:3001";

  const [userFullName, setUserFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
 
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSigninClick = () => {
      navigate('/signin'); // Change '/signup' to your sign-up page route
    };

//     const createUser = (event) => {
//       event.preventDefault();
//       setIsLoading(true);
//       setMessage(''); // Clear previous messages
  
// try {
//   if (userFullName && address && email && password ) {
  
//     const response = Axios.post(`${api}/signup`, { userFullName,address, email, password });
//       // .then(res => res.data);
//       setMessage(response.data.message); // Success message
//   } else {
//     setMessage('All fields are required.');
//   }
// } catch (error) {
//   console.error('Signup failed:', error.response?.data?.message || error.message);
//   setMessage(error.response?.data?.message || 'Signup failed');
 

// } finally {
//   setIsLoading(false);
// }
//   }
//

// const createUser = async (event) => {
//   event.preventDefault(); // Prevent the default form submission
//   setIsLoading(true);
//   setMessage(''); // Clear previous messages

//   // Validate inputs
//   if (!userFullName || !address || !email || !password || !confirmPassword) {
//     setMessage('All fields are required.');
//     setIsLoading(false);
//     return; // Exit early if validation fails
//   }
//   if (password !== confirmPassword) {
//     setMessage('Passwords do not match.');
//     setIsLoading(false);
//     return; // Exit if passwords do not match
//   }
//   const emailRegex = /\S+@\S+\.\S+/;
//   if (!emailRegex.test(email)) {
//     setMessage('Invalid email format.');
//     setIsLoading(false);
//     return; // Exit if email is invalid
//   }

//   try {
//     // Await the response from Axios.post
//     const response = await Axios.post(`${api}/signup`, {
//       userFullName,
//       address,
//       email,
//       password,
      
//     });
    
//     // Set the success message
//     setMessage(response.data.message); 
//     setUserFullName('');
//     setAddress('');
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//   } catch (error) {
//     console.error('Signup failed:', error.response?.data?.message || error.message);
//     setMessage(error.response?.data?.message || 'Signup failed');
//   } finally {
//     setIsLoading(false);
//   }
// };

const createUser = async (event) => {
  event.preventDefault(); // Prevent the default form submission
  setIsLoading(true);
  setMessage(''); // Clear previous messages

  // Validate inputs
  if (!userFullName || !address || !email || !password || !confirmPassword) {
    setMessage('All fields are required.');
    setIsLoading(false);
    return; // Exit early if validation fails
  }

  if (password !== confirmPassword) {
    setMessage('Passwords do not match.');
    setIsLoading(false);
    return; // Exit if passwords do not match
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    setMessage('Invalid email format.');
    setIsLoading(false);
    return; // Exit if email is invalid
  }

  try {
    // Send password and confirmPassword to the backend
    const response = await Axios.post(`${api}/signup`, {
      userFullName,
      address,
      email,
      password,
      confirmPassword,  // Make sure confirmPassword is sent too
    });

    // Set the success message
    setMessage(response.data.message);
    setUserFullName('');
    setAddress('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  } catch (error) {
    console.error('Signup failed:', error.response?.data?.message || error.message);
    setMessage(error.response?.data?.message || 'Signup failed');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className='signin-container'>
    <div className="signin-card">
    <div class="background"></div>
    <div class="formcontainer">
        <form onSubmit={createUser}>
            <h2 className="signin-title"> Sign Up</h2>
            <p className="line"></p>
            <div className="persontype-question">
                
              
            </div>
            {/* <div className="error-message"><p> */}
              {/* {error} */}
              {/* </p></div> */}
            <div className="signin-fields">
                {/* <label > FullName: </label> */}
                 <input type="text"  placeholder="Full Name" className="signin-textbox"
                 value={userFullName} //7atteit l value 3ashan yefdo lam 2a3ml save,ma byefdo mn doun value
           onChange={e => setUserFullName(e.target.value)}  />
 {/* <label><b>Address:</b></label> */}
                <input className='signin-textbox' type="text" 
                value={address}
                placeholder="Address" onChange={(e) => { setAddress(e.target.value) }} />
          
             {/* <label><b>Email:</b></label> */}
                      <input type="text" placeholder="Email" className="signin-textbox"
                      value={email}
                    onChange={e => setEmail(e.target.value)} />
                      {/* <label><b>Password:</b></label> */}
                <input className='signin-textbox' type="password"  placeholder="Password"  
                value={password}
                 onChange={(e) => { setPassword(e.target.value) }} />

{/* <label>Confirm Password:</label> */}
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="signin-textbox"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)} 
            />
                </div>
            <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? 'Sign Up...' : 'Signup'}
            </button>
            <p className="signup-question2">Already have an account? <span className='span' onClick={handleSigninClick}>Sign In</span></p>
            <div className='signup-option'>
                {message && <div className="signup-question">{message}</div>}
                    {/* <p className="signup-question">Don't have an account? <span className='span' onClick={handleSignUpClick}>Create An Account</span></p> */}
                </div>
            {/* {message && <div className="message">{message}</div>} */}
         
        </form>
        </div>
       
    </div>
</div>
    // <Container>
    // <div className={styles.result}>
    //   <div className={styles.margincustom}>
    //   <form >
    //     <h2 >Create Categories</h2>
    //     <h1 >Create Categories</h1><br></br>
    //      <input
    //         type="text"
    //         placeholder="Name"
          
    //         // className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
    //         onChange={e => setUserFullName(e.target.value)}
    //       /><br/>
    //             <input
    //         type="text"
    //         placeholder="Email"
    //         onChange={e => setEmail(e.target.value)}
           
    //       />
    //     {/* <Form.Control type="text" placeholder='Name' onChange={e => setName(e.target.value)} /> */}
    //     <input
    //         type="text"
    //         placeholder="Password"
    //         onChange={e => setPassword(e.target.value)}
           
    //       />
      
    //     {/* <Form.Control type="text" placeholder='description' onChange={e => setDescription(e.target.value)} /> */}
     

    
    //     {/* <Form.Control  type="file" multiple name='photos' onChange={handleFileChange} accept="image/*" /> */}
    //     {/* <button type="submit" onClick={createCategory} className="customButton"   >Create Category</button> */}
        
    //     <br/>
    //     <button
    //     type="submit"
           
    //         onClick={createUser}
           
         
          
    //       >
          
    //              Create Category
    //              </button>
                
    //   </form>
    //   </div>
    //   </div>
  

    
  );
}

