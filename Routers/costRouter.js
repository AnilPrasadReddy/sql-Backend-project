const express=require('express');


// const path=require('path');
const costRouter=express.Router();

costRouter.get('/cost',(req,res)=>{
  res.render('store/cost',{title :'airbnb-cost'});
})
exports.costRouter=costRouter;

