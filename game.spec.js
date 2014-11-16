var _ = require('lodash');
var Game = require('./game').Game;
var Cell = require('./game').Cell;
var Grid = require('./game').Grid;

describe('Cell', function() {

  it('I have a Cell', function() {
    var cell = new Cell();
    expect(cell instanceof Cell).toBe(true);
  });

  it('I can set the state of a cell', function() {
    var cell = new Cell();
    cell.setState(0);
    expect(cell.getState()).toBe(0);

    var cell2 = new Cell(1);
    expect(cell2.getState()).toBe(1);
  });

  it('I can see a representation of the cell object in a string', function() {
    var cell = new Cell();
    cell.setState(0);
    expect(cell.toString().length >= 1).toBe(true);

    var cell2 = new Cell(1);
    expect(cell2.valueOf()).toBe(1);
  });

});

describe('Grid', function() {

  it('UI grid representation', function() {
    var grid = [[new Cell(0), new Cell(1)]];
    grid.toString = Grid.toString;
    expect(grid.toString()).toContain(' ');
    expect(grid.toString()).toContain('\n');

  });

  it('UI grid representation with 2 lines', function() {
    var grid = [
      [new Cell(0), new Cell(1)],
      [new Cell(1), new Cell(1)]
    ];
    grid.toString = Grid.toString;
    expect(grid.toString()).toContain('\n');
  });

});

describe('Game', function() {

  it('I have a Game', function() {
    var g = new Game();
    expect(g instanceof Game).toBe(true);
  });

  it('In the game I have a grid', function() {
    var g = new Game();
    expect(g.grid instanceof Array).toBe(true);
  });

  it('In the grid I only have cells', function() {
    var g = new Game();

    expect(typeof g.grid).toBe('object');
    expect(g.grid.length > 1).toBe(true);

    _.each(g.grid, function(line) {
      _.each(line, function(cell) {
        expect(cell instanceof Cell).toBe(true);
      })
    });
  });

  it('A cell should be killed after the check`', function() {
    var g = new Game();
    g.scan();
    expect(g.grid[0][2].getState()).toBe(0);
    expect(g.grid[1][0].getState()).toBe(0);
  });

});
