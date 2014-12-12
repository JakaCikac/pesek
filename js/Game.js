var CatchMice = CatchMice || {};

var map;
var layer;
var numOfFoods = 5;

//title screen
CatchMice.Game = function(){};

CatchMice.Game.prototype = {
    
  create: function() {
      
      this.map = this.game.add.tilemap(CatchMice.map);

      this.map.addTilesetImage('wood');
      this.map.addTilesetImage('wall');
      
      this.backgroundlayer = this.map.createLayer('backgroundLayer');
      this.layer = this.map.createLayer('Tile Layer 1');

      this.map.setCollisionBetween(0, 100000, true, 'Tile Layer 1');
      
      //set world dimensions
      this.game.world.setBounds(0, 0, 800, 600);
      this.backgroundlayer.resizeWorld();
      
      //create player
      this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player'); 
      this.player.scale.setTo(0.15);
      
      //the camera will follow the player in the world
      this.game.camera.follow(this.player);
      
      // generate foods at possible positions
      this.generateFoods();
      // generate mouse holes at possible positions
      this.generateMouseHoles();
      
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
      this.collectSound = this.game.add.audio('collect');

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
           this.player.body.velocity.y = 200;
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
      
      if(this.game.input.keyboard.justPressed(Phaser.Keyboard.P)){
          this.managePause();
      }
      
      if(this.game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
          this.state.start('MainMenu');
      }
      
    /*// Tell Phaser that the player and the walls should collide
     this.game.physics.arcade.collide(this.player, this.walls); */
      
      //overlapping between player and collectables (not collision)
      this.game.physics.arcade.overlap(this.player, this.foods, this.collect, null, this); 
  },
    
   
  generateFoods: function() {
      
    // for each map, we need to know where the possible food locations are
    //this.foodLocations = ...
 
    this.foods = this.game.add.group();

    //enable physics in them
    this.foods.enableBody = true;
    this.foods.physicsBodyType = Phaser.Physics.ARCADE;

    var food;

    for (var i = 0; i < numOfFoods; i++) {
      //add sprite
      food = this.foods.create(this.game.world.randomX, this.game.world.randomY, 'food');
      //food.scale.setTo(2/5);

      //physics properties
      food.body.velocity.x = 0; 
      food.body.velocity.y = 0;
      food.body.immovable = true;
      food.body.collideWorldBounds = true;
    }
  },
    
  generateMouseHoles: function() {
      
    // for each map, we need to know where the mouse holes are
    //this.mouseHolesLocations = -...-
    
    this.mouseHoles = this.game.add.group();

    //phaser's random number generator
      // Has to be the same as the number of foods
    var numOfHoles = numOfFoods;
    var hole;
      
    

    for (var i = 0; i < numOfHoles; i++) {
      //add sprite
      hole = this.foods.create(this.game.world.randomX, this.game.world.randomY, 'mouseHole');
      //food.scale.setTo(2/5);

      //physics properties
      hole.body.velocity.x = 0;
      hole.body.velocity.y = 0; 
      hole.body.immovable = true;
      hole.body.collideWorldBounds = true;
    }
  },
    
 /*   
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
  }, */
    
    collect: function(player, collectable) {
    //play collect sound
    this.collectSound.play();

    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;

    //remove sprite
        // TODO: before remove add to collected set of food, so we can check for correctness of solution
    collectable.destroy();
  },
    
    gameOver: function() {    
    //pass it the score as a parameter 
    this.game.state.start('MainMenu', true, false, this.playerScore);
},
    
    managePause: function() {
    this.game.paused = true;
    var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
    this.input.onDown.add(function(){
        pausedText.destroy();
        this.game.paused = false;
    }, this);
    },
    
    showLabels: function() {
    //score text
    var text = "0";
    var style = { font: "20px Arial", fill: "#000", align: "center" };
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
}
};