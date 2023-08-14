const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();
const port = 3000;

app.use(express.json()); //Creating a middleware

 //routes

 app.get('/products' , async(req,res) =>{
  
  try{
    const products = await Product.find({});
     res.status(200).json(products);
   }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
   }

  })
   
  //to get the data of one product
  app.get('/product/:id' , async(req,res) =>{
  
    try{
      const {id} = req.params ;
      const product = await Product.findById(id);
       res.status(200).json(product);
     }catch(error){
      console.log(error.message);
      res.status(500).json({message: error.message});
     }
  
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

 //route to update data in database
 app.put('/product/:id' , async(req,res)=>{
    try{
         const {id} = req.params;
          const product = await Product.findByIdAndUpdate(id , req.body);
          
          //we can't find product by id
          if(!product){
            return res.status(404).json({message :  `cannot find product at ${id} id`})
          }
          
          const updated  = await Product.findByIdAndUpdate(id);
          res.status(200).json(updated);
    
      }catch(error){
      console.log(error.message)
      res.status(500).json({message : error.message});
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