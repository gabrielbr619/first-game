var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const socket = io();

document.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  if (e.key == "ArrowRight" || e.key == "ArrowLeft" ||e.key == "ArrowDown" || e.key == "ArrowUp") {
    let keypressed = e.key;
  socket.emit("movement", keypressed);
  }else if(e.key == "b"){
    socket.emit("attack")
  }
  
}
socket.on("draw", (game) => {
    ctx.clearRect(0, 0, 10, 10);
    for (const playerId in game.players) {
      const player = game.players[playerId];

      if (game.players[playerId].id == socket.id) {
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, 1, 1);
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.77)";
        ctx.fillRect(player.x, player.y, 1, 1);
      }
    }
    for (const fruitId in game.fruits) {
      const fruit = game.fruits[fruitId];
      ctx.fillStyle = "orange";
      ctx.fillRect(fruit.x, fruit.y, 1, 1);
    }
    for (const attackId in game.attacks){
      const attack = game.attacks[attackId];
      ctx.fillStyle = "red";
      ctx.fillRect(attack.x, attack.y, 1, 1);
    }
  
});

socket.on("attack", (player) => {
  console.log(player);
  ctx.fillStyle = "black";
  ctx.fillRect(1, 4, 2, 2);
});
