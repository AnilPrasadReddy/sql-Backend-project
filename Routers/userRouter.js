const express=require('express');
const path=require('path');
const userRouter=express.Router();
const {userGet,userPost,getHomeLists,getHomeId,postFav,getFav,getEditHomes,postEditHomes,deletePost,deleteFavs,getBooking,postBooking,postBookingCheck}=require('../controllers/home');

userRouter.get("/home",userGet);
userRouter.post("/home",userPost);
userRouter.get('/home-lists',getHomeLists);
userRouter.get('/home/:homeid',getHomeId)
userRouter.post('/favorites',postFav)
userRouter.get('/favorites',getFav)
userRouter.get('/host/home-lists/:homeid',getEditHomes)
userRouter.post('/editHomes/:homeid',postEditHomes)
userRouter.post('/delete-favlist/:homeid',deleteFavs)
userRouter.get('/bookings',getBooking);
userRouter.post('/bookings/:homeid',postBooking);
userRouter.post('/bookingCheck/:homeid',postBookingCheck)

module.exports = {
  userRouter: userRouter,
};
