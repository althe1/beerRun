'use strict';
function Menu() {}
//creates the starting/title page of the game
Menu.prototype = {
  preload: function() {

  },
  create: function() {
    //adds the background image
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    this.background.scale.setTo(2, 2);

    //adds a ground image
    this.ground = this.game.add.tileSprite(0, 530, this.game.world.width, this.game.world.height, 'ground');

    //shows the "Beer Run" and sets its size
    this.title = this.game.add.sprite(this.game.width/2, 250,'title');
    this.title.scale.setTo(1.2, 1.2);
    this.title.anchor.setTo(0.5, 1);
    
    //makes the "Beer Run" go up and down in a loop
    this.game.add.tween(this.title).to({y:200}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //Score from last game
    // this.scoreText = this.game.add.text(500, 250, 'High Score: ' + localStorage.getItem('score'), {fontSize: '32px', fill: '#000'});

    //creates the start button and once click runs the play state
    this.startButton = this.game.add.button(this.game.width/2, 290, 'startButton', this.startClick, this);
    this.startButton.scale.setTo(2, 2);
    this.startButton.anchor.setTo(0.5,0.5);
  },
  //callback function, when activated starts the play state
  startClick: function() {  
    this.game.state.start('play');
  },
  update: function() {
  }
};

module.exports = Menu;
