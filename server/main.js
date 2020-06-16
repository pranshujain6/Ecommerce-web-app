var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var body = require('body-parser');
var app  = express();
app.use(body())
var db ; 

var userLogin = require('./userLogin');
var common = require('./common');
var signup = require('./signup')
var contact  =require('./contact')
var shopsingle  = require('./shopSingle')
var  cart = require('./cart')
var admin = require('./admin')

MongoClient.connect('mongodb://localhost:27017',function (err, client) {
   if (err) throw err;
   db = client.db('Ecommerce');
 });

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post("/userlogin",function(req,res)
{
     userLogin.first(req,res,db)
})

app.post('/adminlogin',function(req,res)
{
  admin.first(req,res,db)
})

app.post("/checkUsername",function(req,res)
{
  common.first(req,res,db)
})
app.post("/signupUser",function(req,res)
{ 
  signup.first(req,res,db)
})
app.get('/addressInfo',function(req,res)
{
  common.second(req,res,db)
})
app.post('/footerSubscription',function(req,res)
{
  common.third(req,res,db)
})
app.get('/getFreeContent',function(req,res)
{
  common.fourth(req,res,db)
})
app.post('/contactSubmit',function(req,res)
{
  contact.first(req,res,db);
})
app.get('/getCategories',function(req,res)
{
  common.fifth(req,res,db)
})

app.post('/findIdProductName',function(req,res)
{
  common.sixth(req,res,db)
})

app.post('/findDetail',function(req,res)
{
  common.seventh(req,res,db);
})
app.post('/checkQuantity',function(req,res)
{
  common.eight(req,res,db)
})
app.post('/insertInCart',function(req,res)
{
  shopsingle.first(req,res,db)
})
app.post('/getCart',function(req,res)
{
  cart.first(req,res,db)
})

app.post('/decreseInCart',function(req,res)
{
  cart.second(req,res,db)
})

app.post('/increaseInCart',function(req,res)
{
  cart.third(req,res,db)
})

app.post('/removeInCart',function(req,res)
{
  cart.fourth(req,res,db)
})
app.post('/placeOrder',function(req,res)
{
  common.ninth(req,res,db)
})

app.get('/findAllProducts',function(req,res)
{
  common.tenth(req,res,db)
})
app.post('/findCategoryProduct', function(req,res)
{
  common.eleven(req,res,db)
})
app.get('/findNewProduct',function(req,res)
{
  common.last(req,res,db)
})
app.post('/findCartTotalQunatity',function(req,res)
{
  common.lastlast(req,res,db)
})

app.get('/fetchAllOrders',function(req,res)
{ 
  admin.second(req,res,db)
})

app.post("/findOrderDetail",function(req,res)
{
  admin.third(req,res,db)
})
app.post("/productDispatched",function(req,res)
{
  admin.fourth(req,res,db)
})
app.post('/addProductAdmin',function(req,res)
{
  admin.fifth(req,res,db)
})
app.post('/addCategoryAdmin',function(req,res)
{
  admin.sixth(req,res,db)
})
app.listen(3000)