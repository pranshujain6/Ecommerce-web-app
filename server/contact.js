var submitData = function(req,res,db){
    db.collection('contact').insertOne(req.body,function(err,user)
    {
        if(err)
            throw err
        res.send(user)
    })
}
module.exports = {first:submitData}