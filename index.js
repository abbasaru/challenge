const express=require('express')
const router = require('./routes')
require('dotenv').config();
const app=express()
const port=process.env.PORT||5003
app.use(express.urlencoded({limit: '500mb', extended : true}));
app.use(express.json())
app.use(router)
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})
module.exports=app