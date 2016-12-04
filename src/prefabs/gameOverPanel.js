'use strict';

var GameOverPanel = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // Add panel
  this.panel = this.game.add.sprite(0, 0, 'gameOverPanel');
  this.panel.width = 410;
  this.panel.height = 90;
  this.add(this.panel);

  this.y = 50;
  this.x = 400;
  this.alpha = 0; 
};

GameOverPanel.prototype = Object.create(Phaser.Group.prototype);
GameOverPanel.prototype.constructor = GameOverPanel;
GameOverPanel.prototype.update = function() {
};
//show the game over panel when paused
GameOverPanel.prototype.show = function(){
  this.game.add.tween(this).to({alpha: 1, y:110}, 50, Phaser.Easing.Bounce.Out, true);
  this.playAgain = this.game.add.button(25, 4, 'restart-btn', this.restartGame, this);
  this.playAgain.anchor.setTo(0, 0);
  this.add(this.playAgain);
};

//callback function, when activated starts the play state
GameOverPanel.prototype.restartGame = function() {  
  this.game.state.start('play');
};

module.exports = GameOverPanel;