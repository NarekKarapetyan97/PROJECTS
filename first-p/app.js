require('dotenv').config();

const express=require('express');
const app=express();
const formData = require("express-form-data");
const os = require("os");


const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  
//const path=require('path');

// My modules
//const DB=require('./config.js');

// Api midelwares
app.use(express.json({limit: '50MB', extended: true}));
app.use(formData.parse(options));

app.use('/',(req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Content-Type, Accept");
    next();
});

 
const user=require('../first-p/moduls/user.js');

app.use('/user', user);




module.exports = app