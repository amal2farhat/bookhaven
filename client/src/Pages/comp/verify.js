import React,{useContext,useEffect,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import Axios from "axios";


const Verify = () => {
    const [searchParams,setSearchParams]= useSearchParams()
    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const navigate=useNavigate()
    const api = "http://localhost:3001";
    const userId = localStorage.getItem("userId");

    const verifyPayment = async () => {
        try {
            const response = await Axios.post(`${api}/verify`, {
                success,
                orderId,
                userId,
            });
    
            if (response.data && response.data.success) {
                navigate("/myorders");  // Navigate to orders page
            } else {
                console.error("Payment verification failed:", response.data.message);
                navigate("/");  // Redirect to home if failed
            }
        } catch (error) {
            console.error("Error during payment verification:", error);
            navigate("/");  // Redirect on error
        }
    };

    // const verifyPayment=async()=>{
      
    //     const response = await Axios.post(`${api}/verify`,{success,orderId, userId })
    //     if(response.data.success){
    //         //  navigate("/myorder")
    //         navigate("/myorder")
    //     }else{
    //         navigate('/')
    //     }

    //  }
    useEffect(()=>{
        verifyPayment()
    },[])
    return(
    <div>
        <h1>Verify Successful!</h1>
        <p>Thank you for your purchase. Your payment has been processed successfully.</p>
    </div>
    )
};

export default Verify;
