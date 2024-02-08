import React, {useState,useEffect} from "react";
import axios from "axios";
import {Link,useParams} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../views/Home";
import { useAuth } from "../AuthContext";
import "../App.css";

const Display = (props) => {

  const {pirates,setPirates} =props ;
  const [reset,setReset] = useState(false);
  const {logout} = useAuth();
  const token = localStorage.getItem('token');


    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates", {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            setPirates(res.data.pirates);
            setReset(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    ,[reset]);

    const deletePirate = (id) => {
        axios.delete(`http://localhost:8000/api/pirate/${id}`, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            setPirates(pirates.filter((pirate) => pirate._id !== id));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const filterList = (e) => {
        axios.get(`http://localhost:8000/api/pirates/${e.target.value}`,{
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            setPirates(res.data.pirates);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    const handleLogout = async (e) => {
        e.preventDefault();
  
        try {
            // Call the logout function from the AuthContext
            await logout();
            navigate('/')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            // Handle registration error
        }
    };




    return (

        <>

        <div className="container bg-warning px-0 ">


         <div className="navbar mx-0 px-0"  >
                
            <h1>New Pirate</h1>
           <button>  <Link to="/pirates">See Crew</Link></button>
           <button>  <Link to="/pirates/add">Create Pirate</Link></button>
           <button onClick={handleLogout}>LogOut</button>

           
        

            <select name="" id="" onChange={filterList}> 
            <option disabled selected >Select One value</option>
            <option value="Sailor">Sailor</option>
            <option value="Captain">Captain</option>
            <option value="First Mate">First Mate</option>
            </select>
            

        <button onClick={(e)=>setReset(true)}> Resset </button>
        </div> 

       
<div className="container d-flex flex-column align-items-center">
        {
            pirates.length > 0 ? (
            pirates.map((pirate,index) => {
                return (
                    <div key={index} className="pirates  m-3 ">
                        <div> 
                            <img src={pirate.imageUrl} alt="pirate" width="100px" height="100px"/>
                        </div>
                        <div>
                        <div>  <h3>{pirate.pirateName} </h3></div>
                        <div > 
                        <Link   to={`/pirate/details/${pirate._id}`}><button className="m-2 btn-primary">View Pirate</button></Link>

                            <button className="m-2 btn-danger" onClick={() => {deletePirate(pirate._id)}}>Walk the Plank</button>
                          </div>
                          </div>
                        

                    </div>
                )
            })
            ) : (
                <div>
                    <h1>No Pirates</h1>
                </div>
            )
        }
        </div>
      
</div>




      
        



        </>

    )
    }

    export default Display;