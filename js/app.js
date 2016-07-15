// Enemies our player must avoid
var Enemy = function () {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 0;
    // Determine speed and initial position of enemy randomly
    this.moveX = getRandomInt(3, 8);
    this.y = getRandomInt(1, 3);
    if (this.y == 1) {
        this.y = 60;
    }
    else if (this.y == 2) {
        this.y = 140;
    }
    else {
        this.y = 220;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Each update
    this.x += this.moveX;

    // If enemy reaches end of screen reset
    if (this.x > 550) {
        this.x = -100;
        this.moveX = getRandomInt(3, 8);
        this.y = getRandomInt(1, 3);
        if (this.y == 1) {
            this.y = 60;
        }
        else if (this.y == 2) {
            this.y = 140;
        }
        else {
            this.y = 220;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {

    this.x = 202;
    this.y = 400;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function () {
    for (i = 0; i < allEnemies.length; i++){
        if ((this.x >= allEnemies[i].x) && this.x <= (allEnemies[i].x + 75) && (this.y >= allEnemies[i].y) && (this.y <= allEnemies[i].y + 50)){
            this.x = 202;
            this.y = 400;
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y < 0){
        var message = "Congratulations!";
        document.getElementById('message').textContent = message;
        setTimeout(function () {
            document.getElementById('message').textContent = "";
        }, 2000);
    }
};

Player.prototype.handleInput = function (direction) {
    if (direction == 'left' && this.x > 0){
        this.x += -101;
    }
    else if (direction == 'up' && this.y > 0){
        this.y += -82;
    }
    else if (direction == 'right' && this.x < 404){
        this.x += 101;
    }
    else if (direction == 'down' && this.y < 400){
        this.y += 82;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
