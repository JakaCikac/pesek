var CatchMice = CatchMice || {};

//loading the game assets
CatchMice.Preload = function(){};

CatchMice.Preload.prototype = {
    preload: function() {

        //load 3 mazes and textures
        this.load.tilemap('map0', 'assets/tilemaps/maps/labirint.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map1', 'assets/tilemaps/maps/labirint1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map2', 'assets/tilemaps/maps/labirint2.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('wood', 'assets/images/wood.jpg');
        this.load.image('wall', 'assets/images/wall.png');

        //show logo in loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.image('background_main', 'assets/images/backgroundMain.png');
        this.load.image('background_map', 'assets/images/backgroundMap.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('mouse', 'assets/images/mouse.png');
        this.load.spritesheet('button_play', 'assets/images/button_play.png', 193, 71);
        this.load.spritesheet('button_back', 'assets/images/button_back.png', 193, 71);
        this.load.spritesheet('button_map', 'assets/images/button_map.png', 193, 71);
        this.load.spritesheet('button_level1', 'assets/images/button_level1.png', 193, 71);
        this.load.spritesheet('button_level2', 'assets/images/button_level2.png', 193, 71);
        this.load.spritesheet('button_level3', 'assets/images/button_level3.png', 193, 71);
        this.load.audio('collect', 'assets/audio/collect.mp3');

        //this.game.load.atlas('skupaj', 'assets/images/skupaj.png', 'assets/images/skupaj.json');

        this.load.image('mouseHole', 'assets/images/mouseHole.png');
        this.load.image('jabolko', 'assets/images/jabolko.png');
        this.load.image('hruska', 'assets/images/hruska.png');
        this.load.image('banana', 'assets/images/banana.png');
        this.load.image('jagoda', 'assets/images/jagoda.png');
        this.load.image('ananas', 'assets/images/ananas.png');
    },
    
    create: function() {
        this.state.start('MainMenu');
    }
};