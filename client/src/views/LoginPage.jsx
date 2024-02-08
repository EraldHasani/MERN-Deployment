import React from "react";  
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";

const LoginPage = (props) => {
    return(
        <>
        
            <Navbar />
            
            <Register/>
            <Login/>
            
            
        </>
            
    )
}
export default LoginPage;