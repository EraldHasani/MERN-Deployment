const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key="sssssss"



module.exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token= jwt.sign({
            id: newUser._id
        }, secret_key,{expiresIn: "2h"});
         res.cookie("token", token, {httpOnly: true,maxAge: 1000*60*60*2}).json({ msg: "success!", user: newUser });
    } catch (err) {
        res.status(400).json(err);
    }
        
}


module.exports.login= async (req,res)=>{
    const user= await User.findOne({email:req.body.email});

    if(user===null){
        return res.sendStatus(400).json({msg:"User not found"});
    }
    const correctPassword= await bcrypt.compare(req.body.password,user.password);

    if(!correctPassword){
        return res.sendStatus(400).json({msg:"Incorrect password"});
    }

    const token= jwt.sign({
        id: user._id
    },secret_key,{expiresIn: "2h"});
     res.cookie("token", token, {httpOnly: true, maxAge: 1000*60*60*2})
     return res.json({ msg: "success!", user: user ,token: token});

}





module.exports.logout = (req, res) => {
    res.clearCookie('token').sendStatus(200).json({msg:"Successfully logged out"});
}

