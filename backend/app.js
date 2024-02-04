const express=require('express');
const app=express();

const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser');
const fileUpload = require('express-fileupload')
const errorMiddleware=require('./middlewares/errors')
const dotenv= require('dotenv');

const cors = require('cors')
dotenv.config({path: 'backend/config/config.env'})


const path =require('path');
app.use(cors())
 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());




//import all  routes
const products= require('./routes/product');
const auth= require('./routes/auth');
const order= require('./routes/order');
const payment=require('./routes/payment')
 
app.use('/api/v1',products)
app.use('/api/v1',auth) 
app.use('/api/v1',payment) 
app.use('/api/v1',order) 

if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*',(req, res) => {
         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);
 


module.exports=app 