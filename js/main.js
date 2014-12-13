var CatchMice = CatchMice || {};

CatchMice.game = new Phaser.Game(800, 600, Phaser.AUTO, 'main_div');

CatchMice.game.state.add('Boot', CatchMice.Boot);
CatchMice.game.state.add('Preload', CatchMice.Preload);
CatchMice.game.state.add('MainMenu', CatchMice.MainMenu);
CatchMice.game.state.add('MapMenu', CatchMice.MapMenu);
CatchMice.game.state.add('Game', CatchMice.Game);

CatchMice.game.state.start('Boot');

CatchMice.level = 0;
CatchMice.foodsList = ['jabolko', 'hruska', 'banana', 'jagoda', 'ananas'];