const db = require('./db/sqlmodel');
const express = require ('express');
const app = express();
const PORT = 3000;

// app.get("/", (req,res)=>{
//     db.connect
// })


app.listen(PORT,()=>{
    console.log(`Server listening on port: ${PORT}...`);
})
module.exports = app;