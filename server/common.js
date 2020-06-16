var ObjectId = require('mongodb').ObjectID;


var check = function(req,res,db)
{
    db.collection('userDetail').findOne(
        {"username":req.body.username},function(err,user)
    {
      
        if(err)
            throw err
             
        res.send(user)
    }
    )
}


var address = function(req,res,db)
{
    db.collection('address').findOne({},function(err,user)
    {
        if(err)
        throw err
        res.send(user)
        
    })
}

var subscribe = function(req,res,db)
{
    db.collection('subscribe').insertOne(req.body,function(err,user){
        if(err) throw err
        res.send(user)
    })
}

var freeContent  =function(req,res,db)
{
    db.collection('content').findOne({},function(err,user)
    {
        if(err)
         throw err;
        res.send(user)
        
    })
}

var categories = function(req,res,db)
{
    
    var cursor = db.collection('category').find({}).toArray(function(err,result)
    {
        if(err)
            throw err
        res.send(result)
    })
}


var findId = function(req,res,db)
{
    db.collection('product').findOne({name:req.body.name},function(err,user)
    {
        if(err)
            throw err;
        if(user==null)
        {
            var a = {id:"notfound"}
            res.send(a)
        }
        else
        {
            var a = {id:user._id}
            res.send(a)
        }
    })
}

var findDetail = function(req,res,db)
{
    var myid = req.body.id
    if(ObjectId.isValid(myid))
    {
        db.collection('product').findOne({_id:ObjectId(myid)},function(err,user)
        {
            if(err)
                throw err;
            res.send(user)
        })
    }
    else
    {
        res.send(null)
    }
}

var checkQunatity = function(req,res,db)
{

    if(req.body.size=="s")
    {
        db.collection('product').findOne({_id:ObjectId(req.body.ppid)},function(err,user)
        {
            if(err)
                throw err;
            if(user.qtysize.small>=req.body.qty)
            {
                var o = {"message":"ok"}
                res.send(o)
            }
            else
            {
               var o = {"message":user.qtysize.small}
               res.send(o)
            }
        })
    }
    if(req.body.size=="m")
    {
        db.collection('product').findOne({_id:ObjectId(req.body.ppid)},function(err,user)
        {
            if(err)
                throw err;
            if(user.qtysize.medium>=req.body.qty)
            {
                var o = {"message":"ok"}
                res.send(o)
            }
            else
            {
               var o = {"message":user.qtysize.medium}
               res.send(o)
            }
        })
    }
    if(req.body.size=="l")
    {
        db.collection('product').findOne({_id:ObjectId(req.body.ppid)},function(err,user)
        {
            if(err)
                throw err;
            if(user.qtysize.large>=req.body.qty)
            {
                var o = {"message":"ok"}
                res.send(o)
            }
            else
            {
               var o = {"message":user.qtysize.large}
               res.send(o)
            }
        })
    }
    if(req.body.size=="xl")
    {
        db.collection('product').findOne({_id:ObjectId(req.body.ppid)},function(err,user)
        {
            if(err)
                throw err;
            if(user.qtysize.extralarge>=req.body.qty)
            {
                var o = {"message":"ok"}
                res.send(o)
            }
            else
            {
               var o = {"message":user.qtysize.extralarge}
               res.send(o)
            }
        })
    }
}

var placeOrder = function(req,res,db)
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    req.body.date = date;
    req.body.time = time;
    db.collection('order').insertOne(req.body);
    db.collection('userDetail').updateOne({_id:ObjectId(req.body.uid)},{$unset:{cart:1}})
    var mess  = {"message":"inserted"} 
    res.send(mess)
}

var findProductByCategory = function(req,res,db)
{
    db.collection('category').findOne({_id : ObjectId(req.body.cat)},function(err,user)
    {
        if(err)
            throw err
        let d = {"item":user.products}
        res.send(d)
    })
}

var findProductNewArrival = function(req,res,db)
{
    db.collection('newarrival').findOne({},function(err,user)
    {
        if(err)
            throw err
        let d = {"item":user.item}
        res.send(d)
    })
}
var findProduct= function(req,res,db)
{
    db.collection('product').find().toArray((err,result)=>{
        var i = {"d":result}    
        res.send(i)
    })  
}

var lastlastlast = function(req,res,db)
{
    db.collection('userDetail').findOne({_id:ObjectId(req.body.id)},function(err,user)
    {
        if(err)
            throw err;
        res.send(user)
    })
}


module.exports = {first:check,second:address,third:subscribe,fourth:freeContent,fifth:categories,sixth:findId,seventh:findDetail
                    ,eight:checkQunatity,ninth:placeOrder,eleven:findProductByCategory,last:findProductNewArrival,
                    tenth:findProduct,lastlast:lastlastlast}