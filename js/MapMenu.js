CatchMice.MapMenu = function(){};

var buttonL1, buttonL2, buttonL3;

CatchMice.MapMenu.prototype = {
    create: function() {
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background_map');

        text = "Select level";
        style = { font: "bold 50px Arial", fill: "#000", align: "center" };

        var h = this.game.add.text(this.game.width/2, 100, text, style);
        h.anchor.set(0.5);

        buttonL1 = this.game.add.button((this.game.width/2)-96, (this.game.height/2)-81, 'button_level1', this.buttonL1Event, this, 1, 2, 0);
        buttonL1.on = false;

        buttonL2 = this.game.add.button((this.game.width/2)-96, this.game.height/2, 'button_level2', this.buttonL2Event, this, 1, 2, 0);
        buttonL2.on = false;

        buttonL3 = this.game.add.button((this.game.width/2)-96, (this.game.height/2)+81, 'button_level3', this.buttonL3Event, this, 1, 2, 0);
        buttonL3.on = false;

        buttonBack = this.game.add.button(5, (this.game.height)-71, 'button_back', this.buttonBackEvent, this, 1, 2, 0);
    },

    buttonL1Event: function (btn) {
        if( buttonL2.on ) {this.buttonL2Event(buttonL2)};
        if( buttonL3.on ) {this.buttonL3Event(buttonL3)};
        btn.on = !btn.on;
        btn.setFrames(1, (btn.on)?0:2, 0);
        btn.frame = (btn.on)?0:2;
        CatchMice.level = 0;
    },

    buttonL2Event: function (btn) {
        if( buttonL1.on ) {this.buttonL1Event(buttonL1)};
        if( buttonL3.on ) {this.buttonL3Event(buttonL3)};
        btn.on = !btn.on;
        btn.setFrames(1, (btn.on)?0:2, 0);
        btn.frame = (btn.on)?0:2;
        CatchMice.level = 1;
    },

    buttonL3Event: function (btn) {
        if( buttonL1.on ) {this.buttonL1Event(buttonL1)};
        if( buttonL2.on ) {this.buttonL2Event(buttonL2)};
        btn.on = !btn.on;
        btn.setFrames(1, (btn.on)?0:2, 0);
        btn.frame = (btn.on)?0:2;
        CatchMice.level = 2;
    },

    buttonBackEvent: function (btn) {
        this.state.start('MainMenu');
    },

    // Display highest score, if any
    init: function(score) {
        var score = score || 0;
        this.highestScore = this.highestScore || 0;
        this.highestScore = Math.max(score, this.highestScore);
    },

    update: function() {

    }

};