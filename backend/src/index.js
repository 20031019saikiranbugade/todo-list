const express=require('express');
const app=express();
const port=process.env.PORT || 8085;
app.use(express.json());
require('dotenv').config();

const Routes=require('../routes/DifferentRoutes')

app.use('/',Routes);
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})