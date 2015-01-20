var SortingGame = SortingGame || {};

//title screen
SortingGame.Points = function(){};


SortingGame.Points.prototype = {
    create: function() {
        this.game.world.setBounds(0, 0, 800, 600);
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
        
        // buttons:
        this.createButtons();
    },
    
    //--------    createButtons    --------
    createButtons: function(){
        // back
        this.button_back = this.game.add.button(55, this.game.height-20, 'button_back', this.buttonBackEvent, this, 1, 2, 0);
        this.button_back.scale.setTo(0.5, 0.5);
        this.button_back.anchor.set(0.5);
    },
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    
    //-----------------------------
    //         butons
    //-----------------------------
    buttonBackEvent: function (btn){
        this.game.state.start('MainMenu', true, false, this.playerScore);
    }
    
};