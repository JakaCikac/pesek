var CatchMice = CatchMice || {};

var layer;
var currentSpeed = 0;
var mouses = [];
var foodDrop;
var foodPick;
var foodToDrop = [];
var holeForMap = [];
var foodList = ['jabolko', 'hruska', 'banana', 'jagoda', 'ananas'];
var foodLocations = [[[690, 130, 'jabolko'], [510, 130, 'hruska'], [50, 120, 'banana'], [50, 220, 'jagoda'], [660, 225, 'ananas']],
                     [[660, 460, 'jabolko'], [240, 320, 'hruska'], [160, 100, 'banana'], [100, 460, 'jagoda'], [560, 60, 'ananas']],
                     [[360, 545, 'jabolko'], [645, 265, 'hruska'], [400, 390, 'banana'], [120, 180, 'jagoda'], [45, 45, 'ananas']]];
//var foodLocations = [[[690, 130], [500, 120], [50, 120], [50, 220], [660, 225]],
//                     [[660, 460], [240, 320], [160, 100], [100, 460], [560, 60]],
//                     [[360, 545], [645, 265], [400, 390], [120, 180], [45, 45]]];

var mouseHolesLocations = [[[230, 380, 180], [170, 380, 180], [50, 550, -90], [590, 470, 0], [750, 50, 90]],
                           [[50, 50, 0], [410, 130, 0], [740, 130, 0], [490, 390, -90], [360, 530, 0]],
                           [[310, 140, -90], [130, 350, -90], [390, 50, 90], [740, 350, 90], [740, 540, 180]]];

//title screen
CatchMice.Game = function(){};

