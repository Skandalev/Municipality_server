const Suggestions = require("../models/suggestionsModel")
const asyncHandler = require("express-async-handler");


// api/suggestions    POST gets in body title,phone,body and optionally picture
const addSuggestion  = asyncHandler(async(req,res)=>{
 const {title,phone,body} = req.body  
    if(!title||!phone||!body){
        res.status(400)
        throw new Error("please Enter all the fiels")
    }
 const suggestion = await Suggestions.create(req.body)
 if(suggestion){
    res.status(201).json(suggestion)
 } else{
    throw new Error("Failed to create Suggestion try again later")
 }
})
// api/suggestions    GET  optionally qerry ?search=
const allSuggestions  = asyncHandler(async(req,res)=>{
  if(req.query.search){
    const keyword =req.query.search?{
        $or:[
           {title:{$regex:req.query.search,$options:"i"}},
           {body:{$regex:req.query.search,$options:"i"}},
           {phone:{$regex:req.query.search,$options:"i"}},
        ]
     }:{}
  const searchSuggestions = await Suggestions.find(keyword) 
  res.send(searchSuggestions)
  }
else{
   const allSuggests = await Suggestions.find().sort({_id: -1})
   if(allSuggests){
    res.status(201).json(allSuggests)
   } else{
    throw new Error("Failed to fetch the Suggestions try again later")
   }}
})
// api/suggestions    DELETE gets in body suggestionId 
const deleteSuggestion  = asyncHandler(async(req,res)=>{
    const {suggestionId} = req.body
    if(!suggestionId){
        res.status(400)
        throw new Error("please Enter the id of the suggestion")
    }
    const deletedSuggestion = await Suggestions.findByIdAndDelete(suggestionId)
    if(!deletedSuggestion){
        res.status(400)
        throw new Error("failed to delete the suggestion")
    }else{
        res.status(200).send(deletedSuggestion)
    }
})

module.exports = {addSuggestion,allSuggestions,deleteSuggestion}