const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

 //routes

 app.get('/' , (req,res) =>{

   res.send("HEllo ashish");

 })

mongoose.connect('mongodb+srv://admin:123password@cluster0.mff2whe.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to MongoDB')
  app.listen(port , ()=>{
    console.log( `Node api is running on ${port}`);
  })
}).catch((error)=>{
  console.log(error)
})