import React from "react";  
import { Link, useParams } from "react-router-dom";
import "../App.css";
const Navbar = (props) => {
    

    return(
        
        
        <div className="navbar"  >
            <h1>New Pirate</h1>
           <button>  <Link to="/pirates">See Crew</Link></button>
        </div>
    )
}
export default Navbar;