const express=require('express');

const ratingRouter=express.Router();

ratingRouter.get('/rating',(req,res)=>{
    res.render('store/rating',{title :'airbnb-ratig'});
})

exports.ratingRouter=ratingRouter;