var Game = require('./game').Game;

var game = new Game();
setInterval(function() {
  console.log('\033[2J');
  game.render();
  game.scan();
}, 100);
