"use strict";

var Dude = require("../prefabs/dude");
var Cop = require("../prefabs/cop");
var Bunny = require("../prefabs/bunny");
var Ground = require("../prefabs/ground");
var Beer = require("../prefabs/beer");
var Keg = require("../prefabs/keg");
var Whiskey = require("../prefabs/whiskey");
var PausePanel = require("../prefabs/pausePanel");
var GameOverPanel = require("../prefabs/gameOverPanel");
var Heart = require("../prefabs/heart");
var paused = false;
var deadchecker = true;
var scoreText;

function Play() {}
Play.prototype = {
  create: function () {
    //enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 750;

    //background
    this.background = this.game.add.tileSprite(
      0,
      0,
      this.game.width,
      this.game.height,
      "background"
    );
    this.background.autoScroll(-100, 0);
    this.background.scale.setTo(2, 2);

    //ground
    this.groundGroup = this.game.add.group();

    //creates the first ledge when the player lands
    this.initial_ground = new Ground(
      this.game,
      0,
      this.game.world.height - 64,
      300,
      150
    );
    this.initial_ground.scale.setTo(5, 3);
    this.game.add.existing(this.initial_ground);

    //player
    this.player = new Dude(this.game, 500, 0);
    this.player.jumpCount = 0;
    this.game.add.existing(this.player);

    //cops
    this.cops = this.game.add.group();

    //bunnies
    this.bunnies = this.game.add.group();

    //score
    localStorage.setItem("score", "0");
    // console.log(localStorage.getItem('score'));

    this.scoreText = this.game.add.text(15, 15, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    //beer
    this.beers = this.game.add.group();

    //keg
    this.kegs = this.game.add.group();

    //whiskey
    this.whiskeys = this.game.add.group();

    //game controls
    this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shift = this.game.input.keyboard.addKey((Phaser.Keyboard.SHIFT = 16));
    this.touch = this.game.input.pointer1;
    // this.touch = this.game.input.pointer1;

    // Tells phaser to fire doubleJump() ONCE per onDown event
    this.jumpKey.onDown.add(this.doubleJump, this);

    // this.pauseKey = this.game.input.keyboard.addKey(32);

    // makes spacebar not scroll down
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    //pause button
    this.btnPause = this.game.add.button(
      1150,
      40,
      "pause-btn",
      this.pauseGame,
      this
    );
    this.btnPause.anchor.setTo(0.5, 0.5);
    this.btnPause.alpha = 1;

    //pause panel
    this.pausePanel = new PausePanel(this.game);
    this.game.add.existing(this.pausePanel);

    //game over panel
    this.gameOverPanel = new GameOverPanel(this.game);
    this.game.add.existing(this.gameOverPanel);

    //player lives
    this.lives = this.game.add.group();

    this.generateLife(14);
    this.generateLife(60);
    this.generateLife(106);

    this.initGame();
  },
  update: function () {
    //calls the checkcollisions function
    this.checkCollisions();

    //if game is not paused enable player animation and update movement
    if (!paused) {
      //player speed
      this.player.body.velocity.x = 400;

      if (
        (this.touch.isDown &&
          this.player.body.touching.down &&
          this.player.alive) ||
        (this.jumpKey.isDown &&
          this.player.body.touching.down &&
          this.player.alive)
      ) {
        this.doubleJump();
      } else if (!this.player.body.touching.down) {
        this.player.animations.play("jump");
        this.player.body.velocity.x = 0;
      } else if (deadchecker == false) {
      } else {
        this.player.animations.play("run");
        this.player.body.setSize(25, 60, 5, 0);
        this.player.jumpCount = 0;
      }

      if (!this.player.alive) {
        this.damageLife();
        this.damageLife();
        this.damageLife();
        this.gameOver();
      }

      if (this.lives.children[0] === undefined) {
        // console.log("All lives gone");
        this.gameOver();
        var deadDude = this.player.animations.play("dead", 15, false, true);
        deadDude.play();
      }
    }
  },

  doubleJump: function () {
    if (this.player.jumpCount < 2) {
      this.player.jump();
      this.game.sound.play("dudeJump", 1, 0, false, false);
      this.player.body.setSize(15, 60, 5, 0);
      this.player.jumpCount++;
    }
  },

  returnFalse: function () {
    return deadchecker;
  },

  //collision between elements
  checkCollisions: function () {
    //lets player, bunnies, cops, beers, kegs, whiskey stop on ground
    this.game.physics.arcade.collide(this.player, this.initial_ground);
    this.game.physics.arcade.collide(this.bunnies, this.initial_ground);
    this.game.physics.arcade.collide(this.cops, this.initial_ground);
    this.game.physics.arcade.collide(this.beers, this.initial_ground);
    this.game.physics.arcade.collide(this.kegs, this.initial_ground);
    this.game.physics.arcade.collide(this.whiskeys, this.initial_ground);

    //lets player, bunnies, cops, beers, kegs, whiskey stop on ground group
    this.game.physics.arcade.collide(this.player, this.groundGroup);
    this.game.physics.arcade.collide(this.bunnies, this.groundGroup);
    this.game.physics.arcade.collide(this.cops, this.groundGroup);
    this.game.physics.arcade.collide(this.beers, this.groundGroup);
    this.game.physics.arcade.collide(this.kegs, this.groundGroup);
    this.game.physics.arcade.collide(this.beers, this.groundGroup);
    this.game.physics.arcade.collide(this.whiskeys, this.groundGroup);

    //lets player collect beers, kegs, whiskeys
    this.game.physics.arcade.overlap(
      this.player,
      this.beers,
      this.collectBeer,
      null,
      this
    );
    this.game.physics.arcade.overlap(
      this.player,
      this.kegs,
      this.collectKeg,
      null,
      this
    );
    this.game.physics.arcade.overlap(
      this.player,
      this.whiskeys,
      this.collectWhiskey,
      null,
      this
    );

    //lets player dies when cops and bunnies touch him
    this.game.physics.arcade.collide(
      this.player,
      this.bunnies,
      this.bunnyDamageDude,
      this.returnFalse,
      this
    );
    this.game.physics.arcade.collide(
      this.player,
      this.cops,
      this.copDamageDude,
      this.returnFalse,
      this
    );
  },
  //generates grounds with random y-value(height)
  generateGrounds: function () {
    // console.log(this.game.world.height - 64);
    var randomY = this.game.integerInRange(450, 520);
    var randGround = this.groundGroup.getFirstExists(true);
    if (!randGround) {
      randGround = new Ground(this.game, this.game.width, randomY);
      randGround.scale.setTo(1.5, 10);
      this.groundGroup.add(randGround);
    }
    // randGround.reset(1200, randomY);
  },
  //generate cops
  generateCops: function () {
    // console.log('beer');
    var cop = new Cop(this.game, this.game.width - 2, 400);
    this.cops.add(cop);
  },

  //generate bunnies
  generateBunnies: function () {
    // console.log('beer');
    var bunny = new Bunny(this.game, this.game.width - 3, 420);
    this.bunnies.add(bunny);
  },

  //generate beers
  generateBeers: function () {
    var beer = new Beer(this.game, this.game.width - 3, 300);
    this.beers.add(beer);
  },

  //generates kegs
  generateKegs: function () {
    var keg = new Keg(this.game, this.game.width - 3, 300);
    this.kegs.add(keg);
  },

  //generates whiskeys
  generateWhiskeys: function () {
    var whiskey = new Whiskey(this.game, this.game.width - 3, 300);
    this.whiskeys.add(whiskey);
  },

  collectBeer: function (player, beer) {
    // Removes the beer from the screen
    beer.kill();
    this.game.sound.play("collect_beer", 1, 0, false, false);
    //  Add and update the score
    var newScore = parseInt(localStorage.getItem("score")) + 5;
    localStorage.setItem("score", newScore);
    this.scoreText.text = "Score: " + localStorage.getItem("score");
  },
  collectKeg: function (player, keg) {
    // Removes the beer from the screen
    keg.kill();
    this.game.sound.play("burp", 1, 0, false, false);
    //  Add and update the score
    var newScore = parseInt(localStorage.getItem("score")) + 5;
    localStorage.setItem("score", newScore);
    this.scoreText.text = "Score: " + localStorage.getItem("score");
  },
  collectWhiskey: function (player, whiskey) {
    // Removes the beer from the screen
    whiskey.kill();
    this.game.sound.play("hiccup", 1, 0, false, false);
    //  Add and update the score
    var newScore = parseInt(localStorage.getItem("score")) + 10;
    localStorage.setItem("score", newScore);
    this.scoreText.text = "Score: " + localStorage.getItem("score");
  },
  // Generate Life
  generateLife: function (i) {
    var life = new Heart(this.game, i, 50);
    this.lives.add(life);
  },
  damageLife: function () {
    this.lives.children.pop();
  },
  bunnyDamageDude: function (player, bunny) {
    if (player.body.touching.right && bunny.body.touching.left) {
      bunny.body.velocity.x = -50;
      player.body.x += 10;
      this.damageLife();
    } else if (player.body.touching.down && bunny.body.touching.up) {
      bunny.animations.play("boom", true);
      this.game.sound.play("explode", 1, 0, false, false);
      this.changeDeadChecker(this.player, "alive");
    }
  },
  copDamageDude: function (player, cops) {
    if (player.body.touching.right) {
      cops.body.velocity.x = -50;
      player.body.x += 10;
      cops.body.x += -10;
      this.damageLife();
    }
  },

  changeDeadChecker: function (player, deadOrAlive) {
    setTimeout(changeDead, 1200);

    function changeDead() {
      deadchecker = true;
      if (deadOrAlive == "dead") {
        player.kill();
      }
    }
  },

  //when the game initializes start timers for the generators and play game
  initGame: function () {
    //creates grounds at intervals
    this.groundGenerator = this.game.time.events.loop(
      Phaser.Timer.SECOND * 2,
      this.generateGrounds,
      this
    );
    this.groundGenerator.timer.start();

    //creates beer at intervals
    this.beerGenerator = this.game.time.events.loop(
      Phaser.Timer.SECOND * 1,
      this.generateBeers,
      this
    );
    this.beerGenerator.timer.start();

    //creates kegs at intervals
    this.kegGenerator = this.game.time.events.loop(
      Phaser.Timer.SECOND * 2.5,
      this.generateKegs,
      this
    );
    this.kegGenerator.timer.start();

    //creates whiskey
    this.whiskeyGenerator = this.game.time.events.loop(
      Phaser.Timer.SECOND * 3,
      this.generateWhiskeys,
      this
    );
    this.whiskeyGenerator.timer.start();

    //creates cops
    this.copGenerator = this.game.time.events.loop(
      Phaser.Timer.SECOND * 4.5,
      this.generateCops,
      this
    );
    this.copGenerator.timer.start();

    //creates bunnies at intervals
    this.bunnyGenerator = this.game.time.events.loop(
      Phaser.Timer.SECOND * 2.7,
      this.generateBunnies,
      this
    );
    this.bunnyGenerator.timer.start();

    //runs the game
    this.playGame();
  },
  playGame: function () {
    //run if game is only if paused
    if (paused) {
      this.gameover = false;
      paused = false;
      //disables to pause the game when out of focus
      this.game.stage.disableVisibilityChange = paused;

      //start animations
      this.background.autoScroll(-100, 0);
      this.initial_ground.body.velocity.x = -400;
      this.groundGroup.forEach(function (randGround) {
        randGround.body.velocity.x = -400;
      }, this);
      this.player.body.velocity.x = -400;
      this.player.animations.currentAnim.resume = true;
      this.player.body.allowGravity = true;

      //starts/resumes cops animations
      this.cops.forEach(function (cop) {
        cop.body.velocity.x = -65;
        cop.animations.currentAnim.paused = false;
        cop.body.allowGravity = true;
      }, this);

      //starts/resumes bunnies animations
      this.bunnies.forEach(function (bunny) {
        bunny.body.velocity.x = -50;
        bunny.animations.currentAnim.paused = false;
        bunny.body.allowGravity = true;
      }, this);

      //resume generators
      this.groundGenerator.timer.resume();
      this.beerGenerator.timer.resume();
      this.kegGenerator.timer.resume();
      this.whiskeyGenerator.timer.resume();
      this.copGenerator.timer.resume();
      this.bunnyGenerator.timer.resume();

      //show pause button
      this.game.add
        .tween(this.btnPause)
        .to({ alpha: 1 }, 1000, Phaser.Easing.Exponential.In, true);
    } //else do nothing
  },
  //manually made pause function
  //stops all movement to mimic a paused state and show a pop up paused panel
  pauseGame: function () {
    //if game is not paused and pauseGame is called run the function
    if (!paused) {
      paused = true;
      //disables to pause the game when out of focus
      //this function starts the game if paused so we need to disable it
      this.game.stage.disableVisibilityChange = paused;

      //stop animations, auto scrolls, and physics
      this.background.autoScroll(0, 0);
      this.initial_ground.body.velocity.x = 0;
      this.groundGroup.forEach(function (randGround) {
        randGround.body.velocity.x = 0;
      }, this);
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.player.animations.currentAnim.paused = true;
      this.player.body.allowGravity = false;

      this.cops.forEach(function (cop) {
        cop.body.velocity.x = 0;
        cop.animations.currentAnim.paused = true;
      }, this);

      this.bunnies.forEach(function (bunny) {
        bunny.body.velocity.x = 0;
        bunny.animations.currentAnim.paused = true;
      }, this);

      //pause generators
      this.groundGenerator.timer.pause();
      this.beerGenerator.timer.pause();
      this.kegGenerator.timer.pause();
      this.whiskeyGenerator.timer.pause();
      this.copGenerator.timer.pause();
      this.bunnyGenerator.timer.pause();

      //hide pause button
      this.game.add
        .tween(this.btnPause)
        .to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.Out, true);
      this.btnPause.alpha = 0;

      //only show the paused panel if the game is not over
      if (!this.gameover) {
        // Show pause panel
        this.pausePanel.show();
      } //else do nothing
    } //else do nothing
  },
  //manually made unpause function
  //resumes the game state
  addScore: function (input) {
    if (input.exists && !input.hasScored) {
      input.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
    }
  },
  gameOver: function () {
    // Gamover
    this.gameover = true;
    this.game.sound.play("scream", 1, 0, false, false);

    // Pause game
    this.pauseGame();

    // Show gameover panel
    this.gameOverPanel.show();
  },
  //reset all functions when moving back to play state
  //destroys memory in order to loaf a fresh game
  shutdown: function () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.player.destroy();
    this.beers.destroy();
    this.cops.destroy();
    this.whiskeys.destroy();
    this.groundGroup.destroy();
    this.bunnies.destroy();
    this.kegs.destroy();
    this.pausePanel.destroy();
    this.gameOverPanel.destroy();
  },
};

module.exports = Play;
