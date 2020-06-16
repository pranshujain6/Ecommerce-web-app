var ObjectId = require('mongodb').ObjectID

var getItem = function(req,res,db)
{
    db.collection("userDetail").findOne({'_id':ObjectId(req.body.id)},function(error,user)
    {
        res.send(user.cart)
    })
}


var decreaseInCart = function(req,res,db)
{  
    db.collection('userDetail').updateOne({_id:ObjectId(req.body.userid),"cart.date":req.body.date,
            "cart.id":req.body.productid,"cart.time":req.body.time},
           {$inc:{"cart.$.qunatity":-1}})
    if(req.body.size=="s")
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.small" :1}})
    }
    else if(req.body.size=='m')
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.medium" :1}})
    }
    else if(req.body.size=="l")
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.large" :(1)}})
    }
    else if(req.body.size="xl")
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.extralarge" :1}})
    }     
    var a  = {"message":"ok"}
    res.send(a)
}

var increseInCart = function(req,res,db)
{
    db.collection('userDetail').updateOne({_id:ObjectId(req.body.userid),"cart.date":req.body.date,
            "cart.id":req.body.productid,"cart.time":req.body.time},
           {$inc:{"cart.$.qunatity":1}})
           if(req.body.size=="s")
           {
               db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.small" :-1}})
           }
           else if(req.body.size=='m')
           {
               db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.medium" :-1}})
           }
           else if(req.body.size=="l")
           {
               db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.large" :(-1)}})
           }
           else if(req.body.size="xl")
           {
               db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.extralarge" :-1}})
           }     
           var a  = {"message":"ok"}
           res.send(a)
}

var removeInCart = function(req,res,db)
{
    db.collection('userDetail').updateOne({_id:ObjectId(req.body.userid),"cart.date":req.body.date,
     "cart.id":req.body.productid,"cart.time":req.body.time},
        {$unset:{"cart.$":1}})
    db.collection('userDetail').updateOne({_id:ObjectId(req.body.userid)},{$pull:{"cart":null}})
        if(req.body.size=="s")
        {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.small" :req.body.qty}})
        }
        else if(req.body.size=='m')
        {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.medium" :req.body.qty}})
        }
        else if(req.body.size=="l")
        {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.large" :req.body.qty}})
        }
        else if(req.body.size="xl")
        {
        db.collection('product').updateOne({_id:ObjectId(req.body.productid)},{$inc :{"qtysize.extralarge" :req.body.qty}})
        }     
        var a  = {"message":"ok"}
        res.send(a)  
}

module.exports = {first:getItem,second:decreaseInCart,third:increseInCart,fourth:removeInCart}