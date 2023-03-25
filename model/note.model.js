

const mongoose = require("mongoose")


//user Schema
const noteSchema = mongoose.Schema({
    title:String,
    body:String,
    subject:String,
    userID:String
},{
    versionKey:false
})

const noteModel = mongoose.model("note",noteSchema)

module.exports = {
   noteModel
}