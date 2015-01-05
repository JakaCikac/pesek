var SortingGame = SortingGame || {};

//title screen
SortingGame.Game = function(){};

// buttons:
//var button_back;
var timer, seconds, count_remaining, count_correct, count_incorrect;

SortingGame.Game.prototype = {
    create: function() {
      
        //set world dimensions
        this.game.world.setBounds(0, 0, 800, 600);
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        // buttons:
        this.createButtons();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // pozicija:
        
        this.shelf = this.game.add.group();        // Create a new group
        this.shelf.enableBody = true;              // Add Arcade physics to the whole group
        this.shelf.setAll('body.immovable', true); // Set all the walls to be immovable
        this.createShelf();
        
        // create top basket
        this.bigBasketImageW = this.game.world.width / 4;
        this.bigBasketImageY = 10;
        this.createBigBasket();
        
        // create small
        this.generateContainers();

        //create player
        //this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player'); 
        this.player = this.game.add.sprite(this.game.world.centerX-this.bigBasketImageW/2+this.game.rnd.integerInRange(0, this.bigBasketImageW), this.bigBasketImageY, 'player'); 
        this.player.anchor.setTo(0.5,0.5);
        this.player.scale.setTo(1);
        //this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
        //this.player.animations.play('fly');

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //player initial score of zero
        this.playerScore = 0;


        //enable player physics
        this.game.physics.arcade.enable(this.player);
        this.playerSpeed = 50;
        this.player.body.collideWorldBounds = true;
        this.player.body.gravity.y = 10; // add vertical gravity to the player:

        // create the ability to control our player with the keyboard
        this.cursor = this.game.input.keyboard.createCursorKeys();

        //sounds
        this.explosionSound = this.game.add.audio('explosion');
        this.collectSound = this.game.add.audio('collect');

        //show score, elapsed time
        seconds = 0;
        count_remaining = 10;
        count_correct = 0;
        count_incorrect = 0;
        timer = this.game.time.create(false);
        timer.loop(1000, this.updateTimeEvents, this);
        this.showLabels();
        timer.start();
      
    },
    
    //-----------------------------
    //         butons
    //-----------------------------
    buttonBackEvent: function (btn){
        this.game.state.start('MainMenu', true, false, this.playerScore);
    },
    buttonUpEvent: function (btn){ this.button_up_state = 0; },
    buttonUpDown:  function (btn){ this.button_up_state = 1; },
    
    buttonDownEvent: function (btn){ this.button_down_state = 0; },
    buttonDownDown:  function (btn){ this.button_down_state = 1; },
    
    buttonLeftEvent: function (btn){ this.button_left_state = 0; },
    buttonLeftDown:  function (btn){ this.button_left_state = 1; },
    
    buttonRightEvent: function (btn){ this.button_right_state = 0; },
    buttonRightDown:  function (btn){ this.button_right_state = 1; },
    
    // ----------------------------
    // Moving our player with the keyboard
    // ----------------------------
    movePlayer: function() {
        // If the left arrow key is pressed
        if (this.cursor.left.isDown || this.button_left_state==1) {
            this.player.body.velocity.x = -100;
       }
       else if (this.cursor.right.isDown  || this.button_right_state==1) {
           this.player.body.velocity.x = 100;
       }
       else {
           this.player.body.velocity.x = 0;
       }
        
       if (this.cursor.up.isDown || this.button_up_state==1) { 
           if (this.player.body.velocity.y > 20)
           this.player.body.velocity.y += -5;
       }
        else if (this.cursor.down.isDown || this.button_down_state==1) {
           this.player.body.velocity.y += 10;
       }
    },
    
    update: function() {
        /*
        if(this.game.input.activePointer.justPressed()) {
            //move on the direction of the input
            this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
        } */
        this.movePlayer();
        this.game.physics.arcade.collide(this.player,    this.shelf,      this.playerHitShelf,     null, this); // ok
        this.game.physics.arcade.collide(this.bigBasket, this.shelf,      this.bigBasketHitObject, null, this);
        this.game.physics.arcade.collide(this.bigBasket, this.containers, this.bigBasketHitObject, null, this);
        this.game.physics.arcade.overlap(this.player,    this.containers, this.collect,            null, this); // ok
    },
    
    //--------    createButtons    --------
    createButtons: function(){
        // back
        var tmp_scale = 0.3;
        var button_back = this.game.add.button(55, this.game.height-20, 'button_back', this.buttonBackEvent, this, 1, 2, 0);
        button_back.scale.setTo(0.5, 0.5);
        button_back.anchor.set(0.5);
        
        // dodaj še gumbe gor, dol, levo in desno
        // up
        var button_up = this.game.add.button( this.game.world.width/2 - 75, this.game.height-20, 'button_up', this.buttonUpEvent, this );
        button_up.scale.setTo(tmp_scale, tmp_scale);
        button_up.anchor.set(0.5);
        button_up.onInputDown.add(this.buttonUpDown, this);
        this.button_up_state = 0; // 1 == down
        // down
        var button_down = this.game.add.button( this.game.world.width/2 - 25, this.game.height-20, 'button_down', this.buttonDownEvent, this );
        button_down.scale.setTo(tmp_scale, tmp_scale);
        button_down.anchor.set(0.5);
        button_down.onInputDown.add(this.buttonDownDown, this);
        this.button_down_state = 0; // 1 == down
        // left
        var button_left = this.game.add.button( this.game.world.width/2 + 25, this.game.height-20, 'button_left', this.buttonLeftEvent, this );
        button_left.scale.setTo(tmp_scale, tmp_scale);
        button_left.anchor.set(0.5);
        button_left.onInputDown.add(this.buttonLeftDown, this);
        this.button_left_state = 0; // 1 == down
        // right
        var button_right = this.game.add.button( this.game.world.width/2 + 75, this.game.height-20, 'button_right', this.buttonRightEvent, this );
        button_right.scale.setTo(tmp_scale, tmp_scale);
        button_right.anchor.set(0.5);
        button_right.onInputDown.add(this.buttonRightDown, this);
        this.button_right_state = 0; // 1 == down
    },
    
    //--------    createShelf    --------
    createShelf: function() {
        this.shelf = this.game.add.group();
        this.shelf.enableBody = true;
        this.bottomShelf = this.game.add.sprite(0, this.game.world.height-40, 'shelf', 0, this.shelf);
        this.bottomShelf.anchor.set(0.0, 1.0);
        // Set all the walls to be immovable
        this.shelf.setAll('body.immovable', true);
    },
    
    //--------    playerHitShelf    --------
    playerHitShelf: function(){
        this.explosionSound.play();
        this.bigBasketImageY += this.game.world.height/20;
        this.bigBasket.reset(this.game.world.centerX, this.bigBasketImageY);
        count_remaining--;
        this.labelRemaining.text = "Remaining: " + count_remaining;
        count_incorrect++;
        this.labelIncorrect.text = "Incorrect: " + count_incorrect;
        this.resetPlayerPosition();
    },
    
    //--------    bigBasketHitObject    --------
    bigBasketHitObject: function(){
        this.explosionSound.play();
        this.gameOver();
    },
    
    //--------    generateAsteriods    --------
    generateAsteriods: function() {
        this.asteroids = this.game.add.group();
        //enable physics in them
        this.asteroids.enableBody = true;
        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        //phaser's random number generator
        var numAsteroids = this.game.rnd.integerInRange(5, 10);
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
    
    //--------    hitAsteroid    --------
    hitAsteroid: function(player, asteroid) {
        //play explosion sound
        this.explosionSound.play();

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
    
    //--------    bigBasketHitObject    --------
    createBigBasket: function(){
        var imgData = this.game.cache.getImage('bigBasket');
        var scale = 1/( (imgData.width*4)/this.game.world.width );
        this.bigBasket = this.game.add.sprite(this.game.world.centerX, this.bigBasketImageY, 'bigBasket');
        this.bigBasket.anchor.setTo(0.5,1);
        this.bigBasket.scale.setTo(scale);
        this.game.physics.arcade.enable(this.bigBasket);
        this.bigBasketImageW = imgData.width*scale;
    },
    
    //--------    generateContainers    --------
    generateContainers: function() {
        this.containers = this.game.add.group();
        //enable physics in them
        this.containers.enableBody = true;
        this.containers.physicsBodyType = Phaser.Physics.ARCADE;

        //phaser's random number generator
        //var numContainers = this.game.rnd.integerInRange(10, 15);
        var container;
        var num_of_baskets = this.game.rnd.integerInRange(2, 5);
        var imgData = this.game.cache.getImage('basketSmall');
        var scale = 0.5;
        if ( (imgData.height/100) < ((imgData.width+100)*num_of_baskets)/this.game.world.width ){
            scale = 1/( ((imgData.width+10)*num_of_baskets)/this.game.world.width ); 
        }
        else{
            scale = 1/(imgData.height/100);
        }
        scale*=0.8;
        var odmik_x = (imgData.width/2) * scale;
        var odmik_y = (imgData.height * scale);
        var tmp = this.game.world.width/num_of_baskets;

        for (var i = 0; i < num_of_baskets; i++) {
            //add sprite
            container = this.containers.create( (tmp/2+i*tmp)-odmik_x, this.game.world.height-odmik_y-65, 'basketSmall');
            container.scale.setTo(scale,scale);

        }
    },
    
    //--------    collect    --------
    collect: function(player, container) {
        //play collect sound
        this.collectSound.play();

        //update score
        this.playerScore++;
        this.labelScore.text = "Score: " + this.playerScore;
        
        count_remaining--;
        this.labelRemaining.text = "Remaining: " + count_remaining;
        
        count_correct++;
        this.labelCorrect.text = "Correct: " + count_correct;

        //remove sprite
        //container.destroy();
        this.resetPlayerPosition();
    },
    
    //--------    resetPlayerPosition    --------
    resetPlayerPosition: function(){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.reset(this.game.world.centerX-this.bigBasketImageW/2+this.game.rnd.integerInRange(0, this.bigBasketImageW), this.bigBasketImageY);
        // spremeni predstavljeno slikco...
    },
    
    //--------    gameOver    --------
    gameOver: function() {    
        //pass it the score as a parameter 
        this.game.state.start('MainMenu', true, false, this.playerScore);
        //this.bigBasketImageW = this.game.world.width / 4;
    },
    
    //--------    showLabels    --------
    showLabels: function() {
        //score text
        var text = "Score: 0";
        var style = { font: "20px Arial", fill: "#999", align: "center" };
        this.labelScore = this.game.add.text(this.game.width-120, 20, text, style);
        //this.scoreLabel = this.game.add.text(50, 50, text, style);
        //this.scoreLabel.fixedToCamera = true;
        
        this.labelTime = this.game.add.text(this.game.width-120, 40, 'Time: 0s', style);
        
        this.labelLevel = this.game.add.text(this.game.width-120, this.game.height-25, "Level: none", style);
        
        this.labelRemaining = this.game.add.text(20, 20, "Remaining: "+ count_remaining, style);
        this.labelCorrect = this.game.add.text(20, 45, "Correct: " + count_correct, style);
        this.labelIncorrect = this.game.add.text(20, 70, "Incorrect: " + count_incorrect, style);
    },
    
    //--------    updateTimeEvents    --------
    updateTimeEvents: function() {
        seconds++;
        this.labelTime.text = "Time: " + seconds + "s";
    }
};