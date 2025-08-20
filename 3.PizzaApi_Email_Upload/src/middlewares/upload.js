"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/* ------------------------------------------------------- */
const multer = require("multer");

// UPLOAD
// npm i multer
// https://expressjs.com/en/resources/middleware/multer.html


module.exports = multer({ 
    //dest: "./uploads/",  
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: (req, file, returnCallBack) => {
          console.log('file',file);  
          // file.fieldname: input name
            // file.originalname: original file name
            returnCallBack(null, 'mehmet.jpg');   // dosya isimlendirme 
            //returnCallBack(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
        }
    })
  }); // Files will be saved in the '



