'use strict';

var Heart = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'heart', frame);
};

Heart.prototype = Object.create(Phaser.Sprite.prototype);
Heart.prototype.constructor = Heart;

Heart.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Heart;
