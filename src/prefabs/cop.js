'use strict';

var Cop = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cop', frame);

  this.game.physics.arcade.enable(this);

  this.body.gravity.y = 620;
  this.body.velocity.x = -65;
  this.body.collideWorldBounds = false;
  this.body.setSize(20, 60, 0, 5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  this.animations.add('copleft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
  this.animations.play('copleft');
  
};

Cop.prototype = Object.create(Phaser.Sprite.prototype);
Cop.prototype.constructor = Cop;

Cop.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Cop;

