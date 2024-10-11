const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel.js')

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/nodeRestApi")
.then(()=>{
    console.log("Connnected to Database");
}).catch((error)=>{
    console.log(error);
})

app.get('/', (req, res) => {
});

app.post('/addprodcut', async (req, res) => {

    try {
        const prod = await Product.create(req.body);
        res.status(200).json(prod);
    } catch (error) {
        
        res.status(500).json({message:error.message})
    }
})

app.get('/getAllProducts', async(req,res)=> {
    try {
        const prods = await Product.find({});
        res.status(200).json(prods);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/searchProduct/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const prod = await Product.findById(id);
        res.status(200).json(prod);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.put('/updateProduct/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const prod = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json(prod);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/deleteProduct/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const prod = await Product.findByIdAndDelete(id);
        res.status(200).json("Product Deleted");

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


app.listen(PORT, () => {
    console.log(`Server is Running at port: ${PORT}`);
});

