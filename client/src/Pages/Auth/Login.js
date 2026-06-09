import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock'; 
import { InputAdornment, TextField,IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import styles from './signup.module.css';
// import './Login.css';
import styles from './Login.module.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const navigate = useNavigate(); // Initialize navigate hook

    const handleSignUpClick = () => {
        navigate('/signup'); // Change '/signup' to your sign-up page route
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            // const sessionToken = response.data.sessionToken; // Store this token securely
            // localStorage.setItem('token', response.data.token);
            // // localStorage.setItem('sessionToken', sessionToken);
            const user = response.data.user;
            localStorage.setItem('userAdmin', user.isAdmin);

            console.log('Admin',user.id);
            console.log('aa',user.isAdmin)
          
            if (user.isAdmin === false) {
                navigate('/'); // Redirect admin to home page
                localStorage.setItem('userId', user.id);
                localStorage.setItem('userName', user.userFullName);
              localStorage.setItem('email', user.email);
                console.log('userId',user.id)
                console.log('userName',user.userFullName)
            } else {
                navigate('/dashboard'); // Redirect regular users to home
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            setMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
    return (
        <div className={styles.signincontainer}>
            <div className={styles.signincard}>
            <div class={styles.background}></div>
            <div class={styles.formcontainer}>
                <form onSubmit={handleSubmit}>
                <h2 className={styles.signintitle}> Sign in</h2>
                <p className={styles.line}></p>
                <div className={styles.signinfields}>
                {/* <label><b>Email:</b></label> */}
              <div className={styles.divhedden}> 
                <input className={styles.searchinput} type="text" placeholder="Search a Book" />
                </div> 
                {/* <div className={styles.inputWrapper}>
      <InputAdornment position="start" className={styles.iconWrapper}>
        <EmailIcon />
      </InputAdornment>
      <input
        className={styles.signintextbox}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div> */}
    
                <TextField
                 style={{marginBottom:'15px'}}
      className={styles.signintextbox}
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
        style:{
            borderRadius:"8px",
           

        }
      }}
    />
        <TextField
      
      className={styles.signintextbox}
      type={showPassword ? 'text' : 'password'} // Toggle between password and text
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon className={styles.icon}
               onClick={handleClickShowPassword}
               
               > {/* Lock icon placed on the left */}
                {showPassword ? <VisibilityOff /> : <Visibility />}
               </LockIcon>
          </InputAdornment>
        ),
        // endAdornment: (
        //   <InputAdornment position="end">
        //     <IconButton
           
        //       edge="end"
        //     >
        //       {showPassword ? <VisibilityOff /> : <Visibility />}
        //     </IconButton>
        //   </InputAdornment>
        // ),
        style: {
          borderRadius: '8px', 
        
        },
      }}
    />    
                    {/* <input
                 
                    className={styles.signintextbox}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     
                      
                    /> */}
                     {/* <EmailIcon /> */}
                      {/* <label><b>Password:</b></label> */}
                    {/* <input
                     className={styles.signintextbox}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    
                    /> */}
                    </div>
                    <button type="submit" className={styles.signinbutton} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Sign In'}
                    </button>
                

                    <div className={styles.signupoption2}>
                    <p className={styles.signupoption2}>Don't have an account? <span className={styles.span} onClick={handleSignUpClick}>Create An Account</span></p>
                </div>
                
                    {/* <a className="forget-pass" href="#home">Forgot password?</a> */}
                    <div className={styles.signupoption} >
                {message && <div className={styles.signupquestion}>{message}</div>}
                    {/* <p className="signup-question">Don't have an account? <span className='span' onClick={handleSignUpClick}>Create An Account</span></p> */}
                </div>
                </form>

                </div>
            
            </div>
        </div>
    );
};

export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styles from './signup.module.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);


//     const navigate = useNavigate(); // Initialize navigate hook
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsLoading(true);

//         try {
//             await axios.post('http://localhost:3001/login', { email, password });
//             // onLoginSuccess(response.data.user);
//             navigate('/home');
//         } catch (error) {
//             console.error('Login failed:', error.response?.data?.message || error.message);
//             setMessage(error.response?.data?.message || 'Login failed');
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     // const handleSubmit = async (event) => {
//     //     event.preventDefault(); // Prevents default form submission behavior

//     //     setIsLoading(true); // Show loading spinner or disable submit button

//     //     try {
//     //         const response = await axios.post('http://localhost:3001/login', {
//     //             email,
//     //             password,
//     //         });

//     //         // Pass user data to parent component on successful login
//     //         onLoginSuccess(response.data.user);
//     //         navigate('/home');

//     //     } catch (error) {
//     //         // Display error message
//     //         setMessage(error.response?.data?.message || 'Login failed');
//     //     } finally {
//     //         setIsLoading(false); // Hide loading spinner or enable submit button
//     //     }
//     // };

//     return (
//         <div className={styles.result}>
//             <div className={styles.margincustom}>
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit" disabled={isLoading}>
//                         {isLoading ? 'Logging in...' : 'Login'}
//                     </button>
//                     {message && <div className="message">{message}</div>}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
