var SortingGame = SortingGame || {};

// varibles:
SortingGame.gameLevel = 1;
SortingGame.sadje = ['ananas', 'banana', 'hruska', 'jabolko', 'jagoda'];

SortingGame.game = new Phaser.Game(800, 600, Phaser.AUTO, 'main_div');

SortingGame.game.state.add('Boot', SortingGame.Boot);
SortingGame.game.state.add('Preload', SortingGame.Preload);
SortingGame.game.state.add('MainMenu', SortingGame.MainMenu);
SortingGame.game.state.add('LevelsMenu', SortingGame.LevelsMenu);
SortingGame.game.state.add('PointsMenu', SortingGame.PointsMenu);
SortingGame.game.state.add('Game', SortingGame.Game);
SortingGame.game.state.add('Levels', SortingGame.Levels);
SortingGame.game.state.add('Points', SortingGame.Points);


SortingGame.game.state.start('Boot');