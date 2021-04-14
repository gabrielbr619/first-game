const Game = require("../model/Game");

module.exports = function (io) {
  io.on("connection", function (socket) {
    //QUANDO O PLAYER SE CONECTAR

    const game = Game.get();
    console.log(game);

    game["players"].push({ id: socket.id, x: 0, y: 0, life: 3, side: "left" }); //Cria o player
    io.emit("draw", game);

    console.log("user connected");

    socket.on("disconnect", () => {
      for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].id == socket.id) {
          game.players.splice(i, 1);
        }
      }
    });
  });
};
