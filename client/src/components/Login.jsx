import React,{useState} from "react";  
import { useAuth } from "../AuthContext";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(email,password);
            navigate('/');
        } catch (error) {
            setError('Some errors')
            console.error(error);
        }
    }
    return(
        <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            {
                error? 
                <p>{error}</p>
                : null
            }
            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
        
        
            
        </>
            
    )
}
export default Login;