CatchMice.Game.prototype = {
    
    create: function() {
        //player initial score of zero
        this.playerScore = 0;
        foodToDrop = foodLocations[CatchMice.level];
        holeForMap = mouseHolesLocations[CatchMice.level];
        
        this.map = this.game.add.tilemap('map'+CatchMice.level);

        this.map.addTilesetImage('wood');
        this.map.addTilesetImage('wall');

        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.layer = this.map.createLayer('Tile Layer 1');

        this.map.setCollisionBetween(0, 100000, true, 'Tile Layer 1');

        //set world dimensions
        this.game.world.setBounds(0, 0, 800, 600);
        this.backgroundlayer.resizeWorld();

        // generate foods at possible positions
        this.generateFoods();
        // generate mouse holes at possible positions
        this.generateMouseHoles();

        //create player
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player'); 
        this.player.scale.setTo(0.15);
        this.player.anchor.setTo(0.5, 0.5);

        this.nosim = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, foodList[0]);
        this.nosim.scale.setTo(0.25);
        this.nosim.anchor.setTo(0.5, 0.5);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //show score
        this.showLabels();

        //enable player physics
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;

        // create the ability to control our player with the keyboard
        this.cursor = this.game.input.keyboard.createCursorKeys();

        //sounds
        this.collectSound = this.game.add.audio('collect');
    },

    update: function() {
        
        this.movePlayer();
        
        this.game.physics.arcade.collide(this.player, this.layer);

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            this.managePause();
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            this.state.start('MainMenu');
        }

        //overlapping between player and collectables (not collision)
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.S, 1)) {
            this.game.physics.arcade.overlap(this.player, foodDrop, this.dropFood, null, this);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D, 1)) {
            this.game.physics.arcade.overlap(this.player, foodPick, this.pickFood, null, this); 
        }


    },

    // ----------------------------
    // Moving our player with the keyboard
    // ----------------------------
    movePlayer: function() {
        // If the left arrow key is pressed
        if (this.cursor.left.isDown) {
            // Move the player to the left
            this.player.angle -= 4;
        // If the right arrow key is pressed
        } else if (this.cursor.right.isDown) {
            // Move the player to the right
            this.player.angle += 4;
        }

        // If the up arrow key
        if (this.cursor.up.isDown) { 
            // Move player up
            currentSpeed = 200;
        } else if (currentSpeed > 4) {
            currentSpeed -= 4;
        } else {
            currentSpeed = 0;
        }

        this.game.physics.arcade.velocityFromRotation(this.player.rotation, currentSpeed, this.player.body.velocity);

        if(this.nosim.alive) {
            this.nosim.x = this.player.x;
            this.nosim.y = this.player.y;
            this.nosim.rotation = this.player.rotation;
        }
    },

    generateFoods: function() {

        foodPick = this.game.add.group();
        foodPick.enableBody = true;
        foodPick.physicsBodyType = Phaser.Physics.ARCADE;
        
        foodDrop = this.game.add.group();
        //enable physics in them
        foodDrop.enableBody = true;
        foodDrop.physicsBodyType = Phaser.Physics.ARCADE;

        var food;

        for (var i = 0; i < foodToDrop.length; i++) {
            //add sprite
            food = foodDrop.create(foodToDrop[i][0], foodToDrop[i][1], foodList[i]);
            food.scale.setTo(0.25);
            food.anchor.setTo(0.5, 0.5);
            
            //physics properties
            food.body.immovable = true;
            food.body.collideWorldBounds = true;
        }
    },

    generateMouseHoles: function() {

        this.mouseHoles = this.game.add.group();
        //phaser's random number generator
        // Has to be the same as the number of foods
        var hole;
        var mouse;

        for (var i = 0; i < holeForMap.length; i++) {
            //add sprite
            hole = this.mouseHoles.create(holeForMap[i][0], holeForMap[i][1], 'mouseHole');
            hole.anchor.setTo(0.5, 0.5);
            
            mouse = this.game.add.sprite(holeForMap[i][0], holeForMap[i][1], 'mouse')
            mouse.scale.setTo(0.5);
            mouse.anchor.setTo(0.5, 0.5);
            mouse.name = foodList[i];
            mouse.angle = holeForMap[i][2];
            mouses.push(mouse);
            //food.scale.setTo(2/5);

            //physics properties
            /*hole.body.velocity.x = 0;
            hole.body.velocity.y = 0; 
            hole.body.immovable = true;
            hole.body.collideWorldBounds = true;*/
        }
    },

    dropFood: function(player, collectable) {

        var food;
        food = foodPick.create(collectable.x, collectable.y, this.nosim.key);
        food.scale.setTo(0.5);
        food.anchor.setTo(0.5, 0.5);

        //physics properties
        food.body.immovable = true;
        food.body.collideWorldBounds = true;
        //play collect sound
        this.collectSound.play();

        //update score
        this.playerScore++;
        this.scoreLabel.text = this.playerScore;

        foodList.splice(foodList.indexOf(this.nosim.key), 1);
        
        this.nosim.kill();
        if (foodList.length != 0) {
            this.player.bringToTop();
            this.nosim = this.game.add.sprite(this.player.x, this.player.y, foodList[0]);
            this.nosim.scale.setTo(0.25);
            this.nosim.anchor.setTo(0.5, 0.5);
        }
        collectable.destroy();

    },
    
    pickFood: function(player, collectable) {

        var food;
        for (var i = 0; i < foodToDrop.length; i++){
            if(foodToDrop[i].indexOf(collectable.x)!=-1 & foodToDrop[i].indexOf(collectable.y)!=-1){
                food = foodDrop.create(collectable.x, collectable.y, foodToDrop[i][2]);
            }
        }
        food.scale.setTo(0.25);
        food.anchor.setTo(0.5, 0.5);

        //physics properties
        food.body.immovable = true;
        food.body.collideWorldBounds = true;
        //play collect sound
        this.collectSound.play();

        //update score
        this.playerScore--;
        this.scoreLabel.text = this.playerScore;

        foodList.push(collectable.key);
        
        this.nosim.kill();
        if (foodList.length != 0) {
            this.player.bringToTop();
            this.nosim = this.game.add.sprite(this.player.x, this.player.y, collectable.key);
            this.nosim.scale.setTo(0.25);
            this.nosim.anchor.setTo(0.5, 0.5);
        }
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