'use strict';

var PausePanel = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // Add panel
  this.panel = this.game.add.sprite(0, 0, 'pausePanel');
  this.panel.width = 500;
  this.panel.height = 280;
  this.add(this.panel);

  //creates the unpause/resume button
  this.playBtn = this.game.add.button(170, 140, 'play-btn', this.unpause, this, 3, 2, 3, 2);
  this.playBtn.anchor.setTo(0, 0);
  this.add(this.playBtn);

  this.y = 110;
  this.x = 370;
  this.alpha = 0;  
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.prototype.constructor = PausePanel;
PausePanel.prototype.update = function() {
};
//show the pause panel when paused
PausePanel.prototype.show = function(){
  this.game.add.tween(this).to({alpha:0.6, y:150}, 800, Phaser.Easing.Exponential.In, true, 0);
};
//hides the pause panel when unpaused
PausePanel.prototype.unpause = function(){
  this.game.add.tween(this).to({alpha:0, y:150}, 800, Phaser.Easing.Exponential.Out, true, 0);
  this.game.state.getCurrentState().playGame();
};

module.exports = PausePanel;
  