import React, {useState} from "react";
import {useAuth} from '../AuthContext';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState('');


    const handleRegister = async (e) => { 

        e.preventDefault();
        try{
            await register(firstName, lastName, email, password, confirmPassword);
            navigate('/');
        } catch (error) {
            setError('Some errors')
            console.error(error);
        }
    }
  

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                {
                    error? 
                    <p>{error}</p>
                    : null
                }
                <div>
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>

           
        </div>
    )
}
export default Register;
