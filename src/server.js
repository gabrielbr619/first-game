const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ejs = require('ejs')


const GameController = require('./controllers/GameController')(io)
const PlayerController = require('./controllers/PlayerController')(io)
const AttackController = require('./controllers/AttackController')(io)

const Game = require('./model/Game')

const path = require ('path')
app.use(express.static("public"))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const game =  Game.get()

app.get('/', async (req, res) => {
  res.render ('index.ejs');
  });
  
  
  

http.listen(2620, "25.27.147.108", ()=>{
  console.log('CONECTADO')
})