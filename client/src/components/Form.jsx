import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";

const Form = (props) => {

    const navigate = useNavigate();
    const [pirateName, setPirateName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [treasureChests, setTreasureChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("Sailer");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] = useState(false);
    const [errors, setErrors] = useState({});
    const userId = localStorage.getItem('userId');

    const navigateBack = () => {
        navigate("/"); t
    }



    const CreatePirate = (e) => {
        e.preventDefault();

        if (pirateName.length < 5 || imageUrl=="" || catchPhrase.length < 1) {
            setErrors('Your form has some unsolved issues!');
          
        }

        else {
            const newPirate = {
                pirateName: pirateName,
                imageUrl: imageUrl,
                treasureChests: treasureChests,
                catchPhrase: catchPhrase,
                crewPosition: crewPosition,
                pegLeg: pegLeg,
                eyePatch: eyePatch,
                hookHand: hookHand,
                userId: userId,
            }
            axios.post("http://localhost:8000/api/pirate", newPirate,{
                withCredentials: true,
            
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    }
                    else {  

                        setPirateName("");
                        setImageUrl("");
                        setTreasureChests(0);
                        setCatchPhrase("");
                        setCrewPosition("");
                        setPegLeg(false);
                        setEyePatch(false);
                        setHookHand(false);
                           navigate("/pirates");
                    }

                })
                .catch((err) => {
                    console.log(err);
                    setErrors("Your api has some problems!");
                })
        }
    }

  
    return (

        <>
                <div className="container">

                <div className="navbar"  >
                 <h1>New Pirate</h1>
                  <button>  <Link to="/pirates">See Crew</Link></button>
                     </div> 
             
                    <form className=" bg-warning d-flex justify-content-evenly" onSubmit={(e)=>CreatePirate(e)}>
                   

                        <div className="form-group">
                        {
                   errors.length > 0 ?
                        <span className="text-danger m-3" >{errors} </span>
                        : null
                }
                             <div className="m-2">
                                    <label>Pirate Name:</label>
                                    <input type="text" className="form-control" onChange={(e) => setPirateName(e.target.value)} value={pirateName} />
                                </div>
                                {
                                    pirateName.length < 5 && pirateName.length > 0 ?
                                        <span className="text-danger m-3" >Pirate name must be at least 5 characters!</span>
                                        : null
                                }
                                
                                <div className="form-group">
                                    <label>Image Url:</label>
                                    <input type="text" className="form-control" onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                                </div>
                                {
                                      imageUrl.length<1?
                                        <span className="text-danger m-3" >Image Url is required!</span>
                                        : null
                                }
                                <div className="form-group">
                                    <label># of Treasure Chests:</label>
                                    <input type="number" className="form-control" onChange={(e) => setTreasureChests(e.target.value)} value={treasureChests} />
                                </div>
                                
                                <div className="form-group">
                                    <label>Catch Phrase:</label>
                                    <input type="text" className="form-control" onChange={(e) => setCatchPhrase(e.target.value)} value={catchPhrase} />
                                </div>
                               
                                {
                                    catchPhrase.length > 0 && catchPhrase.length < 5 ?
                                        <span className="text-danger m-3" >Catch Phrase must be at least 5 characters!</span>
                                        : null  
                                }

                                <br />
                             </div>
                             

                             <div>
                        <div className=" m-2">
                            <label >Crew Position:</label>
                            <select className="form-select "  onChange={(e) => setCrewPosition(e.target.value)} value={crewPosition}>
                                <option value="Sailor">Sailor</option>
                                <option value="Captain">Captain</option>
                                <option value="First Mate">First Mate</option>
                                
                                
                            </select>
                        </div> 
                        <br />
                        <div className="form-group">
                            <label>Peg Leg:</label>
                            <input type="checkbox" className="checkbox" onChange={(e) => setPegLeg(e.target.checked)} checked={pegLeg} />
                        </div>
                        <div className="form-group">
                            <label>Eye Patch:</label>
                            <input type="checkbox" className="checkbox" onChange={(e) => setEyePatch(e.target.checked)} checked={eyePatch} />
                        </div>
                        <div className="form group">
                            <label>Hook Hand:</label>
                            <input type="checkbox" className="checkbox" onChange={(e) => setHookHand(e.target.checked)} checked={hookHand} />
                        </div>
                        <br />
                        <div className="form-group">

                                    {
                                         (pirateName.length < 5 || imageUrl=="" || catchPhrase.length < 1)  ? 
                                            <button type="submit" disabled className="btn btn-primary m-2">Add Pirate</button>
                                    
                                        :
                                            <button type="submit" className="btn btn-primary m-2">Add Pirate</button>
                                        
                                    }
                                 
                        </div>
                        </div>



                    </form>

                </div>

        </>

    )
}


export default Form;