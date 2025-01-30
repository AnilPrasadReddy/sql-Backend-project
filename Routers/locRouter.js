const express=require('express');


// const path=require('path');
const locRouter=express.Router();

locRouter.get('/location',(req,res)=>{
  res.render('store/location',{title :'airbnb-location'});
})
exports.locRouter=locRouter;