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

      let playerEnemy

      for (let i = 0; i < game.players.length; i++) {
        if (socket.id !== game.players[i].id) {
          playerEnemy = game.players[i];
        }
      }
      for (let i = 0; i < game.attacks.length; i++) {
        if (!playerEnemy == 'undefined') {
          if (playerEnemy.x == game.attacks[i].x || playerEnemy.x == game.attacks[i].y) {
            console.log('acertou')
          playerEnemy.life -=1
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

    console.log(game.players)
  });
};
