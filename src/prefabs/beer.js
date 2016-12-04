'use strict';

var Beer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'beer', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outOfBoundsKill = true;
  this.checkWorldBounds = true;
};

Beer.prototype = Object.create(Phaser.Sprite.prototype);
Beer.prototype.constructor = Beer;

Beer.prototype.update = function() {
};

module.exports = Beer;
