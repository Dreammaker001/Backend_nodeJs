const { json } = require('body-parser');
var express = require('express')
var router = express.Router()
const app = express();
app.use(express.json())
app.use(express.urlencoded())
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
});
var lastId = 0
con.query("SELECT MAX(id) AS id FROM user", function (err, result, fields) {
    if (err) throw err;
    // for(var i of result)
    lastId = result[0].id.toString()
})

router.get('/', (req,res)=>{
    con.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    })
})
router.post('/', (req,res)=>{
        lastId +=1
        var sql = "INSERT INTO user (username,password) VALUES ('"+req.body.username+"', '"+req.body.password+"')";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json({id : lastId, username : req.body.username})
    })
})
router.delete('/:id', (req,res)=>{})

module.exports = router