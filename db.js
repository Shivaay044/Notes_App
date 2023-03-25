const mongoose = require("mongoose")

const connection = mongoose.connect(`mongodb+srv://Shivendra:singhpaliwal@cluster0.zlv5yfi.mongodb.net/auth?retryWrites=true&w=majority`)

module.exports={connection}