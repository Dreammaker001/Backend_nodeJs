var express = require('express')
var router = express.Router()
var con = require('../db-connection')
var auth = require('../middleware/auth.js')
// var crypto = require('crypto')
// var md5 = crypto.createHash('md5')
var bcrypt = require('bcrypt');
const saltRounds = 10;

// var lastId = 0
// con.query("SELECT MAX(id) AS id FROM user", function (err, result, fields) {
//     if (err) throw err;
//     // for(var i of result)
//     lastId = result[0].id.toString()
// })



router.get('/',auth, (req,res)=>{
    con.query("SELECT * FROM user",(err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})
router.post('/',(req,res, next)=>{
    con.query("select id, username from user", (err,result)=>{
        if(JSON.parse(JSON.stringify(result)).length > 0){
            auth(req,res,next)
        }else{
            next()
        }
    })

}, (req,res)=>{
    con.query("Select id, username from user where username ='"+req.body.username+"'", (err, result)=>{
        if(JSON.parse(JSON.stringify(result)).length > 0){
            res.send("terpakai")
        }else{
            // md5.update(req.body.password).digest('hex')
            var password = bcrypt.hash(req.body.password, saltRounds)
            var sql = "INSERT INTO user (username,password) VALUES ('"+req.body.username+"', '"+password+"')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            con.query("SELECT id, username FROM user",(err, result)=>{
                if (err) throw err;
                res.send(result)
            })
            })
        }
    })
})
router.delete('/:id',auth, (req,res)=>{
    con.query("Select id, username from user", (err,result)=>{
        if(JSON.parse(JSON.stringify(result)).length < 2){
            res.send("gagal")
        }else{
            var sql = "DELETE FROM user WHERE id ='"+req.params.id+"'"
            con.query(sql, function(err, result){
            if(err) throw err;
            console.log("1 record deleted");
            con.query("select id, username from user", (err, result)=>{
                if (err) throw err;
                res.send(200, result)
            })
            })
        }
    })
})

module.exports = router