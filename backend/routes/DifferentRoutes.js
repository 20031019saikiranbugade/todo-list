const bodyParser = require('body-parser');
const express = require('express');
const Routes = express();

Routes.use(bodyParser.json());
Routes.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
Routes.use(cors());
Routes.use(express.json());

const Controller=require('../controllers/Controls')

Routes.post('/userRegister',Controller.registerUser);
Routes.post('/userLogin',Controller.isUserValid);
Routes.post('/addTask',Controller.addTask);
Routes.post('/deleteTask',Controller.deleteTask);


Routes.post('/getTask',Controller.getTasks);

Routes.get("/",(req,res)=>{
    res.end("OKKKKK");
})


module.exports = Routes;