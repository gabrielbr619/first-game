const Game = require("../model/Game") 

module.exports = function(io){
  io.on("connection", function (socket) { //QUANDO O PLAYER SE CONECTAR
  const game = Game.get()
  


  socket.on('movement', (e)=>{
    const keyPressed = e
    
  let player  
    for (let i = 0; i < game.players.length; i++) {
      if (socket.id == game.players[i].id) {
         player = game.players[i]  
      }
    }


    switch (keyPressed) {
      case "ArrowUp":
          if(player.y>0){player.y -=1; player.side='up'}
        break;

        case "ArrowDown":
        if(player.y<=8){player.y +=1; player.side='down'}
        break;

        case "ArrowLeft":
        if(player.x>0){player.x -=1; player.side='left'}
        break;

        case "ArrowRight":
        if(player.x<9){player.x +=1; player.side='right'}
        break;
    }
    io.emit('draw', game)
})

  io.emit('draw', game)
  console.log('user connected');
  
  
  


});
}


