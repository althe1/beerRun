'use strict';

var Bunny = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bunny', frame);

  // enable physics for the bunny objects
  this.game.physics.arcade.enable(this);

  //bunny properties
  this.body.gravity.y = 620;
  this.body.velocity.x = -50;
  this.body.collideWorldBounds = false;
  this.body.setSize(30, 32, 2, 0);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  //bunny animation frames
  this.animations.add('left', [0, 1], 10, true );
  this.animations.add('boom', [2, 3, 4, 5, 6, 7, 8, 9], 10, false);
  this.animations.play('left');
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;
Bunny.prototype.update = function() {
  

};

module.exports = Bunny;