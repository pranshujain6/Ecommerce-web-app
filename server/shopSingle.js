var ObjectId = require('mongodb').ObjectID

var decreaseQuantity = function(req,res,db)
{
    if(req.body.size=="s")
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.ppid)},{$inc :{"qtysize.small" :(req.body.qty*(-1))}})
    }
    else if(req.body.size=='m')
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.ppid)},{$inc :{"qtysize.medium" :(req.body.qty*(-1))}})
    }
    else if(req.body.size=="l")
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.ppid)},{$inc :{"qtysize.large" :(req.body.qty*(-1))}})
    }
    else if(req.body.size="xl")
    {
        db.collection('product').updateOne({_id:ObjectId(req.body.ppid)},{$inc :{"qtysize.extralarge" :(req.body.qty*(-1))}})
    }  
    var success = {response:"success"}
    res.send(success)      
}

var insertData = function(req,res,db)
{   
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var data = {date:date,
                time:time,
                id:req.body.ppid,
                qunatity:req.body.qty,
                size:req.body.size}
    db.collection("userDetail").updateOne({_id:ObjectId(req.body.id)},{ $addToSet: { "cart": data}},
    function(err,user)
    {
        if(err)
        throw err;
        decreaseQuantity(req,res,db);
    })
}


module.exports = {first:insertData}