const express = require("express")
const { connection } = require("./db")
const { auth } = require("./middleware/auth.middleware")
const { noteRouter } = require("./routes/note.routes")
const {userRouter} = require("./routes/user.routes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)


app.listen(4500,async()=>{
try {
    await connection
    console.log("connected to DB")
} catch (error) {
    console.log(error)
}
    console.log("server is running at port 4500")
})