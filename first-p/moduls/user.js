const express=require('express');
const rout=express.Router();
const crypto=require('crypto');
const sha256=x=>crypto.createHash('sha256').update(x).digest('hex');


const DB=require('../config.js');
//Routing 

console.log(sha256('ed746956'));
rout.post('/register', async(req,resp)=>{
    let body=req.body;
    console.log(req.body)
    try{
        get_users=await DB.pool.query(`SELECT * FROM users WHERE login='${body.login}'`);
        if(get_users[0].length>0)return resp.json({success:false});
        await DB.pool.query(`INSERT INTO users (name,login,pass) VALUE ('${body.name}','${body.login}','${sha256(body.pass)}')`);
        resp.json({success:true});
    }
    catch(err){
        console.log(err)
    }
})

rout.post('/login', async(req,resp)=>{
    let body=req.body;
    try{
        check_user = await DB.pool.query(`Select * From users WHERE login = '${body.login}' AND pass = '${sha256(body.pass)}' `)
        if(check_user[0].length>0) return resp.json({user:check_user[0][0], success:true})   
    }
    catch(err){
        console.log(err)
    }
})

rout.post('/profile', async(req,resp)=>{
    let body=req.body;
    console.log(body);
    try{
        await DB.pool.query(`INSERT INTO reports (cotent,user) VALUE ('${body.message}','${body.user}')`);
        resp.json({success:true});
    }
    catch(err){
        console.log(err)
    }
})
 
rout.post('/index', async(req,resp)=>{
    try{
        get_report=await DB.pool.query(`Select cotent, user From reports `);
        resp.json(get_report[0]);
    }
    catch(err){
        console.log(err)
    }
})
 

module.exports=rout;