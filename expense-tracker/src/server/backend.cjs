const express = require("express");
const cors = require("cors");
const { User } = require("../database/db.cjs");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());



//Signup route
app.post("/signup", async function(req,res) {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.json({
                msg: "User already exists, try logging in..."
            })
        }
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashed});
        await newUser.save();
    }catch(err){
    return res.status(500).json({
            msg: "Server side error..."
        })
    }
    res.json({
        msg: "User signed up..."
    })
})



//Login route
app.post("/login", async function(req, res) {
    const {username, password} = req.body;
    try {
    const existingUser = await User.findOne({username});
    if(!existingUser) {
        return res.json({
            msg: "Signup first..user does not exist..."
        })
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch) {
        return res.json({
            msg:"Password is incorrect..."
        })
    }

    const token = jwt.sign({id: existingUser._id} , "secret1", {expiresIn: "1h"});
    res.json({
        msg: "User logged in",
        token
    })
    } catch (err) {
     return res.status(500).json({
            msg: "Server side error..."
        })
    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});