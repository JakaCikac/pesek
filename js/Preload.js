var CatchMice = CatchMice || {};

//loading the game assets
CatchMice.Preload = function(){};

CatchMice.Preload.prototype = {
  preload: function() {
      
  	//show logo in loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
  	this.load.image('background', 'assets/images/background.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('wallV', 'assets/images/wallVertical.png');
    this.load.image('wallH', 'assets/images/wallHorizontal.png');
  	this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};