const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
  // console.log("req.headers['authorization']", req.headers['authorization'])
  const token = req.headers['authorization'];
  if(!token){
    res.json({ success: false, message: "No token provided"})
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
      if (err){
        res.json({ success: false, message: "Token invalid: " + err})
      } else {
        req.decoded = decoded
        next()
      }
    })
  }
}
