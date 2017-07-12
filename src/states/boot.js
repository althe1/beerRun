'use strict';

function Boot() {
}
//if the assets are still loading run this
Boot.prototype = {
  preload: function() {
    //loads an loading gif 
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    // this.game.state.start('preload');
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.scale.setScreenSize(true);
    this.game.input.maxPointers = 1; 
    this.game.state.start('preload');
  }
};

module.exports = Boot;
