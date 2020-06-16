var loginCheck = function(req,res,db)
{
 
    db.collection('userDetail').findOne({
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

module.exports = {first:loginCheck};