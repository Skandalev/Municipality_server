require('dotenv').config()
const asyncHandler = require("express-async-handler");
const { PhoneNumberContext } = require('twilio/lib/rest/proxy/v1/service/phoneNumber');
const User = require('../models/userModel')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serSid = process.env.TWILIO_SER_SID;
const client = require('twilio')(accountSid, authToken);  


const sendMessageVerify = asyncHandler( (req,res) => {

    if (req.query.phonenumber) {
       client
       .verify
       .services(serSid)
       .verifications
       .create({
           to: `+${req.query.phonenumber}`,
           channel:'sms' 
       })
       .then(data => {
           res.status(200).send({
               message: "Verification is sent!!",
               phonenumber: req.query.phonenumber,
               data
           })
       }) 
    } else {
       res.status(400).send({
           message: "Wrong phone number :(",
           phonenumber: req.query.phonenumber,
           data
       })
    }
})


const codeVerify = asyncHandler ((req, res, err) => {
    
    if (req.query.phonenumber && (req.query.code).length === 6) {
        client
            .verify
            .services(serSid)
            .verificationChecks
            .create({
                to: `+${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        message: "User is Verified!!",
                        data
                    }) 
                }else{
                    console.log(err);
                    res.status(404).send({message:"code wrong!"})
                }
            }).catch((err)=>{
                console.log(err);
                res.status(404).send({message:"code is wrong!"})
            })
    } else {
        res.status(400)
        throw new Error(`Wrong phone number or code at ${req.query.phonenumber} `)
    }
})

const hazzardAccepted = asyncHandler(async(req,res)=>{
const {_uid,phone,location} =req.body
if(!_uid||!phone||!location){
    res.status(400)
    throw new Error("bad request")
}
const userWhoSent = await User.find({_id:_uid})
if(!userWhoSent){
    res.status(400)
    throw new Error("User not found")
}
const messageToCitizen = `שלום
${userWhoSent[0].firstName}
קיבלנו את הדיווח שלך ב
${location}`
client.messages 
    .create({body:messageToCitizen, from: '+18312152510', to:phone})
.then(message => res.status(200).send(message)).catch((err)=>{
    res.status(400)
    throw new Error(err.message)
});
}) 

const hazzardOnWork = asyncHandler(async(req,res)=>{
    const {_uid,phone,location} =req.body
    if(!_uid||!phone||!location){
        res.status(400)
        throw new Error("bad request")
    }
    const userWhoSent = await User.find({_id:_uid})
    if(!userWhoSent){
        res.status(400)
        throw new Error("User not found")
    }
    const messageToCitizen = `שלום
${userWhoSent[0].firstName}
התחלנו לעבוד על הדיווח שלך ב
${location} ` 
    client.messages 
        .create({body:messageToCitizen , from: '+18312152510', to:phone})
    .then(message => res.status(200).send(message)).catch((err)=>{
        res.status(400)
        throw new Error(err.message)
    });
    }) 

const hazzardFinished = asyncHandler(async(req,res)=>{
        const {_uid,phone,location} =req.body
        if(!_uid||!phone||!location){
            res.status(400)
            throw new Error("bad request")
        }
        const userWhoSent = await User.find({_id:_uid})
        if(!userWhoSent){
            res.status(400)
            throw new Error("User not found")
        }
        const messageToCitizen = `שלום
${userWhoSent[0].firstName}
סיימנו לעבוד על הדיווח ששלחת ב
${location} ` 
        client.messages 
            .create({body:messageToCitizen , from: '+18312152510', to:phone})
        .then(message => res.status(200).send(message)).catch((err)=>{
            res.status(400)
            throw new Error(err.message)
        });
        })     


const suggestionSent = asyncHandler(async(req,res)=>{
        const {_uid,phone} =req.body
        if(!_uid||!phone){
            res.status(400)
            throw new Error("bad request")
        }
        const userWhoSent = await User.find({_id:_uid})
        if(!userWhoSent){
            res.status(400)
            throw new Error("User not found")
        }
        const messageToCitizen = `שלום
${userWhoSent[0].firstName}
קיבלנו את ההצעת ייעול שלך 
` 
        client.messages 
            .create({body:messageToCitizen , from: '+18312152510', to:phone})
        .then(message => res.status(200).send(message)).catch((err)=>{
            res.status(400)
            throw new Error(err.message)
        });
        })           

module.exports={
    sendMessageVerify,
    codeVerify,
    hazzardAccepted,
    hazzardOnWork,
    hazzardFinished,
    suggestionSent
}