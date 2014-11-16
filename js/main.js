var CatchMice = CatchMice || {};

CatchMice.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

CatchMice.game.state.add('Boot', CatchMice.Boot);

//CatchMice.game.state.add('Preload', CatchMice.Preload);
//CatchMice.game.state.add('MainMenu', CatchMice.MainMenu);
//CatchMice.game.state.add('Game', CatchMice.Game);

CatchMice.game.state.start('Boot');