const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../config');


module.exports = Verify = (token, secret) => {
    return jwt.verify(token, secret, (err, decoded)=>{
          if (err){
            return {type: 'exception', data: {message: "Not authorized user", err: err}}
          } else {
            // console.log("decoded",decoded)
            return {type: 'success', data: {user_id: decoded.user_id}}
          }
        })
  }
