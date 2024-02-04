const app=require('./app')

const connectDatabase =require('./config/database')

const dotenv=require('dotenv');
const cloudinary = require('cloudinary');


//handles the uncut expectations
process.on('uncaughtException',err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Sutting down  due to uncut' )
        process.exit(1);
     
})

//setting config
if(process.env.NODE_ENV !== 'PRODUCTION'){
dotenv.config({path:'backend/config/config.env'})
}

//setting up cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

//connecting to database
connectDatabase();

const server =app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//handle unhandled Errors
process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Sutting down server')
    server.close(()=>{
        process.exit(1);
    })
})