const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();
const port = 3000;

app.use(express.json()); //Creating a middleware

 //routes

 app.get('/' , (req,res) =>{

   res.send("HEllo ashish");

 })

 //creating a route for user to save data in database
 app.post('/product' , async(req,res)=>{
     
    try{
        const product  = await Product.create(req.body)  //this saves our data in database
        res.status(200).json(product)
      }catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})
      }
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