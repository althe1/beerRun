'use strict';

var Whiskey = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'whiskey', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outOfBoundsKill = true;
  this.checkWorldBounds = true;
  
};

Whiskey.prototype = Object.create(Phaser.Sprite.prototype);
Whiskey.prototype.constructor = Whiskey;

Whiskey.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Whiskey;

