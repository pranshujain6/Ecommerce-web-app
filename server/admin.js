var ObjectId = require('mongodb').ObjectID
var loginCheck = function(req,res,db)
{
 
    db.collection('adminCredential').findOne({
        "username":req.body.username,
        "password":req.body.password},
        function(err,user)
        {
            if(err)
                throw err;
            if(user==null)
            {
                var a = {"message":null}
                res.send(a)
            }   
            else
            {
                var a = {"message":user._id}
                res.send(a)
            } 
        }
    )
}

var fetchAllOrders = function(req,res,db)
{
    db.collection('order').find().toArray((err,result)=>{
        var i = {"item":result}    
        res.send(i)
    })  
}

var findOrderDetail = function(req,res,db)
{
    db.collection('order').findOne({_id:ObjectId(req.body.item)},function(err,user)
    {
        if (err)
            throw err;
        res.send(user)
    })
}

var productDispatched = function(req,res,db)
{
    db.collection('order').deleteOne({_id:ObjectId(req.body.id)})
    var mess = {"text":"sucess"}
    res.send(mess)
}

var addProduct = function(req,res,db)
{
    db.collection('product').insertOne(req.body)
    var a  = {"i":"d"}
    res.send(a)
}

var addCategory = function(req,res,db)
{
    db.collection('category').insertOne(req.body)
    var a  = {"i":"d"}
    res.send(a)
}

module.exports = {first:loginCheck,second:fetchAllOrders,third:findOrderDetail,fourth:productDispatched,fifth:addProduct,
                   sixth:addCategory };