// Our namespace. If the object exists use it, otherwise create new. 
var CatchMice = CatchMice || {};

CatchMice.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
CatchMice.Boot.prototype = {
    preload: function() {
        
//        // Retrieve game properties
//        var xhr = new XMLHttpRequest();
//        xhr.open("GET", "http://private-anon-019bb2358-elearningapi.apiary-mock.com/api/v1/classroom/1/game/15/");
//        xhr.onreadystatechange = function () {
//          if (this.readyState == 4) {
//            alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
//          }
//        };
//        xhr.send(null);
//        
//        // Retrieve highscore table
//        var xhr = new XMLHttpRequest();
//        xhr.open("GET", "http://private-anon-298012bef-elearningapi.apiary-mock.com/api/v1/classroom/1/game/15/highscores/");
//        xhr.onreadystatechange = function () {
//            if (this.readyState == 4) {
//                alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
//            }
//        };
//        xhr.send(null);
//        
//        // Report user score
//        var xhr = new XMLHttpRequest();
//        xhr.open("POST", "http://private-anon-019bb2358-elearningapi.apiary-mock.com/api/v1/classroom/1/game/15/score/");
//        xhr.setRequestHeader("Content-Type", "application/json");
//        xhr.onreadystatechange = function () {
//          if (this.readyState == 4) {
//            alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
//          }
//        };
//        xhr.send("{\n    \"score\": 12\n}");
//        
//        // Retrieve current user
//        var xhr = new XMLHttpRequest();
//        xhr.open("GET", "http://private-anon-019bb2358-elearningapi.apiary-mock.com/api/v1/users/me/");
//        xhr.onreadystatechange = function () {
//          if (this.readyState == 4) {
//            alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
//          }
//        };
//        xhr.send(null);
        
        //assets we'll use in the loading screen
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    },
    
    create: function() {
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#ffffff';

        //scaling options
        /*this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;

        //screen size will be set automatically
        this.scale.setScreenSize(true);*/

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.Arcade);

        this.state.start('Preload');
    }
};