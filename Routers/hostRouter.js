const express=require('express');

const {hostGet}=require('../controllers/home')
const {getHostLists}=require('../controllers/home')
const {deletePost}=require('../controllers/home');

// const path=require('path');
const hostRouter=express.Router();

// const rootDir=require('../utils/path');

hostRouter.get('/',hostGet);

hostRouter.get('/host-homelists',getHostLists)
hostRouter.post('/delete-list/:homeid',deletePost)

exports.hostRouter=hostRouter;