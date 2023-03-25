const express = require("express")
const { model } = require("mongoose")
const { userModel } = require("../model/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = express.Router()

//registration 
userRouter.post("/register",async(req,res)=>{
    const {email,pass,location,age} = req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            const user = new userModel({email,pass:hash,location,age})
            await user.save()
            res.status(200).send("Registration has been done!")
        });
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

//login
userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
               result? res.status(200).send({"msg":"Login Successfully!","token":jwt.sign({"userID":user.id},"masai")}):res.status(400).send({"msg":"Invalid Password"})
            });
            
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

userRouter.get("/details",(req,res)=>{
   const {token} = req.query
   jwt.verify(token, 'shhhhh', function(err, decoded) {
    decoded ? res.status(200).send("User Details") : res.status(400).send({"msg":"Invalid Token"})
  });
})




module.exports={
   userRouter
}