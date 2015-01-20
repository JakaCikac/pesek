var SortingGame = SortingGame || {};

//title screen
SortingGame.Levels = function(){};

// varibles:
var level;

SortingGame.Levels.prototype = {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //          on load:
    create: function() {
        
        this.game.world.setBounds(0, 0, 800, 600);
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
        
        // buttons:
        this.createButtons();
        
        // text/labels:
        this.showLabels();
    },
    
    //-----------------------------
    //         createButtons
    //-----------------------------
    createButtons: function(){
        // back
        var button_back = this.game.add.button(55, this.game.height-20, 'button_back', this.buttonBackEvent, this, 1,2,0);
        button_back.scale.setTo(0.5, 0.5);
        button_back.anchor.set(0.5);
        
        // play
        var button_play = this.game.add.button(155, this.game.height-20, 'button_play', this.buttonPlayEvent, this, 1,2,0);
        button_play.scale.setTo(0.5, 0.5);
        button_play.anchor.set(0.5);
        
        // levels:
        var button_level1 =  this.game.add.button(this.game.width/2, this.game.height/2-81, 'button_easy', this.buttonEasyClick, this, 1,2,0);
        button_level1.anchor.set(0.5);
      
        var button_level2 = this.game.add.button(this.game.width/2, this.game.height/2, 'button_normal', this.buttonNormalClick, this, 1,2,0);
        button_level2.anchor.set(0.5);
      
        var button_level3 = this.game.add.button(this.game.width/2, this.game.height/2+81, 'button_hard', this.buttonHardClick, this, 1,2,0);
        button_level3.anchor.set(0.5);
    },
    
    //-----------------------------
    //         create text labels
    //-----------------------------
    showLabels: function() {
        switch(SortingGame.gameLevel){
            case 0: SortingGame.gameLevel = 1; //level = "none"; break;
            case 1: level = "easy"; break;
            case 2: level = "normal"; break;
            case 3: level = "hard"; break;
        }
        var style = { font: "25px Courier", fill: "#eeeeee", stroke: "#666666", strokeThickness: 3, align: "center" };
        this.labelLevel = this.game.add.text(this.game.width-200, this.game.height-25, "Level: " + level, style);
    },
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //          on use:
    //-----------------------------
    //         butons
    //-----------------------------
    buttonBackEvent: function (btn){
        this.game.state.start('MainMenu');
    },
    
    buttonPlayEvent: function(){
        this.game.state.start('Game');
    },
    
    buttonEasyClick: function(){
        level = "easy";
        SortingGame.gameLevel = 1;
        this.labelLevel.text = "Level: " + level;
    },
    
    buttonNormalClick: function(){
        level = "normal";
        SortingGame.gameLevel = 2;
        this.labelLevel.text = "Level: " + level;
    },
    
    buttonHardClick: function(){
        level = "hard";
        SortingGame.gameLevel = 3;
        this.labelLevel.text = "Level: " + level;
    }

};