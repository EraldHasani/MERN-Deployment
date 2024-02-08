import React, {useState,useEffect} from "react";
import axios from "axios";
import {Link ,useNavigate, useParams} from "react-router-dom";
import "../App.css";

const DisplayOne= () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [pirate,setPirate] = useState({});
    const [errors,setErrors] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pirate/${id}`, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            setPirate(res.data.pirate);
        })
        .catch((err) => {
            console.log(err);
        })
    } ,[]);

    

    return (
    
        <>  
        <div className="container bg-warning px-0">  
        <div className="navbar"  >
            <h1>{pirate.pirateName}</h1>
           <button>  <Link to="/pirates">See Crew</Link></button>
        </div> 
        <div className="container d-flex justify-content-evenly align-items-center">
            <div>
                <img src={pirate.imageUrl} alt={pirate.pirateName} width="150px" height="150px"/>

            </div>
            <div>
                <h3>{pirate.pirateName}</h3>
                <p>Position: {pirate.crewPosition}</p>


                <p>Treasures: {pirate.treasureChests}</p>

                     { pirate.treasureChests ==0 ? 
                        <p className="text-success">  here's a dollar </p>
                    :null
                    }
                    {
                        pirate.treasureChests >=10 ? 
                            <p className="text-primary"> Want to share </p>
                        :null
                    }


                <p>Peg Leg: {pirate.pegLeg ? "Yes" : "No"}</p>
                <p>Eye Patch: {pirate.eyePatch ? "Yes" : "No"}</p>
                <p>Hook Hand: {pirate.hookHand ? "Yes" : "No"}</p>
                <p>Catch Phrase: {pirate.catchPhrase}</p>

            </div>
        </div>
                    <Link to={`/pirates/update/${pirate._id}`}> <button>  Edit {pirate.pirateName}</button></Link>
        </div>

        </>

    )
    }

    export default DisplayOne;