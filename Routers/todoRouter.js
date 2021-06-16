var express = require('express')
var router = express.Router()
var con = require('../db-connection')
const app = express()
// const webSocket = require('ws');
// const http = require('http')
// const server = http.createServer(app);
// const wss = new webSocket.Server({server})

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     })
//   })
// })

  router.post('/', (req,res)=>{
      var sql = "INSERT INTO todolist (list) VALUES ('"+req.body.deskripsi+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.query("SELECT * FROM todolist", function (err, result) {
        console.log("1 record inserted");
        
        res.send(result)
      });
      // res.redirect('/todo')
    });
  })

  router.get('/', (req,res)=>{
      con.query("SELECT * FROM todolist", function (err, result, fields) {
          // var string =""
          // var convert = Object.values(result) //mengatasi rowDataPacket
          if (err) throw err;
          // for(var i =0 ; i<convert.length ; i++){
          //     string += "<div>"+convert[i].list+"</div>"
          //     console.log(convert[i].list)
          // }
          res.send(result)

          // TODO:jika tidak ingin menggunakan cors bisa mengubah res.send menjadi res.json(result)
      });

  })

  router.delete('/:id', (req,res)=>{
    var sql = "DELETE FROM todolist WHERE id ='"+req.params.id+"'"
    con.query(sql, function(err, result){
      if(err) throw err;
      console.log("1 record deleted");

      con.query("SELECT * FROM todolist", function (err, result) {
        res.send(result)
      });
    })
  })
module.exports = router