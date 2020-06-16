var signup = function(req,res,db)
{
    db.collection("userDetail").insertOne(req.body,function(err,user)
    {
        if(err)
            throw err   
        res.send(user["ops"][0])
    })
}
module.exports = {first:signup}