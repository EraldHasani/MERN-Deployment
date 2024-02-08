import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate,useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pirateName, setPirateName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [treasureChests, setTreasureChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("sailer");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] = useState(false);
    const [errors, setErrors] = useState({});

   

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pirate/${id}`,{
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                setPirateName(res.data.pirate.pirateName);
                setImageUrl(res.data.pirate.imageUrl);
                setTreasureChests(res.data.pirate.treasureChests);
                setCatchPhrase(res.data.pirate.catchPhrase);
                setCrewPosition(res.data.pirate.crewPosition);
                setPegLeg(res.data.pirate.pegLeg);
                setEyePatch(res.data.pirate.eyePatch);
                setHookHand(res.data.pirate.hookHand);
            })
            .catch((err) => {
                console.log(err);
            })
    }
        , []);

        const navigateBack = () => {
            navigate("/pirates");
        }
    

  
    const UpdatePirate = (e) => {
        e.preventDefault();

        const updatedPirate = {
            pirateName: pirateName,
            imageUrl: imageUrl,
            treasureChests: treasureChests,
            catchPhrase: catchPhrase,
            crewPosition: crewPosition,
            pegLeg: pegLeg,
            eyePatch: eyePatch,
            hookHand: hookHand
        }

        axios.put(`http://localhost:8000/api/pirate/${id}`, updatedPirate,{
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                if (pirateName.length < 5 || imageUrl=="" || catchPhrase.length < 1) {
                    setErrors('Your form has some unsolved issues!');
                  
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
                setErrors("Your api has some problems!");
                console.log(err);
            })
    }

  

return (

    <>
      

    

        <div className="container">

<Navbar  />


<form className=" bg-warning d-flex justify-content-evenly" onSubmit={(e)=>UpdatePirate(e)}>


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
        <button type="submit" className="btn btn-primary m-2" >Edit Pirate</button>
    </div>
    </div>



</form>

</div>
    </>

)
}

export default Update;