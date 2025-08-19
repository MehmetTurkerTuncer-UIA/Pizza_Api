"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require("../models/token");

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

  req.user = null

  const auth = req.headers?.authorization; // Token ...tokenKey...  Baerer ...jwtAccess...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']    ['Baerer', '...jwtAccess...']

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId",
      );
      req.user = tokenData ? tokenData.userId : false;
    }else if (tokenKey[0] == "Baerer"){
      jwt.verify(tokenKey[1], process.env.JWT_ACCESS_KEY, function (error, accessData){
        
        console.log(accessData)

        req.user = accessData ? accessData : null

      })
  
    }
  }
  next();
}

