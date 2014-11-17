var CatchMice = CatchMice || {};
var map;
var layer;

//title screen
CatchMice.Game = function(){};

CatchMice.Game.prototype = {
  create: function() {
      
      this.map = this.game.add.tilemap('map');

      this.map.addTilesetImage('wood');
      this.map.addTilesetImage('wall');
      
      this.backgroundlayer = this.map.createLayer('backgroundLayer');
      this.layer = this.map.createLayer('Tile Layer 1');

      this.map.setCollisionBetween(0,100000,true, 'Tile Layer 1');
      
      //set world dimensions
      this.game.world.setBounds(0, 0, 800, 600);
      this.backgroundlayer.resizeWorld();
      
      //create player
      this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player'); 
      this.player.scale.setTo(2);
      //this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
      // this.player.animations.play('fly');
      
      //the camera will follow the player in the world
      this.game.camera.follow(this.player);
      
      //this.generateAsteriods();
      //this.generateCollectables();
      
      //player initial score of zero
      this.playerScore = 0;
      
      //show score
      this.showLabels();
      
      //enable player physics
      this.game.physics.arcade.enable(this.player);
      this.playerSpeed = 240;
      this.player.body.collideWorldBounds = true;
      
      // create the ability to control our player with the keyboard
      this.cursor = this.game.input.keyboard.createCursorKeys();
      
      //sounds
      //this.explosionSound = this.game.add.audio('explosion');
      //this.collectSound = this.game.add.audio('collect');
    
      
  },
    
    // ----------------------------
    // Moving our player with the keyboard
    // ----------------------------
    movePlayer: function() {
        // If the left arrow key is pressed
        if (this.cursor.left.isDown) {
            // Move the player to the left
            this.player.body.velocity.x = -200;
       }

       // If the right arrow key is pressed
       else if (this.cursor.right.isDown) {
           // Move the player to the right
           this.player.body.velocity.x = 200;
       }

       // If neither the right or left arrow key is pressed
       else {
           // Stop the player
           this.player.body.velocity.x = 0;
       }

       // If the up arrow key
       if (this.cursor.up.isDown) { 
           // Move player up
           this.player.body.velocity.y = -200;
           
       // If the down arrow key is pressed
       } else if (this.cursor.down.isDown) {
           // Move player down
           this.player.body.velocity.y = +200;
       }  
        
       // If neither the up or down arrow key is pressed
       else {
           // Stop the player
           this.player.body.velocity.y = 0;
       }
        
    },
    
  update: function() {
      if(this.game.input.activePointer.justPressed()) {
          //move on the direction of the input
          this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }
      
    this.movePlayer();
      
      this.game.physics.arcade.collide(this.player, this.layer);
      
    // Tell Phaser that the player and the walls should collide
     this.game.physics.arcade.collide(this.player, this.walls);
    //collision between player and asteroids
     this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
      
      //overlapping between player and collectables (not collision)
      this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this); 
      
  },
    
   
 /* generateAsteriods: function() {
    this.asteroids = this.game.add.group();

    //enable physics in them
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(150, 200)
    var asteriod;

    for (var i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);

      //physics properties
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
    }
  },
    
hitAsteroid: function(player, asteroid) {
    //play explosion sound
    //this.explosionSound.play();

    //make the player explode
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
    this.player.destroy();
    
    //call the gameOver method in 800 milliseconds, we haven't created this method yet
    this.game.time.events.add(800, this.gameOver, this);
  },
    
    generateCollectables: function() {
    this.collectables = this.game.add.group();

    //enable physics in them
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numCollectables = this.game.rnd.integerInRange(100, 150)
    var collectable;

    for (var i = 0; i < numCollectables; i++) {
      //add sprite
      collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
      collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectable.animations.play('fly');
    }
  },
    
    collect: function(player, collectable) {
    //play collect sound
    this.collectSound.play();

    //update score
    this.playerScore++;
    //will add later: this.scoreLabel.text = this.playerScore;

    //remove sprite
    collectable.destroy();
  }, */
    
    gameOver: function() {    
    //pass it the score as a parameter 
    this.game.state.start('MainMenu', true, false, this.playerScore);
},
    
    showLabels: function() {
    //score text
    var text = "0";
    var style = { font: "20px Arial", fill: "#000", align: "center" };
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
}
};