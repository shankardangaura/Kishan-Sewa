const mongoose=require('mongoose')

const connectDatabase=() =>
{
 mongoose.connect(process.env.DB_URI,{
     useNewUrlParser: true,
    //  useCreateIndex: true,
     useUnifiedTopology: true
     }).then(con =>{
         console.log(`MongoDB Database Connected With HOST: ${con.connection.host}`)
     })
}

module.exports=connectDatabase  