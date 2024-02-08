import { createContext,useContext,useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    const login = async (email,password) => {
        try{
            const response = await axios.post('http://localhost:8000/api/login',{
                email,
                password,
            },{withCredentials:true
            });
            
            
            const{data}=response;

            const {token:token, user:userData} = data;

            setUser(userData);
            console.log(data);

            localStorage.setItem('token',token);
            localStorage.setItem('userId',userData._id);

            return userData;
        }   catch(error){
            console.error('Login failed', error.message);
            throw error;
        }
    };

    const register = async (firstName,lastName,email,password,confirmPassword) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register',{
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            },{withCredentials:true
            });
            const {data} = response;
            const {token:token, user:userData} = data;
            setUser(userData);
            localStorage.setItem('token',token);
            localStorage.setItem('userId',userData._id);
            return userData;
        } catch (error) {
            console.error('Register failed', error.message);
            console.log(error);
            throw error;
        }
    }

    const logout = async () => {
        try{
            await axios.post('http://localhost:8000/api/logout',{},{withCredentials:true});
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/';

        }
        catch(error){
            console.error('Logout failed', error.message);
            console.log(error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
