var CatchMice = CatchMice || {};

var layer;
var currentSpeed = 0;
var numOfFoods = 5;
//['jabolko', 'hruska', 'banana', 'jagoda', 'ananas'];
var foodLocations = [[[670, 110], [480, 100], [30, 100], [30, 200], [640, 205]],
                     [[640, 440], [220, 300], [140, 80], [80, 440], [540, 40]],
                     [[340, 525], [625, 245], [380, 370], [100, 160], [25, 25]]];

var mouseHolesLocations = [[[190, 340], [130, 340], [10, 510], [550, 430], [710,10]],
                           [[10, 10], [370, 90], [700, 90], [450, 350], [320,490]],
                           [[270, 100], [90, 310], [350, 10], [700, 310], [700,500]]];

//title screen
CatchMice.Game = function(){};

CatchMice.Game.prototype = {
    
  create: function() {
      
      //player initial score of zero
      this.playerScore = 0;
      
      this.map = this.game.add.tilemap('map'+CatchMice.level);

      this.map.addTilesetImage('wood');
      this.map.addTilesetImage('wall');
      
      this.backgroundlayer = this.map.createLayer('backgroundLayer');
      this.layer = this.map.createLayer('Tile Layer 1');

      this.map.setCollisionBetween(0, 100000, true, 'Tile Layer 1');
      
      //set world dimensions
      this.game.world.setBounds(0, 0, 800, 600);
      this.backgroundlayer.resizeWorld();
      
      //create player
      this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'skupaj','player'); 
      this.player.scale.setTo(0.15);
      this.player.anchor.setTo(0.5, 0.5);
      
      this.nosim = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'skupaj',CatchMice.foodsList[this.playerScore]);
      this.nosim.scale.setTo(0.15);
      this.nosim.anchor.setTo(0.5, 0.5);
      
      
      //the camera will follow the player in the world
      this.game.camera.follow(this.player);
      
      // generate foods at possible positions
      this.generateFoods();
      // generate mouse holes at possible positions
      this.generateMouseHoles();
      
      
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
            this.player.angle -= 4;
       }
       // If the right arrow key is pressed
       else if (this.cursor.right.isDown) {
           // Move the player to the right
           this.player.angle += 4;
       }else {
           this.player.body.velocity.x = 0;
       }
        
       // If the up arrow key
       if (this.cursor.up.isDown) { 
           // Move player up
           currentSpeed = 100;
       // If the down arrow key is pressed
       } else if (currentSpeed > 0) {
           // Move player down
           currentSpeed -= 4;
       }  else {
           this.player.body.velocity.y = 0;
       }
       
        if (currentSpeed > 0)
        {
            this.game.physics.arcade.velocityFromRotation(this.player.rotation, currentSpeed, this.player.body.velocity);
        }
        this.nosim.x = this.player.x;
        this.nosim.y = this.player.y;
        this.nosim.rotation = this.player.rotation;
        
    },
    
  update: function() {
      if(this.game.input.activePointer.justPressed()) {
          //move on the direction of the input
          this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
      }
      
      this.movePlayer();
      //console.log(this.player.x, this.player.y);
      this.game.physics.arcade.collide(this.player, this.layer);
      
      if(this.game.input.keyboard.justPressed(Phaser.Keyboard.P)){
          this.managePause();
      }
      
      if(this.game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
          this.state.start('MainMenu');
      }
      
      if(this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR, 1)){
          if(this.zadetek()){
              //console.log("znotraj");
              
          }else{
              //console.log("zunaj");
          }
              
      }
      
    /*// Tell Phaser that the player and the walls should collide
     this.game.physics.arcade.collide(this.player, this.walls); */
      
      //overlapping between player and collectables (not collision)
      
  },
    
  zadetek: function(){
      console.log(this.player.x + ", " + this.player.y);
      for (var i = 0; i < foodLocations[CatchMice.level].length; i++){
        if (this.player.x < foodLocations[CatchMice.level][i][0]+30 & this.player.x > foodLocations[CatchMice.level][i][0]-30 &
            this.player.y < foodLocations[CatchMice.level][i][1]+30 & this.player.y > foodLocations[CatchMice.level][i][1]-30){
            food = this.game.add.sprite(foodLocations[CatchMice.level][i][0], foodLocations[CatchMice.level][i][1], CatchMice.foodsList[this.playerScore]);
            food.scale.set(0.5);
            this.game.physics.arcade.overlap(this.player, this.foods, this.collect, null, this); 
            return true;
        }
      }
      return false;
  },
   
  generateFoods: function() {
      
    // for each map, we need to know where the possible food locations are
    
    this.foods = this.game.add.group();

    //enable physics in them
    this.foods.enableBody = true;
    this.foods.physicsBodyType = Phaser.Physics.ARCADE;

    var food;

    for (var i = 0; i < numOfFoods; i++) {
      //add sprite
      food = this.foods.create(foodLocations[CatchMice.level][i][0], foodLocations[CatchMice.level][i][1], CatchMice.foodsList[i]);
      food.scale.setTo(0.25);
      //food.scale.setTo(2/5);

      //physics properties
      food.body.velocity.x = 0; 
      food.body.velocity.y = 0;
      food.body.immovable = true;
      food.body.collideWorldBounds = true;
    }
  },
    
  generateMouseHoles: function() {
      
     this.mouseHoles = this.game.add.group();

    //phaser's random number generator
      // Has to be the same as the number of foods
    var numOfHoles = numOfFoods;
    var hole;
      
    

    for (var i = 0; i < numOfHoles; i++) {
      //add sprite
      hole = this.mouseHoles.create(mouseHolesLocations[CatchMice.level][i][0], mouseHolesLocations[CatchMice.level][i][1], 'mouseHole');
      //food.scale.setTo(2/5);

      //physics properties
      /*hole.body.velocity.x = 0;
      hole.body.velocity.y = 0; 
      hole.body.immovable = true;
      hole.body.collideWorldBounds = true;*/
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