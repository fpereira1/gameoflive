var _ = require('lodash');

// Any live cell with less than two live neighbours dies, as if caused by under-population.
// Any live cell with three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function Cell(state) {

  this._state = 0;
  this._state = state;

  this.getState = function() {
    return typeof this._state === 'undefined' ? 0 : this._state;
  }

  this.isAlive = function() {
    return this.getState()===1;
  }

  this.isDead = function() {
    return this.getState()!==1;
  }

  this.dies = function() {
    this.setState(0);
  }

  this.becomesAlive = function() {
    this.setState(1);
  }

  this.setState = function(state) {
    this._state = state;
  }

};

Cell.prototype.toString = function() {
  return this.getState()===1 ? '\033[32m•\033[0m' : ' ';
};

Cell.prototype.valueOf = function() {
  return this.getState();
};

function createGrid() {

  var size = 34;

  var out = [];
  _.times(size/2, function(r) {
    out[r] = [];
    _.times(size, function(c) {
      var state = _.random(0, 1);

      if(!r % 2) state = 0;
      if(!c % 2) state = 0;
      if(c > 6) state = 0;
      if(r > 6) state = 0;

      out[r][c] = new Cell(state);
    });
  });
  return out;
}

var Grid = createGrid();

Grid.toString = function() {
  var output = '';
  this.forEach(function(line) {
    output += line.join('') + "\n";
  })
  return output;
};

function Game() {

  this.grid = Grid;

  this.render = function() {
    console.log(this.grid.toString());
  };

  this.scan = function() {

    var self = this;

    _.each(this.grid, function(line, x) {

      _.each(line, function(cell, y) {

        var checks = [
          [x, y+1],
          [x+1, y],
          [x+1, y+1],
          [x+1, y-1],
          [x-1, y],
          [x, y-1],
          [x-1, y-1],
          [x-1, y+1]
        ];

        var alive = 0;

        _.each(checks, function(i) {

          // If the grid in x is undefined
          if(_.isUndefined(self.grid[i[0]])) return;

          // Finds the alive neighbours for current cell
          var neighbour = self.grid[i[0]][i[1]];
          if(neighbour instanceof Cell && neighbour.isAlive()) {
            alive++;
          }

        });

        // Any live cell with less than two live neighbours dies,
        // as if caused by under-population.
        if(cell.isAlive() && alive < 2) {
          cell.dies();
        }

        // Any live cell with three live neighbours lives on
        // to the next generation.
        if(cell.isAlive() && alive === 3) {
          cell.becomesAlive();
        }

        // Any live cell with more than three live neighbours dies,
        // as if by overcrowding.
        if(cell.isAlive() && alive > 3) {
          cell.dies();
        }

        // Any dead cell with exactly three live neighbours
        // becomes a live cell, as if by reproduction
        if(cell.isDead() && alive === 3) {
          cell.becomesAlive();
        }

      });

    });

  }
}

module.exports.Game = Game;
module.exports.Cell = Cell;
module.exports.Grid = Grid;

