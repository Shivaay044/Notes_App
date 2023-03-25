const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
    const token = req.headers.authorization
    if(token){
       const decode = jwt.verify(token,"masai")
       if(decode){
        //console.log(decode)
        req.body.userID = decode.userID
        next()
       }else{
        res.status(400).send({"msg":"Please Login First"})
       }
    }
}

module.exports={
    auth
}
