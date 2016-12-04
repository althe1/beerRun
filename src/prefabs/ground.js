'use strict';

var Ground = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ground', frame);

  //enable physics for the ground object
  this.game.physics.arcade.enable(this);

  //ground properties
  this.body.velocity.x = -400;
  this.body.immovable = true;

  // this.outOfBoundsKill = true;
  this.body.allowGravity = false;
  
};
Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;
Ground.prototype.update = function() {
  this.checkWorldBounds = true;
};
// reset function for ground obj
Ground.prototype.reset = function(x, y) {

  this.game.physics.arcade.enable(this);

  this.x = x;
  this.y = y;
  this.body.velocity.x = -400;
  this.body.immovable = true;
  this.body.checkWorldBounds = true;
  this.body.outOfBoundsKill = true;
  this.body.allowGravity = false;
};

module.exports = Ground;