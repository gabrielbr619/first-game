var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var toggle = true
class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  redraw(e) {
    console.log(player1);

    if (e === 87) {
        toggle = !toggle
        console.log(toggle)
    }

    if (toggle === true) {
        ctx.clearRect(this.x,this.y, 10,10)
    }
    
    if (e === 96) {
        ctx.clearRect(0, 0, 100,100)
    }

    switch (e) {
      case 37:
          if (this.x > 0) {
            this.x -= 10;
            break
          }
        
        break;

      case 39:
        if (this.x < 90) {
        this.x += 10;   

        }
        break;

      case 38:
          if (this.y > 0) {
            this.y -= 10;
          }
        

        break;

      case 40:
          if (this.y < 90) {
            this.y += 10;
          }
        break;
    }

    ctx.beginPath();
    ctx.rect(this.x, this.y, 10, 10);
    ctx.closePath();
    ctx.fill();
  }
}

let player1 = new Player();
let player2 = new Player();
player1.redraw();
player2.redraw();
console.log(player1.x);

document.onkeydown = checkKey;

function checkKey(e) {
    
console.log(e.keyCode)
  player1.redraw(e.keyCode);
}

