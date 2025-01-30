const { json } = require('body-parser');
const Home=require('../models/home');

const hostGet=(req,res,next)=>{
  Home.fetchAll().then(([registerHomes,feilds]) => {
    res.render('host/home',{registerHomes:registerHomes,title:'airbnb-home'})
  })
}

const getHomeLists=(req,res,next)=>{
  Home.fetchAll().then(([registerHomes,feilds]) => {
    console.log(registerHomes)
    res.render('host/homeLists',{registerHomes:registerHomes, title:'airbnb-home-lists'})
  }).catch((err) => {
    console.log('the err',err)
  });
}

const userGet=(req,res,next)=>{
  const editing=false;
  res.render('store/host',{title:'airbnb-host',editing:editing})
}

const getHomeId=(req,res,next)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  Home.findById(val).then(([homes]) => {
    console.log('findById',homes[0]);
    const data=homes[0];
    if(!data){
      res.redirect('/');
    }else{
      res.render('store/home-details',{title:'airbnb-host',data:data});
    }
  }).catch((err) => {
    console.log('there was an err for findbyID',err)
  });
}

const userPost=(req,res,next)=>{
  const newHome=new Home(req.body.houseName,req.body.loc,req.body.imgUrl,req.body.price,req.body.desc);
  newHome.save().then((result) => {
    console.log('the result of adding post',result)
    res.render('store/hostPost',{title:'airbnb-host'} );
  }).catch((err) => {
    console.log('there is an err while adding a postHouse',err)
  });
 
}

const getHostLists=(req,res)=>{
  Home.fetchAll().then(([registerHomes,feilds]) => {
      res.render('host/host-homelist',{registerHomes:registerHomes, title:'airbnb-host-list'})
    })
}

const postFav=(req,res,next)=>{
  console.log('the favitem id',req.body);
  const data=JSON.parse(req.body.id);
  console.log('data',data,data.id);
  Home.addFavs(data).then((result)=>{
    res.redirect('favorites');
  })
  
}
const getFav=(req,res,next)=>{
  Home.getFavs().then(([registerHomes,feilds]) =>
    res.render('host/getFavPage',{registerHomes:registerHomes, title:'airbnb-fav-list'})
  )
}

const getEditHomes=(req,res,next)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  const editing=req.query.editing==='true';
  console.log('val of path parameter',val,'the value of query',editing)
 
  Home.findById(val).then(([homes]) => {
    console.log('findById',homes[0]);
    const data=homes[0];
    if(!data){
      console.log('the data is not found')
      res.redirect('/');
    }else{
      res.render('store/host',{title:'airbnb-host',data:data,editing:true});
    }
  }).catch((err) => {
    console.log('there was an err for findbyID',err)
  });
 
}

const postEditHomes=(req,res,next)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  const newHome=new Home(req.body.houseName,req.body.loc,req.body.imgUrl,req.body.price,req.body.desc);
  newHome.updateById(val).then(() => {
    res.redirect('/');
  }).catch((err) => {
    console.log('there is an err while delete qury',err)
  });
}

const deletePost=(req,res,next)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  console.log('the values of deleted home lists is',val);
  Home.deleteById(val).then(() => {
    res.redirect('/host-homelists');
  }).catch((err) => {
    console.log('there is an error while deleting the val',err)
  });
}
const deleteFavs=(req,res,next)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  console.log('the values of deleted home lists is',val);
  Home.delFavs(val).then((result)=>
  {
    res.redirect('/favorites');
  })
}

const getBooking=(req,res,next)=>{
 Home.getBookings().then(([registerHomes,feilds])=>{
  res.render('host/bookings',{title:'airbnb-bookings',registerHomes:registerHomes})
 })
}
const postBookingCheck=(req,res)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  Home.findById(val).then(([data,feilds])=>{
    console.log('the getBokkinfs is ongoing')
    console.log('the getBookingsData ',data)
    res.render('store/bookCheck',{title:'airbnb-checkBooking',data:data})
  })
}
const postBooking=(req,res)=>{
  let val = req.params.homeid; // From URL
  val = val.startsWith(':') ? val.slice(1) : val; // Remove leading colon, if present
  Home.addBooking(val).then((result)=>{
    res.redirect('/bookings');
  }).catch((err)=>{
    res.status(400).send('the error while inserting data');
  })
}

module.exports={
  hostGet,
  userGet,
  userPost,
  getHostLists,
  getHomeLists,
  getHomeId,
  postFav,
  getFav,
  getEditHomes,
  postEditHomes,
  deletePost,
  deleteFavs,
  getBooking,
  postBooking,
  postBookingCheck
}