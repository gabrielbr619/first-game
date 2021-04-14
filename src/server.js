const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const GameController = require('./controllers/GameController')(io)
const PlayerController = require('./controllers/PlayerController')(io)
const AttackController = require('./controllers/AttackController')(io)


const path = require ('path')
app.use(express.static("public"))



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
  });
  
  
  

http.listen(3000, ()=>{
  console.log('CONECTADO')
})