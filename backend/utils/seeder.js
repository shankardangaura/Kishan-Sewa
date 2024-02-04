const Product=require('../models/product');
const dotenv = require('dotenv');
const connectDatabse=require('../config/database');

const products=require('../data/products');

//setting dotenv file
dotenv.config({path: 'backend/config/config.env'})
connectDatabse();

const seedProducts = async () => { 
    try {
        await Product.deleteMany();
        console.log ("Product deleted");

        await Product.insertMany(products);
        console.log ("Product inserted  ");
        process.exit();
    }
    catch(error)
    {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()