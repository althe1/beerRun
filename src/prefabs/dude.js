'use strict';

var Dude = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'dude', frame);

  //enable physics for the dude object
  this.game.physics.arcade.enable(this);

  //dude properties
  this.body.gravity.y = 720;
  this.body.velocity.x = 400;
  this.body.setSize(25, 60, 5, 0);
  this.body.collideWorldBounds = false;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  //dude animation frames
  this.animations.add('jump', [1], 10, true );
  this.animations.add('run', [0, 1, 2, 3], 8, true);
  this.animations.add('dead', [4, 5, 6], 10, false);

  this.lives = 3;

};

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;
Dude.prototype.update = function() {
};
//lets the dude jump
Dude.prototype.jump = function(){
  this.body.velocity.y = -550;
};

module.exports = Dude;


