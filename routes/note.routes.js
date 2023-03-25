const express = require("express")
const { model } = require("mongoose")
const { noteModel } = require("../model/note.model")
const noteRouter = express.Router()
const jwt = require("jsonwebtoken")

noteRouter.get("/get",async(req,res)=>{
    const token = req.headers.authorization
    const decode = jwt.verify(token,"masai")
    try {
        if(decode){
            const note = await noteModel.find({"userID":decode.userID})
            res.status(200).send(note)
        }
    } catch (error) {
        res.status(400).send({"msg":err.msg})
    }
})


noteRouter.post("/add",async(req,res)=>{
    try {
        const note = new noteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"New note has been Added"})
       } catch (err) {
          res.status(400).send({"msg":err.msg})
       }
})


noteRouter.patch("/edit/:ID",async(req,res)=>{
    const {ID} = req.params
    try {
        const note = await noteModel.findByIdAndUpdate({_id:ID},req.body)
        res.status(200).send({"msg":"New note has been updated"})
       } catch (err) {
          res.status(400).send({"msg":err.msg})
       }
})


noteRouter.delete("/delete/:ID",async(req,res)=>{
    const {ID} = req.params
    try {
        const note = await noteModel.findByIdAndDelete({_id:ID})
        res.status(200).send({"msg":"New note has been deleted"})
       } catch (err) {
          res.status(400).send({"msg":err.msg})
       }
})



module.exports = {
    noteRouter
}