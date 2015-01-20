var SortingGame = SortingGame || {};

//title screen
SortingGame.Game = function(){};

// buttons:
//var button_back;
var timer, seconds, count_remaining, count_correct, count_incorrect, fruit_num, stealingMice;

SortingGame.Game.prototype = {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //          on load:
    create: function() {
        
        this.game_state = 1; // 1 = aktivno, 0 = konec;
        
        //set world dimensions
        this.game.world.setBounds(0, 0, 800, 600);
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
        
        // set game variables:
        this.setGameVariables();
        
        // buttons:
        this.createButtons();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // create shelf:
        this.createShelf();
        
        // create top basket
        this.bigBasketImageW = this.game.world.width / 4;
        this.bigBasketImageY = 10;
        this.createBigBasket();
        
        
        // create small baskets / containers
        this.generateContainers();

        //create player
        this.createPlayer();
        
        // create stealing mice
        this.generateStealingMice();
        
        // show labels/text
        this.showLabels();

        // create the ability to control our player with the keyboard
        this.cursor = this.game.input.keyboard.createCursorKeys();

        // sounds
        this.explosionSound = this.game.add.audio('explosion');
        this.collectSound = this.game.add.audio('collect');
      
    },
    
    //-----------------------------
    //         setGameVariables
    //-----------------------------
    setGameVariables: function(){
        // some parameters for calculating point
        this.start_point = 10;
        this.end_point = this.game.world.height;
        // score, elapsed time
        fruit_num = this.game.rnd.integerInRange(1*SortingGame.gameLevel, 2*SortingGame.gameLevel);
        if(fruit_num >= SortingGame.sadje.length)
            fruit_num = SortingGame.sadje.length;
        seconds = 0.0;
        count_remaining = 10;
        count_correct = 0;
        count_incorrect = 0;
        timer = this.game.time.create(false);
        timer.loop(100, this.updateTimeEvents, this);
        timer.start();
        points_timer = 0.0;
    },
    
    //-----------------------------
    //         createPlayer
    //-----------------------------
    createPlayer: function(){
        //this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player'); 
        var fruit_id = this.game.rnd.integerInRange(0, fruit_num-1);
        this.player = this.game.add.sprite(this.game.world.centerX-this.bigBasketImageW/2+this.game.rnd.integerInRange(0, this.bigBasketImageW), this.bigBasketImageY, SortingGame.sadje[fruit_id]); 
        this.player.fruit_id = fruit_id;
        this.player.anchor.setTo(0.5,0.5);
        this.player.scale.setTo(0.4);
        //this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
        //this.player.animations.play('fly');
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
        //player initial score of zero
        this.playerScore = 0;
        //enable player physics
        this.game.physics.arcade.enable(this.player);
        this.playerSpeed = 0;
        this.player.body.collideWorldBounds = true;
        this.player.body.gravity.y = 10; // add vertical gravity to the player:
    },
    
    //-----------------------------
    //         createButtons
    //-----------------------------
    createButtons: function(){
        // back
        var tmp_scale = 0.3;
        this.button_back = this.game.add.button(55, this.game.height-20, 'button_back', this.buttonBackEvent, this, 1, 2, 0);
        this.button_back.scale.setTo(0.5, 0.5);
        this.button_back.anchor.set(0.5);
        
        // reload
        this.button_reload = this.game.add.button(155, this.game.height-20, 'button_reload', this.buttonReloadEvent, this, 1,2,0);
        this.button_reload.scale.setTo(0.5, 0.5);
        this.button_reload.anchor.set(0.5);
        
        // save
        this.button_save = this.game.add.button(255, this.game.height-20, 'button_save', this.buttonSaveEvent, this, 1,2,0);
        this.button_save.scale.setTo(0.5, 0.5);
        this.button_save.anchor.set(0.5);
        this.button_save.visible = false;
        
        
        // dodaj še gumbe gor, dol, levo in desno
        // up
        this.button_up = this.game.add.button( this.game.world.width/2 - 75, this.game.height-20, 'button_up', this.buttonUpEvent, this );
        this.button_up.scale.setTo(tmp_scale, tmp_scale);
        this.button_up.anchor.set(0.5);
        this.button_up.onInputDown.add(this.buttonUpDown, this);
        this.button_up_state = 0; // 1 == down
        // down
        this.button_down = this.game.add.button( this.game.world.width/2 - 25, this.game.height-20, 'button_down', this.buttonDownEvent, this );
        this.button_down.scale.setTo(tmp_scale, tmp_scale);
        this.button_down.anchor.set(0.5);
        this.button_down.onInputDown.add(this.buttonDownDown, this);
        this.button_down_state = 0; // 1 == down
        // left
        this.button_left = this.game.add.button( this.game.world.width/2 + 25, this.game.height-20, 'button_left', this.buttonLeftEvent, this );
        this.button_left.scale.setTo(tmp_scale, tmp_scale);
        this.button_left.anchor.set(0.5);
        this.button_left.onInputDown.add(this.buttonLeftDown, this);
        this.button_left_state = 0; // 1 == down
        // right
        this.button_right = this.game.add.button( this.game.world.width/2 + 75, this.game.height-20, 'button_right', this.buttonRightEvent, this );
        this.button_right.scale.setTo(tmp_scale, tmp_scale);
        this.button_right.anchor.set(0.5);
        this.button_right.onInputDown.add(this.buttonRightDown, this);
        this.button_right_state = 0; // 1 == down
    },
    
    //-----------------------------
    //         createShelf
    //-----------------------------
    createShelf: function() {
        this.shelf = this.game.add.group();
        this.shelf.enableBody = true;
        this.bottomShelf = this.game.add.sprite(0, this.game.world.height-40, 'shelf', 0, this.shelf);
        this.bottomShelf.anchor.set(0.0, 1.0);
        // Set all the walls to be immovable
        this.shelf.setAll('body.immovable', true);
    },
    
    // ----------------------------
    //      generateContainers (baskets)
    // ----------------------------
    generateContainers: function() {
        this.containers = this.game.add.group();
        this.fruits_images = this.game.add.group();
        //enable physics in them
        this.containers.enableBody = true;
        this.containers.physicsBodyType = Phaser.Physics.ARCADE;

        //phaser's random number generator
        //var numContainers = this.game.rnd.integerInRange(10, 15);
        var imgData = this.game.cache.getImage('basketSmall');
        var scale = 0.5;
        if ( (imgData.height/100) < ((imgData.width+100)*fruit_num)/this.game.world.width ){
            scale = 1/( ((imgData.width+10)*fruit_num)/this.game.world.width ); 
        }
        else{
            scale = 1/(imgData.height/100);
        }
        scale*=0.8;
        //var odmik_x = (imgData.width/2) * scale;
        var odmik_x = this.game.world.width/(fruit_num*2);
        var odmik_y = (imgData.height * scale);
        var tmp = this.game.world.width/fruit_num;
        var container;
        var fruit_image
        for (var i = 0; i < fruit_num; i++) {
            //add sprite
            //container = this.containers.create( (tmp/2+i*tmp)-odmik_x, this.game.world.height-odmik_y-65, 'basketSmall');
            container = this.containers.create( odmik_x*(1+i*2), this.game.world.height-65, 'basketSmall');
            container.scale.setTo(scale,scale);
            container.anchor.set(0.5, 1.0);
            container.fruit_id = i;
            
            //fruit_image = this.fruits_images.create((tmp/2+i*tmp)-odmik_x, this.game.world.height-odmik_y-20, SortingGame.sadje[i]);
            fruit_image = this.fruits_images.create(odmik_x*(1+i*2), this.game.world.height-67, SortingGame.sadje[i]);
            fruit_image.scale.setTo(0.5);
            fruit_image.anchor.set(0.5, 1.0);
        }
        this.end_point = this.game.world.height-65;
    },
    
    //-----------------------------
    //         generateStealingMice
    //-----------------------------
    generateStealingMice: function(){
        stealingMice = [];
        var mause_num = 4 * SortingGame.gameLevel;
        var dist = 300/mause_num;
        for (var i = 0; i < mause_num; i++){
            //mause
            stealingMice.push( this.game.add.sprite(this.game.rnd.integerInRange(0, 800), 100+dist*(i+1), 'mice', 0) );
            stealingMice[i].anchor.setTo(0.5,0.5);
            stealingMice[i].scale.setTo(0.5);
            this.game.physics.arcade.enable(stealingMice[i]);
            stealingMice[i].body.velocity.x = 25 + this.game.rnd.integerInRange(-10, 15);
            stealingMice[i].body.velocity.y = 0;
            stealingMice[i].item = -1;
        }
        
    },
    
    //-----------------------------
    //         create text labels
    //-----------------------------
    showLabels: function() {
        //score text
        // style: fonts: Ariel, ; fill: "#ff9f40"
        //var style = { font: "20px Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2, align: "center" };
        var style = { font: "25px Courier", fill: "#eeeeee", stroke: "#666666", strokeThickness: 3, align: "center" };
        
        this.labelScore = this.game.add.text(20, 20, "Score: 0", style);
        this.labelTime  = this.game.add.text( 20, 45, 'Time: 0s', style);
        
        var level = "none";
        switch(SortingGame.gameLevel){
            case 0: SortingGame.gameLevel = 1; //level = "none"; break;
            case 1: level = "easy"; break;
            case 2: level = "normal"; break;
            case 3: level = "hard"; break;
        }
        this.labelLevel = this.game.add.text(this.game.width-200, this.game.height-25, "Level: "+level, style);
        
        this.labelRemaining = this.game.add.text(this.game.width-220, 20, "Remaining: "+ count_remaining, style);
        this.labelIncorrect = this.game.add.text(this.game.width-220, 45, "Incorrect: " + count_incorrect, style);
        this.labelCorrect   = this.game.add.text(this.game.width-220, 70, "Correct: " + count_correct, style);
        
        //this.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,' ', { font: '84px Arial', fill: '#fff', align: "center" });
        this.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,' ', { font: '84px Courier', fill: "#ffbf40", stroke: "#666666", strokeThickness: 6, align: "center" });
        this.scoreText.anchor.setTo(0.5, 0.5);
        this.scoreText.visible = false;
        this.scoreText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
    },
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //          on use:
    //-----------------------------
    //         butons
    //-----------------------------
    buttonBackEvent: function (btn){
        this.game.state.start('MainMenu', true, false, this.playerScore.toFixed(2));

    },
    buttonUpEvent: function (btn){ this.button_up_state = 0; },
    buttonUpDown:  function (btn){ this.button_up_state = 1; },
    
    buttonDownEvent: function (btn){ this.button_down_state = 0; },
    buttonDownDown:  function (btn){ this.button_down_state = 1; },
    
    buttonLeftEvent: function (btn){ this.button_left_state = 0; },
    buttonLeftDown:  function (btn){ this.button_left_state = 1; },
    
    buttonRightEvent: function (btn){ this.button_right_state = 0; },
    buttonRightDown:  function (btn){ this.button_right_state = 1; },
    
    buttonReloadEvent:  function (btn){ this.game.state.start('Game'); },
    buttonSaveEvent: function (btn){},
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //          loops:
    // ----------------------------
    //      UPDATE
    // ----------------------------
    update: function() {
        /*
        if(this.game.input.activePointer.justPressed()) {
            //move on the direction of the input
            this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
        } */
        
        //**** se izvaja tekom igre...
        if(this.game_state == 1){
            this.movePlayer();
            this.game.physics.arcade.collide(this.player,    this.shelf,      this.playerHitShelf,     null, this); // ok
            this.game.physics.arcade.collide(this.bigBasket, this.shelf,      this.bigBasketHitObject, null, this);
            this.game.physics.arcade.collide(this.bigBasket, this.containers, this.bigBasketHitObject, null, this);
            this.game.physics.arcade.overlap(this.player,    this.containers, this.collect,            null, this); // ok
            this.game.physics.arcade.overlap(this.player,    stealingMice,    this.mouseStealFood,     null, this);

            this.checkMicePosition();
        }
        //**** se izvaja šele na koncu...
        else{
            this.checkMicePosition();
            var offset = this.moveToXY(this.game.input.activePointer, this.scoreText.x, this.scoreText.y, 8);
            this.scoreText.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', this.distanceToPointer(this.scoreText, this.game.input.activePointer) / 30);
        }
    },
    
    // ----------------------------
    // Moving our player with the keyboard
    // ----------------------------
    movePlayer: function() {
        if( this.game_state == 1 ){
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
               else if (this.player.body.velocity.y < 20)
                   this.player.body.velocity.y = 20;
           }
            else if (this.cursor.down.isDown || this.button_down_state==1) {
               this.player.body.velocity.y += 4;
           }
        }
    },
    
    // ----------------------------
    //      updateTimeEvents
    // ----------------------------
    updateTimeEvents: function() {
        if(this.game_state == 1){
            seconds+=0.1;
            //seconds.toFixed(2);
            this.labelTime.text = "Time: " + seconds.toFixed(1) + "s";
        }
    },
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //          events:
    // ----------------------------
    //      bigBasketHitObject
    // ----------------------------
    bigBasketHitObject: function(){
        this.explosionSound.play();
        this.gameOver();
    },
    
    // ----------------------------
    //      bigBasketHitObject
    // ----------------------------
    createBigBasket: function(){
        var imgData = this.game.cache.getImage('bigBasket');
        var scale = 1/( (imgData.width*4)/this.game.world.width );
        this.bigBasket = this.game.add.sprite(this.game.world.centerX, this.bigBasketImageY, 'bigBasket');
        this.bigBasket.anchor.setTo(0.5,1);
        this.bigBasket.scale.setTo(scale);
        this.game.physics.arcade.enable(this.bigBasket);
        this.bigBasketImageW = imgData.width*scale;
    },
    
    // ----------------------------
    //      playerHitShelf
    // ----------------------------
    playerHitShelf: function(){
        this.explosionSound.play();
        this.badSorting();
    },
    
    // ----------------------------
    //      mouseStealFood
    // ----------------------------
    mouseStealFood: function(player, mouse){
        //this.labelLevel.text = mouse.id;
        if( mouse.item == -1 ){
            mouse.body.velocity.x = 100;
            this.badSorting();
            mouse.item = 0;
        }
    },
    
    // ----------------------------
    //      badSorting
    // ----------------------------
    badSorting: function(){
        this.bigBasketImageY += this.game.world.height/20;
        this.start_point = this.bigBasketImageY;
        this.bigBasket.reset(this.game.world.centerX, this.bigBasketImageY);
        count_remaining--;
        this.labelRemaining.text = "Remaining: " + count_remaining;
        count_incorrect++;
        this.labelIncorrect.text = "Incorrect: " + count_incorrect;
        points_timer = seconds;
        if(count_remaining <= 0){
            this.gameOver();
        }
        else{
            this.resetPlayerPosition();
        }
    },
    
    // ----------------------------
    //      collect
    // ----------------------------
    collect: function(player, container) {
        //play collect sound
        ///this.collectSound.play();

        if( player.fruit_id == container.fruit_id ){
            //update score
            var max_time = ((this.end_point-this.start_point)/20);//*1.2;
            var auto_time = Math.sqrt(2*(this.end_point-this.start_point)/10); // to pod korenom...
            var used_time = seconds - points_timer;
            points_timer = seconds;
            if(max_time > used_time)
                this.playerScore += (max_time-used_time)*(0.2+SortingGame.gameLevel);
            this.playerScore += 1;
            if(used_time < auto_time)
                this.playerScore += (auto_time-used_time)*(1+SortingGame.gameLevel);
            //this.playerScore.toFixed(1);
            this.labelScore.text = "Score: " + this.playerScore.toFixed(2);

            count_remaining--;
            this.labelRemaining.text = "Remaining: " + count_remaining;

            count_correct++;
            this.labelCorrect.text = "Correct: " + count_correct;

            //remove sprite
            //container.destroy();
            if(count_remaining <= 0){
                this.gameOver();
            }
            else{
                this.resetPlayerPosition();
            }
        }
        else{
            this.badSorting();
        }
    },
    
    // ----------------------------
    //      resetPlayerPosition
    // ----------------------------
    resetPlayerPosition: function(){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.reset(this.game.world.centerX-this.bigBasketImageW/2+this.game.rnd.integerInRange(0, this.bigBasketImageW), this.bigBasketImageY);
        // spremeni predstavljeno slikco...
        var f_id = this.game.rnd.integerInRange(0, fruit_num-1);
        this.player.loadTexture(SortingGame.sadje[f_id]);
        this.player.fruit_id = f_id;
    },
    
    // ----------------------------
    //      checkMicePosition
    // ----------------------------
    checkMicePosition: function(){
        for( var i = 0; i < stealingMice.length; i++ ){
            if(stealingMice[i].position.x > (this.game.width+50)){
                stealingMice[i].position.x = -20;
                stealingMice[i].body.velocity.x = 25 + this.game.rnd.integerInRange(-10, 15);
                stealingMice[i].item = -1;
            }
        }
    },
    
    // ----------------------------
    //      gameOver
    // ----------------------------
    gameOver: function() {    
        //pass it the score as a parameter 
        //this.player.destroy();
        this.game_state = 0;
        this.player.body.moves = false;
        this.player.visible = false;
        
        // poračunaj točke
        // višina / min_hitrost = sekund_na_en_objkt -> max 60s
        //dodaj izpis o točkah in opcije: shrani točke, ponovi in nazaj
        //this.playerScore = this.playerScore.toFixed(2);
        this.scoreText.text = "Dosežene točke:\n" + this.playerScore.toFixed(2);
        this.scoreText.visible = true;
        
        this.button_save.visible = true;
        this.button_up.visible = false;
        this.button_down.visible = false;
        this.button_left.visible = false;
        this.button_right.visible = false;
        
        //this.game.state.start('MainMenu', true, false, this.playerScore);
        //this.bigBasketImageW = this.game.world.width / 4;
    },
    
    
    moveToXY: function(displayObject, x, y, speed) {
        var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);
        var x = Math.cos(_angle) * speed;
        var y = Math.sin(_angle) * speed;
        return { x: x, y: y };
    },
    
    distanceToPointer: function(displayObject, pointer) {
        this._dx = displayObject.x - pointer.x;
        this._dy = displayObject.y - pointer.y;
        return Math.sqrt(this._dx * this._dx + this._dy * this._dy);
    }
    
};