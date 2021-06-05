
const cors = require('cors')

var express = require('express')
var mysql = require('mysql');
// var bodyParser = require('body-parser');
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// app.use(bodyParser.urlencoded())

var userRouter = require('./Routers/userRouter.js')
app.use('/user',userRouter)

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req,res)=>{
    res.send(`
    <html>
        <form action='/todo' method='post'>
            <input name="deskripsi"/>
            <button>Add</button>
        </form>
    </html>
    `)
})

app.post('/todo',cors(), (req,res)=>{
    var sql = "INSERT INTO todolist (list) VALUES ('"+req.body.deskripsi+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/todo')
  });
})

app.get('/todo', (req,res)=>{
    con.query("SELECT * FROM todolist", function (err, result, fields) {
        // var string =""
        // var convert = Object.values(result)
        if (err) throw err;
        // for(var i =0 ; i<convert.length ; i++){
        //     string += "<div>"+convert[i].list+"</div>"
        //     console.log(convert[i].list)
        // }
        res.send(200,result)

        // TODO:jika tidak ingin menggunakan cors bisa mengubah res.send menjadi res.json(result)
    });

})

app.delete('/todo/:id', (req,res)=>{
  var sql = "DELETE FROM todolist WHERE id ='"+req.params.id+"'"
  con.query(sql, function(err, result){
    if(err) throw err;
    console.log("1 record deleted");
    res.send(200, "1 record deleted")
  })
})

app.listen(3000)
