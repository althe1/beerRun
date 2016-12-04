'use strict';

var Keg = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'keg', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outOfBoundsKill = true;
  this.checkWorldBounds = true;
};

Keg.prototype = Object.create(Phaser.Sprite.prototype);
Keg.prototype.constructor = Keg;

Keg.prototype.update = function() {
};

module.exports = Keg;
