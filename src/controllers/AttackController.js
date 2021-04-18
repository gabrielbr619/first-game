const Game = require("../model/Game");
const game = Game.get();

module.exports = function (io) {
  io.on("connection", function (socket) {
    socket.on("attack", () => {
      let player;
      for (let i = 0; i < game.players.length; i++) {
        if (socket.id == game.players[i].id) {
          player = game.players[i];
        }
      }

      let xAttack
      let yAttack

      switch (player.side) {
        case "left":
           xAttack = player.x - 1
           yAttack = player.y
          break;

        case "right":
           xAttack = player.x + 1
           yAttack = player.y
          break;
        case "up":
           xAttack = player.x
           yAttack = player.y - 1
          break;
        case "down":
          xAttack = player.x
          yAttack = player.y + 1
          break;
      }
      game.attacks.push({ id: socket.id, x: xAttack, y: yAttack });
      io.emit("draw", game);

      let playerEnemy = "undefined"

      for (let i = 0; i < game.players.length; i++) {
        if (socket.id !== game.players[i].id) {
          playerEnemy = game.players[i];
        }
      }

      for (let i = 0; i < game.attacks.length; i++) {
        if (!(playerEnemy === 'undefined')) {
          if (playerEnemy.x == game.attacks[i].x || playerEnemy.x == game.attacks[i].y) {
          if (playerEnemy.life == 0) {
            player.score+=1

            for (let i = 0; i < game.players.length; i++) {
              if (game.players[i].id == playerEnemy.id) {
                io.emit('dead', (playerEnemy.id))
                game.players.splice(i, 1);

              }
            }
            
          }else{
          playerEnemy.life -=1
          }
          
        }else{
          null
        }  

        }

      }
      



      setTimeout(() => {
        for (let i = 0; i < game.attacks.length; i++) {
          if (game.attacks[i].id == socket.id) {
            game.attacks.splice(i, 1);
          }
        }
        io.emit("draw", game);
      }, 200);
    });

    
  });
};


function Respawn(){

}