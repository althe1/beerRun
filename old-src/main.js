const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'beerRun-game');

game.state.add('boot', require('./states/boot'));
game.state.add('game', require('./states/game'));
game.state.add('menu', require('./states/menu'));
game.state.add('preloader', require('./states/preloader'));
game.state.add('gameover', require('./states/gameover'));

game.state.start('boot');
