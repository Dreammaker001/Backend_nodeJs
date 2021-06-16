var con = require('../db-connection');
// var crypto = require('crypto')
// var md5 = crypto.createHash('md5')
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (req, res, next){
    var username = req.headers.username
    // md5.update(req.headers.password).digest('hex')
    var password = bcrypt.hash(req.headers.password, saltRounds)

    con.query("select * from user where username ='"+username+"' AND password ='"+password+"'", (err,result)=>{
        var row = JSON.parse(JSON.stringify(result)).length
        if(row > 0 ){
            next() //lanjut ke middleware berikutnya atau rute berikutnya
        }else{
            res.send(401)
        }
        // res.send(JSON.parse(JSON.stringify(result)).length.toString())
    })
}