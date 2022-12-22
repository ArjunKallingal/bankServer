// const res = require("express/lib/response")

//import dataService file from service folder
const dataServic=require('./service/dataService')

//import json webtoken
const jwt=require('jsonwebtoken')

// //import express
const express=require('express')
const { json } = require('express')

// //Create app
const app=express()

//to convert json datas
app.use(express.json())

//Middleware for verify the token
const jwtmiddleware=(req,res,next)=>{
    console.log(".....router specific Middleware.....");
    try{
        const token=req.headers['access-token']
        const data=jwt.verify(token,"secrectkey123")
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"plese login"
        })
       
    }
}

// //request


// //register
app.post('/register',(req,res)=>{

    const result=dataServic.register(req.body.acno,req.body.uname,req.body.psw)

   res.status(result.statusCode).json(result)

})

//login
app.post('/login',(req,res)=>{

    const result=dataServic.login(req.body.acno,req.body.psw)

   res.status(result.statusCode).json(result)

})

//deposite
app.post('/deposite',jwtmiddleware,(req,res)=>{

    const result=dataServic.deposite(req.body.acno,req.body.psw,req.body.amount)

   res.status(result.statusCode).json(result)

})

// withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{

    const result=dataServic.withdraw(req.body.acno,req.body.psw,req.body.amount)

   res.status(result.statusCode).json(result)

})

// transation history
app.post('/gettransation',jwtmiddleware,(req,res)=>{

    const result=dataServic.gettransation(req.body.acno,)

   res.status(result.statusCode).json(result)

})

// delete

// //get

// app.get('/',(req,res)=>{

//     res.send("get method checking")

// })

// //post


// //put
// app.put('/',(req,res)=>{

    // res.send("put method checking")

// })

// //patch
// app.patch('/',(req,res)=>{

//     res.send("patch method checking")

// })

// //delete
// app.delete('/',(req,res)=>{

//     res.send("delet method checking")

// })

// //set port
app.listen(3000,()=>{
    console.log("server started st prt number 3000");
})