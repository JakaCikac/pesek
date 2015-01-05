var SortingGame = SortingGame || {};

//loading the game assets
SortingGame.Preload = function () {};

SortingGame.Preload.prototype = {
  preload: function() {
      
  	//show logo in loading screen
  	//this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    //this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
    // ozadja:
  	//this.load.image('background', 'assets/images/background.png');
    this.load.image('background', 'assets/images/shramba1.jpg');
      
    // gumbi:
    this.load.spritesheet('button_play',   'assets/images/button_play.png', 193, 71);
    this.load.spritesheet('button_back',   'assets/images/button_back.png', 193, 71);
    this.load.spritesheet('button_levels', 'assets/images/button_levels.png', 193, 71);
    //this.load.spritesheet('button_easy',   'assets/iamges/button_easy.png', 193, 71);
    this.load.spritesheet('button_normal', 'assets/images/button_normal.png', 193, 71);
    this.load.spritesheet('button_hard',   'assets/images/button_hard.png', 193, 71);
    this.load.spritesheet('button_points', 'assets/images/button_points.png', 193, 71);
      // naredi in dodaj:
    //this.load.spritesheet('button_up', 'assets/images/arrow-button_up.png', 95, 112);
    //this.load.spritesheet('button_down', 'assets/iamges/arrow-button_down.png', 95, 112);
    //this.load.spritesheet('button_left', 'assets/iamges/arrow-button_left.png', 112, 95);
    //this.load.spritesheet('button_right', 'assets/images/arrow-button_right.png', 112, 95);
    this.load.spritesheet('button_up',    'assets/images/arrow-button_up.png');
    this.load.spritesheet('button_down',  'assets/iamges/arrow-button_down.png');
    this.load.spritesheet('button_left',  'assets/iamges/arrow-button_left.png');
    this.load.spritesheet('button_right', 'assets/images/arrow-button_right.png');
      
    // objekti:
    this.load.image('player', 'assets/images/melon.png'); // premakni + dinamično
    this.load.image('bigBasket', 'assets/images/basket4.png');
    this.load.image('wallH', 'assets/images/wallHorizontal.png');
    this.load.image('shelf', 'assets/images/woddenShelf.png');
    this.load.image('basketSmall','assets/images/basket1.png');
      
    // zvok:
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
      
    // 
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};