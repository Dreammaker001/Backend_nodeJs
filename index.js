
// var bodyParser = require('body-parser');
const cors = require('cors')
var express = require('express')
var con = require('./db-connection');
var userRouter = require('./Routers/userRouter.js')
var todoRouter = require('./Routers/todoRouter.js')
var auth = require('./middleware/auth.js')
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// app.use(bodyParser.urlencoded())


const http = require('http')
const webSocket = require('ws');
const server = http.createServer(app);
const wss = new webSocket.Server({server:server})
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === webSocket.OPEN) { //client !== ws && 
        // console.log(Object.values(JSON.parse(data)))
        client.send(data);
      }
    })
  })
})

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

app.use('/todo', auth,todoRouter)
app.use('/users',userRouter)

server.listen(3000)